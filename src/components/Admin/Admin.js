import React, { useState, useEffect, Component } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header_new.png';
import ShopLogo from '../../assets/shop.png';
import adminBack from '../../assets/covid.jpg'
import DatePicker from "react-datepicker";
import "./Admin.css"
import axios from 'axios';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { Button, Modal, Form, Col, Container, Row, Spinner, Table } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";

// import React, {Component} from 'react'
const LOCAL_URL = 'http://localhost:5000'
// const BASE_URL = 'https://spider.nitt.edu/chainrunner';
const BASE_URL = LOCAL_URL
// import './Shop.css';


function CustomTable(props) {
    console.log("rendererer")
    let cfrd = props.carrier.responseData.filter(ele => {
        return ele.id === props.track.responseData.id
    })
    console.log(props.carrier.responseData)
    console.log("this is cfrd:::: ", cfrd)
    return (
        <div className='table-container'>
            <div>
                <div>
                    <span className='customer-title'>{props.track.responseData.name}</span>

                    {cfrd.length != 0 ?
                        <span className="track-display-span">Carrier</span> :
                        <Button onClick={props.handleMarkAsCarrier} variant='danger' className='bottom-buttons-item track-display-button'> 
                           {props.carrier.loading && <Spinner animation="border" variant='danger' /> || 'Mark as carrier'}
                        </Button>
                    }
                    <Button variant="primary" className="bottom-buttons-item track-display-button">
                        Possible contact
                    </Button>

                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Shop Name</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.track.responseData.data.map((ele, index) => {
                        // console.log(ele.slot_begin)
                        const date = new Date(ele.slot_begin)
                        const month = date.toLocaleString('default', { month: 'long' });
                        let hours = date.getHours()
                        // console.log(hours)
                        const ampmst = hours >= 12 ? "PM" : "AM";
                        hours = hours >= 12 ? hours -= 12 : hours;
                        hours = hours <= 9 ? '0' + hours : hours;
                        const ts = date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' ' + hours + ':' + date.getMinutes() + ' ' + ampmst;
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{ele.shop_id}</td>
                                <td>{ts}</td>
                            </tr>
                        )
                    })}
                    {props.track.responseData.data.length === 0 ? <tr><td colSpan="3">No records found</td></tr> : <span />}
                </tbody>
            </Table>
        </div>
    )
}

function SuspectsTable(props) {
    console.log(props)

    return (<div className='table-container'>
        <div>
            <div>
                <span className='customer-title'>List of Carriers</span>


            </div>
        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {props.carrier.responseData.map((ele, index) => {
                    // console.log(ele.slot_begin)

                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.address}</td>
                            <td>{ele.phone}</td>
                        </tr>
                    )
                })}
                {props.carrier.responseData.length === 0 ? <tr><td colspan = "4">No records found</td></tr>: <span />}
            </tbody>
        </Table>
    </div>)
}

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: {
                showTable: false,
                showModal: false,
                reponseData: [],
                loading: false,
                error: false,
                dateFrom: new Date()

            },
            carrier: {
                showTable: false,
                responseData: [],
                loading: false,
                error: false
            },
            allCust: {
                showTable: false,
                responseData: [],
                loading: false
            },
            admin: {
                name: "ShopTik Admin",
                id: ""
            },
            logoutRedirect: false,
            names: {
                display_strings: [],
                with_ids: {}
            },
            trackCounter: 0,
            carrierCounter: 0
        }
    }


    componentDidMount = async () => {
        let id = this.props.match.params.id
        let admin = Object.assign({}, this.state.admin)
        admin.id = id
        this.setState({ admin })
        let apiUrl = BASE_URL + '/api/customer/names'
        let return_array = []
        let names = Object.assign({}, this.state.names)
        let resJson = await axios.get(apiUrl)
        if (resJson.status === 200) {

            resJson.data.forEach(ele => {
                return_array.push(ele.name + "  (" + ele.email + ")")
            })
            names.display_strings = return_array
            names.with_ids = resJson.data


        }
        else {
            names.display_strings = []
            names.with_ids = {}
        }
        this.setState({
            names
        })
        let carrier = await this.fetchCarrierNamesWithSideEffects();
        this.setState({carrier})
       



    }

    handleModalClose = () => {
        let track = Object.assign({}, this.state.track)
        track.showModal = false
        this.setState({ track })
    }

    handleLogout = () => {
        let url = '/'
        return <Redirect to={url} />
    }

    // const handleLogout = () => {
    //     setAdminLogoutRedirect(true);
    // }


    fetchCarrierNamesWithSideEffects = async(next) => {
        let apiUrl = BASE_URL + '/api/carrier/names'
        let carrier = Object.assign({}, this.state.carrier)
        let res = await axios.get(apiUrl)
        if (res.status === 200) {
            // console.log("yeysysysy")
            carrier.responseData = res.data
            // console.log("carrier responsedata", carrier.responseData )
            // carrier.showTable = false
            carrier.loading = false
            // this.setState({ carrier }, next())
           

        }
        else {
            carrier.responseData = []
            // carrier.showTable = false
            // track.showModal = false
            carrier.loading = false
            // this.setState({ carrier })

        }
        return carrier
    }
    handleMarkAsCarrier = async () => {
        let id = this.state.track.responseData.id
        let track = Object.assign({}, this.state.track)
        // console.log(id)
        let carrier = Object.assign({}, this.state.carrier)
        carrier.showTable = false
        carrier.loading = true
        let apiUrl = BASE_URL + "/api/carrier/add"
        let resJson = await axios.post(apiUrl, { "id": id })
        carrier.loading = false
        if (resJson.status === 200) {
            console.log("successsss")
            
            carrier = await this.fetchCarrierNamesWithSideEffects();
            carrier.error = false
            // carrier.showTable = true
            track.showTable = true;
            carrier.showTable = false;
            this.setState({track, carrier})
            
            
        }
        else {
            carrier.showTable = false;
            carrier.loading = false;
            carrier.responseData = []
            carrier.error = "Error getting carrier information"
            this.setState({carrier})
        }
        let trackCounter = Object.assign({}, this.state.trackCounter)
        trackCounter++;
        this.setState({trackCounter})
        // this.setState(carrier)

    }

    handleShowTrackForm = () => {
        let track = Object.assign({}, this.state.track)
        let carrier = Object.assign({}, this.state.carrier)
        track.showModal = true
        carrier.showTable = false
        this.setState({ carrier, track })
    }

    handleShowCarriersForm = async () => {
        let track = Object.assign({}, this.state.track)
        let carrier = Object.assign({}, this.state.carrier)
        carrier.loading = true
        this.setState({carrier})
        carrier = await this.fetchCarrierNamesWithSideEffects();
            carrier.loading = false;
            carrier.showTable = true;
            this.setState({carrier})
    }

    handleTrackDate = (value) => {
        let track = Object.assign({}, this.state.track)
        track.dateFrom = value;
        this.setState({ track })
    }


    handleTrackSubmit = (e) => {
        e.preventDefault()
        let track = Object.assign({}, this.state.track)
        track.loading = true
        track.error = false
        this.setState(track)
        let apiUrl = BASE_URL + '/api/track'
        let cust_deets = e.target.elements.customerId.value
        let email_string = cust_deets.split("(")
        if (email_string.length <= 1) {
            track.showModal = true
            track.showTable = false
            track.responseData = {}
            track.loading = false
            track.error = "Invalid input. Expected a name and (email)"
            this.setState({ track })
            return;
        }
        email_string = email_string[1]
        // console.log("email string:", email_string)
        let email = email_string.substring(0, email_string.length - 2)
        // console.log("email::: ", email)
        let cust_id = this.state.names.with_ids.filter(ele => {
            if (ele.email === email)
                return ele.id
        })
        this.setState({ track })
        // console.log("this is cust id: ", cust_id)
        axios.post(apiUrl, {
            "customer_id": cust_id[0].id,
            "admin_id": this.state.admin.id,
            "date": e.target.elements.date.value
        }).then(response => {
            track.loading = false
            // console.log(response)

            if (response.status == 200) {
                this.handleModalClose()
                track.responseData = {
                    "id": cust_id[0].id,
                    "data": response.data,
                    "name": cust_id[0].name
                }
                track.showTable = true
                track.showModal = false
                track.error = false

            }
            else {
                track.showModal = true
                track.showTable = false
                track.responseData = {}
                track.error = "No track information for given info"
            }
            this.setState({ track })
        });
    }


    render() {
        return (
            <div className='admin-bg'>
                <img alt="hero" className="hero" src={Hero} />
                <div className="UserNavbar">
                    <label className="title">SHOPTIK</label>
                    <div className='d-inline sideNav'>
                        <img className="shopIcon" onClick={this.handleLogout} src={ShopLogo} alt="icon" />
                        <label className="logoutText" onClick={this.handleLogout} >Logout</label>
                        <div className='welcomeInfo'>
                            <span>Welcome, {this.state.admin.name}  </span>
                            <br />
                            <span> ADMIN ID : {this.state.admin.id}</span>
                        </div>
                    </div>
                </div>
                <div className="mainbg">
                    <div className='mainbg-body'>
                        {this.state.track.showTable && (
                            <div>
                                <CustomTable counter={this.state.trackCounter} handleMarkAsCarrier={this.handleMarkAsCarrier} carrier={this.state.carrier} track={this.state.track} />
                            </div>
                        )}
                        {this.state.carrier.showTable && (
                            <div>
                                <SuspectsTable counter = {this.state.carrierCounter} carrier={this.state.carrier} />
                            </div>)
                        }
                    </div>
                    <div className="bottom-buttons">
                        <div className='row'>
                            <div className='col text-center'>
                                <Button onClick={this.handleShowTrackForm} className='bottom-buttons-item'>Track a Person</Button>
                                <Button variant="danger" onClick={this.handleShowCarriersForm} className='bottom-buttons-item'>  {this.state.carrier.loading && <Spinner animation="border" variant='danger' /> || 'Show List of Carriers'}</Button>
                            </div>
                        </div>

                    </div>

                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.track.showModal}
                    onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>TRACK A PERSON</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleTrackSubmit}>
                            <Form.Group >
                                <Form.Label>Name of person</Form.Label>
                                <div style={{ width: "100%", display: 'inline-block' }}>
                                    <TextInput
                                        options={this.state.names.display_strings}
                                        maxOptions={0}
                                        offsetY={20}
                                        minChars={1}
                                        trigger={''}
                                        Component={"input"}
                                        className="autocomplete-text"
                                        name='customerId'
                                    // matchAny
                                    />
                                </div>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Track from</Form.Label>
                                <div style={{ marginLeft: '20px' }}>
                                    <DatePicker
                                        name='date'
                                        selected={this.state.track.dateFrom}
                                        onChange={this.handleTrackDate}
                                    />
                                </div>
                            </Form.Group>
                            <center>
                                <Button variant="primary" type='submit' name='track'>
                                    {this.state.track.loading && <Spinner animation="border" variant='primary' /> || 'Track'}
                                </Button>
                                {this.state.track.error && <div style={{ color: 'red' }}>No information found for given ID</div>}
                            </center>
                        </Form>
                    </Modal.Body>
                </Modal>


            </div>

        )
    }

}
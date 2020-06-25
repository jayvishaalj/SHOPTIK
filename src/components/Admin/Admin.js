import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Hero from '../../assets/header_new.png';
import ShopLogo from '../../assets/shop.png';
import DatePicker from "react-datepicker";
import "./Admin.css"
import axios from 'axios';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { Button, Modal, Form, Spinner, Table } from 'react-bootstrap'
import "react-datepicker/dist/react-datepicker.css";

// import React, {Component} from 'react'
// const LOCAL_URL = 'http://localhost:5000'
const BASE_URL = 'https://spider.nitt.edu/chainrunner';
// const BASE_URL = LOCAL_URL
// import './Shop.css';


function TrackCustomersTable(props) {
    let global_cust_without_id = props.track.responseData.global_cust.filter(ele => {
        // console.log(props.track.responseData)
        // console.log(ele.id, props.track.responseData.data.id)
        let t = ele.slot.split(/[- :]/);

        // Apply each element to the Date function
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        return ele.id !== props.track.responseData.id && d.getTime() >= props.track.dateFrom.getTime()
    })

    let carrier_names = props.carrier.responseData.map(value => value.name);
    return (
        <div className='table-container'>
            <div className='table-container-header'>
                <span className='customer-title'>List of customers in contact with {props.track.responseData.name} from {props.track.dateFrom.toISOString().slice(0, 19).replace('T', ' ').slice(0, 10)}</span>

            </div>
            <div className='tableFixHead'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Shop Name</th>
                            <th>Slot</th>
                            <th>Phone number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {global_cust_without_id.length === 0 ?
                            <tr><td colSpan={6}>No records found</td></tr> :
                            global_cust_without_id.map((ele, index) => {
                                return (
                                    <tr key={index + 1}
                                        style={carrier_names.includes(ele.name) ? { color: 'red' } : {}}
                                    >
                                        <td>{index + 1}</td>
                                        <td >{ele.name}</td>
                                        <td>{ele.address}</td>
                                        <td>{ele.shop_id}</td>
                                        <td>{ele.slot}</td>
                                        <td>{ele.phone}</td>
                                    </tr>

                                )
                            })}
                    </tbody>
                </Table>
            </div>
        </div>
    )


}

function CustomTable(props) {

    // console.log("this is props track", props.track)
    // console.log("rendererer")
    let cfrd = props.carrier.responseData.filter(ele => {
        return ele.id === props.track.responseData.id
    })
    // console.log("props.log.responesData: ", props.track.responseData.data)
    let trackRData = props.track.responseData.data.filter(ele => {
        var t = ele.slot_begin.split(/[- :]/);
        var dat = props.track.dateFrom
        dat.setHours(0, 0, 0, 0);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        // console.log(props.track.dateFrom.getTime(), d.getTime())
        return d.getTime() >= dat.getTime()
    })
    // console.log('track R data: ', trackRData)
    // console.log(props.carrier.responseData)
    // console.log("this is cfrd:::: ", cfrd)
    return (
        <div className='table-container'>
            <div className='row table-container-header d-flex'>
                <div className='col carrier-button'>
                    <span style = {cfrd.length!=0 ? {display: 'inline-flex', color: 'red'} : {}} className = {cfrd.length!=0 ? "" : ""}> 
                        {cfrd.length != 0 ? 'Carrier' : <Button onClick={props.handleMarkAsCarrier} variant='danger' className='contacts-button float-right'>
                            {props.carrier.loading ? <Spinner animation="border" variant='danger' /> : 'Mark as carrier'}
                        </Button>}
                    </span>
                </div>
                <div className='col'>
                    <span><Button variant="warning" onClick={props.showContactTable} className="contacts-button float-left">
                        Possible contacts
                    </Button>
                    </span>
                </div>

            </div>


            <div className=' row customer-title'>
                <div className="col">
                    {props.track.responseData.name}
                </div>
            </div>






            <div className='tableFixHead'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Shop Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>

                        {trackRData.length === 0 ? <tr><td colSpan="3">No records found</td></tr> : trackRData.map((ele, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{ele.shop_id}</td>
                                    <td>{ele.slot_begin}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}

function SuspectsTable(props) {
    // console.log(props)

    return (<div className='table-container'>
        <div className='table-container-header'>
            <div>
                <span className='customer-title'>List of Carriers</span>


            </div>
        </div>
        <div className='tableFixHead'>
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

                    {props.carrier.responseData.length === 0 ? <tr><td colspan="4">No records found</td></tr> : props.carrier.responseData.map((ele, index) => {
                        // console.log(ele.slot_begin)
                        return (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>{ele.address}</td>
                                <td>{ele.phone}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    </div>)
}

export default class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: {
                showTable: false,
                showModal: false,
                responseData: [],
                loading: false,
                error: false,
                dateFrom: new Date(),
                contactTable: false
            },
            carrier: {
                showTable: false,
                responseData: [],
                loading: false,
                error: false,
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
        carrier.showTable = true
        this.setState({ carrier })




    }

    handleModalClose = () => {
        let track = Object.assign({}, this.state.track)
        track.showModal = false
        this.setState({ track })
    }

    handleLogout = () => {
        console.log("handle logout called")
        this.setState({ logoutRedirect: true })

    }

    // const handleLogout = () => {
    //     setAdminLogoutRedirect(true);
    // }

    showContactTable = () => {
        let track = Object.assign({}, this.state.track)
        track.contactTable = true;
        let showTableClone = this.state.carrier;
        showTableClone.showTable = false;
        this.setState({
            track,
            carrier: showTableClone

        })

    }

    fetchCarrierNamesWithSideEffects = async (next) => {
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
        // carrier.showTable = false
        carrier.loading = true
        let apiUrl = BASE_URL + "/api/carrier/add"
        let resJson = await axios.post(apiUrl, { "id": id })
        carrier.loading = false
        if (resJson.status === 200) {
            // console.log("successsss")

            carrier = await this.fetchCarrierNamesWithSideEffects();
            carrier.error = false
            // carrier.showTable = true
            track.showTable = true;
            // carrier.showTable = false;
            this.setState({ track, carrier })


        }
        else {
            // carrier.showTable = false;
            carrier.loading = false;
            carrier.responseData = []
            carrier.error = "Error getting carrier information"
            this.setState({ carrier })
        }
        let trackCounter = Object.assign({}, this.state.trackCounter)
        trackCounter++;
        this.setState({ trackCounter })
        // this.setState(carrier)

    }

    handleShowTrackForm = () => {
        let track = Object.assign({}, this.state.track)
        let carrier = Object.assign({}, this.state.carrier)
        track.showModal = true
        track.showTable = false
        carrier.showTable = true
        track.contactTable = false
        this.setState({ carrier, track })
    }

    handleShowCarriersForm = async () => {
        let track = Object.assign({}, this.state.track)
        let carrier = Object.assign({}, this.state.carrier)
        carrier.loading = true
        this.setState({ carrier })
        carrier = await this.fetchCarrierNamesWithSideEffects();
        carrier.loading = false;
        carrier.showTable = true;
        this.setState({ carrier })
    }

    handleTrackDate = (value) => {
        let track = Object.assign({}, this.state.track)
        track.dateFrom = value;
        this.setState({ track })
    }


    handleTrackSubmit = (e) => {
        e.preventDefault()
        let track = Object.assign({}, this.state.track)
        let carrier = Object.assign({}, this.state.carrier)
        carrier.showTable = false
        track.loading = true
        track.error = false
        this.setState({ track })
        let apiUrl = BASE_URL + '/api/track'
        let cust_deets = e.target.elements.customerId.value.trim()
        let email_string = cust_deets.split("(")
        if (email_string.length <= 1 || !email_string[1].includes(')')) {
            console.log("hihihihihihihi")
            track.showModal = true
            track.showTable = false
            track.responseData = {}
            track.loading = false
            track.error = "Invalid input. Expected a name and (email)"
            this.setState({ track })
            return;
        }
        email_string = email_string[1]
        console.log("email string:", email_string)
        let email = email_string.split(')')[0]

        console.log("email::: ", typeof (email))
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
                console.log(response)
                // console.log("this is reposens", response.data.track_info)
                this.handleModalClose()
                track.responseData = {
                    "id": cust_id[0].id,
                    "data": response.data.track_info,
                    "name": cust_id[0].name,
                    "global_cust": response.data.global_cust
                }
                track.showTable = true
                track.showModal = false
                track.error = false
                carrier.showTable = false

            }
            else {
                track.showModal = true
                track.showTable = false
                track.responseData = {}
                track.error = "No track information for given info"
                carrier.showTable = true
            }
            this.setState({ track, carrier })
        });
    }


    render() {
        if (this.state.logoutRedirect) {
            let url = '/'
            return <Redirect to={url} />
        }
        return (
            <div className='admin-bg'>
                <img alt="hero" className="hero" src={Hero} />
                <div className="UserNavbar">
                    <label className="titleAdmin">SHOPTIK</label>

                    <div className='d-inline sideNav'>
                        {/* <img className="shopIcon" onClick={this.handleLogout} src={ShopLogo} alt="icon" />
                        <label className="logoutTextAdmin" onClick={this.handleLogout} >Logout</label> */}
                        <div className='welcomeInfo'>
                            <div style={{ marginTop: "20px", fontSize: "15px" }}>
                                <span>Welcome, {this.state.admin.name}  </span>
                                <br />
                                <span> ADMIN ID : {this.state.admin.id}</span>
                            </div>
                            <Button className="logoutButton text-center" variant="danger" onClick={this.handleLogout}>Logout</Button>

                        </div>
                    </div>
                </div>
                <div className="mainbg">
                    <div className='mainbg-body text-center d-flex justify-content-center'>


                        {this.state.track.showTable && (
                            <div>
                                <CustomTable handleMarkAsCarrier={this.handleMarkAsCarrier} carrier={this.state.carrier} track={this.state.track} showContactTable={this.showContactTable} />
                            </div>
                        )}
                        {this.state.track.contactTable && (
                            <div>
                                <TrackCustomersTable carrier={this.state.carrier} track={this.state.track} />
                            </div>
                        )}
                        {this.state.carrier.showTable && (
                            <div>
                                <SuspectsTable carrier={this.state.carrier} />
                            </div>
                        )}

                    </div>
                    <div className="bottom-buttons text-center">
                        <div className='row text-center'>
                            <div className='col text-center'>
                                <Button variant="primary" onClick={this.handleShowTrackForm} className='bottom-buttons-item'>Track a Person</Button>
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
                                        spacer={''}
                                        Component={"input"}
                                        className="autocomplete-text"
                                        name='customerId'
                                    // matchAny
                                    />
                                </div>

                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Track from</Form.Label>
                                <div style={{ marginLeft: '20px' }}>
                                    <DatePicker
                                        name='date'
                                        selected={this.state.track.dateFrom}
                                        onChange={this.handleTrackDate}
                                        dateFormat="dd - MM - yyyy"
                                    />
                                </div>
                            </Form.Group>
                            <Form.Text style={{ cursor: "pointer" }} className="text-muted" onClick={() => {
                                let track = Object.assign({}, this.state.track)
                                track.dateFrom = new Date("2020", "02", "24", "00", "00", "00")
                                this.setState({
                                    track
                                })
                            }}>
                                Set date to beginning of lockdown (24 March 2020)
                                </Form.Text>
                            <center>
                                <Button variant="primary" type='submit' name='track'>
                                    {this.state.track.loading && <Spinner animation="border" variant='primary' /> || 'Track'}
                                </Button>
                                {this.state.track.error && <div style={{ color: 'red' }}>{this.state.track.error}</div>}
                            </center>
                        </Form>
                    </Modal.Body>
                </Modal>


            </div>

        )
    }

}
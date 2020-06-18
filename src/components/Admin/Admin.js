import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header_new.png';
import ShopLogo from '../../assets/shop.png';
import adminBack from '../../assets/covid.jpg'
import DatePicker from "react-datepicker";
import "./Admin.css"
import axios from 'axios';

// import './Shop.css';
import { Button, Modal, Form, Col, Container, Row, Spinner, Table } from 'react-bootstrap';
// var DatePicker = require("react-bootstrap-date-picker");
import "react-datepicker/dist/react-datepicker.css";

function CustomTable({ id, data }) {
    // console.log(id, data)
    return (
        <div className='table-container'>
            <div>
                <div>
                    <span className='customer-title'>{id}</span>
                
               
                    <Button className='bottom-buttons-item danger track-display-button'> Mark as Carrier</Button>
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
                    {data.map((ele, index) => {
                        // console.log(ele.slot_begin)
                        const date = new Date(ele.slot_begin)
                        const month = date.toLocaleString('default', { month: 'long' });
                        let hours = date.getHours()
                        // console.log(hours)
                        const ampmst = hours >= 12 ? "PM" : "AM";
                        hours = hours >=12 ? hours-=12 : hours;
                        hours = hours<=9 ? '0' + hours : hours;
                        const ts = date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' ' + hours + ':' + date.getMinutes() + ' ' + ampmst;
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{ele.shop_id}</td>
                                <td>{ts}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default function Admin() {
    const BASE_URL = 'https://spider.nitt.edu/chainrunner';
    let { id } = useParams();
    let adminName = "Kaathaveraayan";
    const [adminLogoutRedirect, setAdminLogoutRedirect] = useState(false);
    const [showTrackForm, setShowTrackForm] = useState(false)
    const [trackLoading, setTrackLoading] = useState(false)
    const [trackDate, setTrackDate] = useState(new Date())
    const [trackError, setTrackError] = useState(false)
    const [trackResponseData, setTrackResponseData] = useState(false)

    useEffect(() => {
    }, []);

    const handleClose = () => setShowTrackForm(false);

    const handleLogout = () => {
        setAdminLogoutRedirect(true);
    }

    const handleShowTrackForm = () => {
        setShowTrackForm(true)
    }

    const handleTrackDate = (value) => {
        setTrackDate(value)
    }


    const handleTrackSubmit = (e) => {
        setTrackLoading(true)
        setTrackError(false)
        setTrackResponseData(false);
        e.preventDefault()
        let apiUrl = BASE_URL + '/api/track'
        let cust_id = e.target.elements.customerId.value
        axios.post(apiUrl, {
            "customer_id": e.target.elements.customerId.value,
            "admin_id": id,
            "date": e.target.elements.date.value
        }).then(response => {
            // console.log(response)
            setTrackLoading(false)

            if (response.status == 200 && response.data.length !== 0) {
                handleClose()
                setTrackResponseData({
                    "id": cust_id,
                    "data": response.data
                })
            }
            else {
                setTrackError(true)
            }
        });
    }

    if (adminLogoutRedirect) {
        let url = "/"
        return <Redirect to={url} />
    }
    else {
        return (
            <div className='admin-bg'>
                <img alt="hero" className="hero" src={Hero} />
                <div className="UserNavbar">
                    <label className="title">SHOPTIK</label>
                    <div className='d-inline sideNav'>
                        <img className="shopIcon" onClick={handleLogout} src={ShopLogo} alt="icon" />
                        <label className="logoutText" onClick={handleLogout} >Logout</label>
                        <div className='welcomeInfo'>
                            <span>Welcome, {adminName}  </span>
                            <br />
                            <span> ADMIN ID : {id}</span>
                        </div>
                    </div>
                </div>
                <div className="mainbg">
                    <div className='mainbg-body'>
                        {trackResponseData && !trackError && (
                            <div>
                                {CustomTable(trackResponseData)}
                            </div>
                        )}
                    </div>
                    <div className="bottom-buttons">
                        <div className='row'>
                            <div className='col text-center'>
                                <Button onClick={handleShowTrackForm} className='bottom-buttons-item'>Track a Person</Button>
                                <Button className='bottom-buttons-item danger'>Show List of Suspects</Button>
                            </div>
                        </div>

                    </div>

                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showTrackForm}
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>TRACK A PERSON</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleTrackSubmit}>
                            <Form.Group >
                                <Form.Label>Name of person</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name='customerId' />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Track from</Form.Label>
                                <div style={{ marginLeft: '20px' }}>
                                    <DatePicker
                                        name='date'
                                        selected={trackDate}
                                        onChange={handleTrackDate}
                                    />
                                </div>
                            </Form.Group>
                            <center>
                                <Button variant="primary" type='submit' name='track'>
                                    {trackLoading && <Spinner animation="border" variant='primary' /> || 'Track'}
                                </Button>
                                {trackError && <div style={{ color: 'red' }}>No information found for given ID</div>}
                            </center>
                        </Form>
                    </Modal.Body>
                </Modal>


            </div>

        )
    }

}
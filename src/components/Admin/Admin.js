import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header_new.png';
import ShopLogo from '../../assets/shop.png';
import adminBack from '../../assets/covid.jpg'
import DatePicker from "react-datepicker";
import "./Admin.css"
// import './Shop.css';
import { Button, Modal, Form} from 'react-bootstrap';
// var DatePicker = require("react-bootstrap-date-picker");
import "react-datepicker/dist/react-datepicker.css";

export default function Admin() {
    let { id } = useParams();
    let adminName = "Kaathaveraayan";
    const [adminLogoutRedirect, setAdminLogoutRedirect] = useState(false);
    const [showTrackForm, setShowTrackForm] = useState(false)
    const [trackDate, setTrackDate] = useState(new Date())

    useEffect(() => {
    }, []);

    const handleClose = () => setShowTrackForm(false);

    const handleLogout = () => {
        setAdminLogoutRedirect(true);
    }

    const handleShowTrackForm = () => {
        setShowTrackForm(true)
    }

    const handleDateChange = (value) => {
        // console.log(value)
        setTrackDate(value)
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
                        <Form>
                            <Form.Group >
                                <Form.Label>Name of person</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label>Track from</Form.Label>
                                <div  style = {{marginLeft: '20px'}}>
                                <DatePicker
                                   
                                    selected={trackDate}
                                    onChange={handleDateChange}
                                />
                                </div>
                            </Form.Group>
                            <center>
                                <Button variant="primary" type="submit">
                                Track
                                </Button>
                            </center>
                        </Form>
                    </Modal.Body>
                </Modal>


            </div>

        )
    }

}

// <div key={stock.pid} className="itemRow">
//     <div className="itemBox">
//     <label>{stock.item}</label>
//     </div>
//     <Button variant="primary">
//     -
//     </Button>
// </div>   

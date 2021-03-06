import React, { useState } from 'react';
import Hero from '../../assets/Hero.png';
import User from '../../assets/user.png';
import Shop from '../../assets/shop.png';
import './Home.css';
import { Button, Modal, Form, Navbar, Nav, FormControl, NavDropdown } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import img1 from '../../assets/leftimage.png';
import img2 from '../../assets/rightimage.png';
import img3 from '../../assets/MarketCard.png';
import img4 from '../../assets/ShopByCategory.png';
import img5 from '../../assets/Showyourticketatstorefront.png';
import img6 from '../../assets/secondrightimage.png';
import img7 from '../../assets/FooterImage.png';
import img8 from '../../assets/FooterText.png';
import img9 from '../../assets/Copyright.png';
import img10 from '../../assets/Rel1.png';
import img11 from '../../assets/Rel2.png';
import img12 from '../../assets/Rel3.png';



export default function Home() {

    const [userPageRedirect, setUserPageRedirect] = useState(false);
    const [shopPageRedirect, setShopPageRedirect] = useState(false);
    const [adminPageRedirect, setAdminPageRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [wrongCred, setWrongCred] = useState(false);
    const [userId, setUserId] = useState(null);
    const [shopId, setShopId] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const [shopLoginModal, setShopLoginModal] = useState(true)
    const [shopRegisterModal, setShopRegsisterModal] = useState(false)
    const [userLoginModal, setUserLoginModal] = useState(true)
    const [userRegisterModal, setUserRegisterModal] = useState(false)


    const BASE_URL = 'https://spider.nitt.edu/chainrunner';

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdminClose = () => setShowAdmin(false);
    const handleAdminShow = () => setShowAdmin(true);
    const handleCloseShop = () => setShowShop(false);
    const handleShowShop = () => setShowShop(true);

    const handleShopLoginModalClick = () => {
        setShopLoginModal(true)
        setShopRegsisterModal(false)
    }
    const handleShopRegisterModalClick = () => {
        setShopRegsisterModal(true)
        setShopLoginModal(false)
    }
    const handleUserLoginModalClick = () => {
        setUserLoginModal(true)
        setUserRegisterModal(false)
    }
    const handleUserRegisterModalClick = () => {
        setUserRegisterModal(true)
        setUserLoginModal(false)
    }

    const userRegister = (e) => {
        e.preventDefault();
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        const name = e.target.elements.formBasicName.value;
        const address = e.target.elements.formControlTextarea1.value;
        const phone = e.target.elements.formBaiscPhone.value;
        let apiUrl = BASE_URL+'/api/user/register';
        axios.post(apiUrl,{
            "name" : name,
            "email" : email,
            "address":address,
            "phone" :phone,
            "pwd" : pwd
        }).then(response => {
            if(response.data.success === true){
                alert("Successfully Registered!");
                handleClose();
                setUserRegisterModal(false);
            }
            else
            {
                alert("Sorry, Not Registered! Try Again");
                handleClose();
                setUserRegisterModal(false);
            }
        })
    }

    const shopRegister = (e) => {
        e.preventDefault()
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        const name = e.target.elements.formBasicName.value;
        const address = e.target.elements.formControlTextarea1.value;
        const phone = e.target.elements.formBaiscPhone.value;
        const image = e.target.elements.formBasicImage.value;
        const holdLimit = e.target.elements.formBasicHoldLimit.value;
        console.log(image);
        let apiUrl = BASE_URL+'/api/shop/register';
        axios.post(apiUrl,{
            "name" : name,
            "lat": 20.09,
            "lon" :78.098,
            "email" : email,
            "address":address,
            "phone" :phone,
            "pwd" : pwd,
            "hold": holdLimit,
            "image_url" : image
        }).then(response => {
            if(response.data.success === true){
                alert("Successfully Registered!");
                handleCloseShop();
                setShopRegsisterModal(false);
            }
            else
            {
                alert("Sorry, Not Registered! Try Again");
                handleCloseShop();
                setShopRegsisterModal(false);
            }
        })
    }

    const userLogin = (e) => {
        e.preventDefault();
        console.log("USER LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value;
        console.log(email, pwd);
        //login api for user must be called
        let url = BASE_URL + '/api/user/login/' + email + '/' + pwd;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if(resJson.success === true){
                setWrongCred(false);
                setUserId(resJson.id);
                setUserPageRedirect(true);
            }
            else{
                setWrongCred(true);
            }
        });
    }

    const shopLogin = (e) => {
        e.preventDefault();
        console.log("SHOP LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        console.log(email, pwd);
        let url = BASE_URL + '/api/shop/login/' + email + '/' + pwd;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if(resJson.success === true){
                setWrongCred(false);
                setShopId(resJson.id);
                setShopPageRedirect(true);
            }
            else{
                setWrongCred(true);
            }
        });
    }

    const adminLogin = (e) => {
        e.preventDefault();
        console.log("ADMIN LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        console.log(email, pwd);
        let url = BASE_URL + '/api/admin/login/' + email + '/' + pwd;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            if(resJson.success === true){
                setWrongCred(false);
                setAdminId('0x83623E189eFF48247D8c303b1e95BC36560C41a2');
                setAdminPageRedirect(true);
            }
            else{
                setWrongCred(true);
            }
        });
    }

    const startBook = () => {
        handleShow();
    }

    
    if(userPageRedirect){
        let url = "/user/"+userId;
        return <Redirect to={url}/>
    }
    else if (shopPageRedirect) {
        let url = "/shop/" + shopId;
        return <Redirect to={url} />
    }
    else if (adminPageRedirect) {
        let url = "/admin/" + adminId;
        return <Redirect to={url} />
    }
    else {
        return (
            <div>
                <div>
                    <img alt="hero" className="hero" src={Hero} />
                    <div className="navbar">
                        <label className="title">SHOPTIK</label>
                        <input className="searchbar" type="text" placeholder="search for shops" />
                        <img alt="hero" className="shopIcon" src={User} onClick={handleShow} />
                        <label className="signText" onClick={handleShow}>  Sign in or Register </label>
                        <img className="shopIcon" onClick={handleShowShop} src={Shop} alt="hero" />
                        <label className="signText" onClick={handleShowShop}> Shop Login</label>
                        <img alt="hero" className="shopIcon" src={User} onClick={handleAdminShow} />
                        <label className="signText" onClick={handleAdminShow}>  Admin </label>
                    </div>
                    <div className="mainblock">
                        <label className="mainSectionHeading">SHOPS THAT HAVE YOUR NEEDS READY</label>
                        <br/>
                        <button className = "loginRedirect" onClick={startBook}> <label className="startText"> CLICK HERE TO START BOOKING</label> </button>
                        <br/>
                        <div>
                            <img src={img10} alt="img10" className="Rel1" />
                            <img src={img11} alt="img11" className="Rel2" />
                            <img src={img12} alt="img12" className="Rel3" />
                            <img src={img1} alt="img1" className="leftImage" />
                            <img src={img2} alt="img2" className="rightImage" />
                        </div>
                        <br/>
                            <img src = {img3} alt="img3" className="middleImage" />
                            <img src = {img4} alt="img4" className="SecondMiddleImage" />
                            <img src = {img5} alt="img5" className="SecondLeftImage" />
                            <img src = {img6} alt="img6" className="SecondRightImage" />
                            <img src = {img7} alt="img7" className="FooterImage" />
                            <img src = {img8} alt="img8" className="FooterText" />
                            
                    </div>
                </div>


                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span className='modal-title' style={userLoginModal ? { textDecoration: 'underline' } : {}} onClick={handleUserLoginModalClick}>User Login</span>
                            <span className='modal-title' style={userRegisterModal ? { textDecoration: 'underline' } : {}} onClick={handleUserRegisterModalClick}>User Register</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {userLoginModal && <div>
                            {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                            <Form onSubmit={userLogin}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control  required={true} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required={true} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <center>
                                    <Button variant="primary" type="submit">
                                        Login
                                </Button>
                                </center>
                            </Form>
                        </div>}
                        {userRegisterModal && <div>
                            <Form onSubmit={userRegister}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required={true} type="text" placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required={true} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control  required={true} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formControlTextarea1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control  required={true} as="textarea" rows="3" />
                                </Form.Group>
                                <Form.Group controlId="formBaiscPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control required={true} type="number" placeholder="Enter Phone" />
                                </Form.Group>
                                <center>
                                    <Button variant="primary" type="submit">
                                        Register
                                </Button>
                                </center>
                            </Form>
                        </div>}
                    </Modal.Body>
                </Modal>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showShop}
                    onHide={handleCloseShop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span className='modal-title' style={shopLoginModal ? { textDecoration: 'underline' } : {}} onClick={handleShopLoginModalClick}>Shop Login</span>
                            <span className='modal-title' style={shopRegisterModal ? { textDecoration: 'underline' } : {}} onClick={handleShopRegisterModalClick}>Shop Register</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {shopLoginModal && <div>
                            {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                            <Form onSubmit={shopLogin}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required={true} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required={true} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <center>
                                    <Button variant="primary" type="submit">
                                        Login
                                </Button>
                                </center>
                            </Form>
                        </div>}
                        {shopRegisterModal && <div>
                            <Form onSubmit={shopRegister}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required={true} type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required={true} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formControlTextarea1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required={true} as="textarea" rows="3" />
                                </Form.Group>
                                <Form.Group controlId="formBaiscPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control required={true} type="number" placeholder="Enter Phone" />
                                </Form.Group>
                                <Form.Group controlId="formBasicImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control required={true} type="text" placeholder="Enter Url" />
                                </Form.Group>
                                <Form.Group controlId="formBasicHoldLimit">
                                    <Form.Label>Hold Limit</Form.Label>
                                    <Form.Control required={true} type="number" placeholder="Enter hold limit" />
                                    <Form.Text className="text-muted">
                                        Hold limit is the hold limit
                                </Form.Text>
                                </Form.Group>



                                <center>
                                    <Button variant="primary" type="submit">
                                        Register
                                </Button>
                                </center>
                            </Form>
                        </div>}
                    </Modal.Body>
                </Modal>


                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showAdmin}
                    onHide={handleAdminClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>

                            {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                            <Form onSubmit={adminLogin}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>
                                <center>
                                    <Button variant="primary" type="submit">
                                        Login
                                </Button>
                                </center>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div >

        );
    }

}




// var AddTicket = React.createClass({
//     handleSubmitEvent: function (event) {
//         event.preventDefault(); 
//         console.log("Email--"+this.refs.email.value.trim()); 
//         console.log("Issue Type--"+this.refs.issueType.value.trim()); 
//         console.log("Department--"+this.refs.department.value.trim()); 
//         console.log("Comments--"+this.refs.comment.value.trim()); 
//     }
//login api for user must be called
        // switch(pwd){
        //     case 'shopkeeper': {
        //         setShopPageRedirect(true);
        //         setShopId(1);//
        //         break;
        //     }
        //     case 'admin':{
        //         setAdminPageRedirect(true);
        //         setAdminId(1);
        //         break;
        //     }
        //     case 'customer':{
        //         setUserPageRedirect(1)
        //         setUserPageRedirect(1)
        //         break;
        //     }
        //     default:
        //         {
        //     setWrongCred(true);
        //     }
        // }
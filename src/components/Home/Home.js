import React , {useState} from 'react';
import Hero from '../../assets/Hero.png';
import User from '../../assets/user.png';
import Shop from '../../assets/shop.png';
import './Home.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { Redirect } from "react-router-dom";



export default function Home() {

    const [ userPageRedirect ,setUserPageRedirect ] = useState(false);
    const [ shopPageRedirect ,setShopPageRedirect ] = useState(false);
    const [ adminPageRedirect, setAdminPageRedirect ] = useState(false);
    const [show, setShow] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [wrongCred,setWrongCred] = useState(false);
    const [userId,setUserId] = useState(null);
    const [shopId,setShopId] = useState(null);
    const [adminId, setAdminId] = useState(null);
    const BASE_URL = 'https://spider.nitt.edu/chainrunner';

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAdminClose = () => setShowAdmin(false);
    const handleAdminShow = () => setShowAdmin(true);
    const handleCloseShop = () => setShowShop(false);
    const handleShowShop = () => setShowShop(true);

    const userLogin = (e) => {
        e.preventDefault();
        console.log("USER LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        console.log(email, pwd);
        //login api for user must be called
        let url = BASE_URL+'/api/user/login/'+email+'/'+pwd;
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
        let url = BASE_URL+'/api/shop/login/'+email+'/'+pwd;
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
        let url = BASE_URL+'/api/admin/login/'+email+'/'+pwd;
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
    if(userPageRedirect){
        let url = "/user/"+userId;
        return <Redirect to={url}/>
    }
    else if(shopPageRedirect){
        let url = "/shop/"+shopId;
        return <Redirect to={url} />
    }
    else if(adminPageRedirect){
        let url = "/admin/"+adminId;
        return <Redirect to={url} />
    }
    else{
        return(
            <div>
                <div>
                    <img alt="hero" className="hero" src={Hero} />
                    <div className="navbar">
                        <label className="title">SHOPTIK</label>
                        <input className="searchbar" type="text" placeholder="search for shops"/>
                        <img alt="hero" className="shopIcon" src={User} onClick={handleShow}/>
                        <label className="signText" onClick={handleShow}>  Sign in or Register </label> 
                        <img className="shopIcon" onClick={handleShowShop} src={Shop} alt="hero" />
                        <label className="signText" onClick={handleShowShop}> Shop Login</label> 
                        <img alt="hero" className="shopIcon" src={User} onClick={handleAdminShow}/>
                        <label className="signText" onClick={handleAdminShow}>  Admin </label> 
                    </div>
                    <div className="mainblock">
                        <label className="mainSectionHeading">SHOPS THAT HAVE YOUR NEEDS READY</label>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>
    
    
                <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} 
                onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                        <Form onSubmit={userLogin}>
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control  type="email" placeholder="Enter email" />
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
                    </Modal.Body>
                </Modal>
    
                <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showShop} 
                onHide={handleCloseShop}>
                    <Modal.Header closeButton>
                    <Modal.Title>Shop Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                        <Form onSubmit={shopLogin}>
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control  type="email" placeholder="Enter email" />
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
                        {wrongCred && <label className="wrongUserCred">Wrong Username or Password</label>}
                        <Form onSubmit={adminLogin}>
                            <Form.Group  controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control  type="email" placeholder="Enter email" />
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
                    </Modal.Body>
                </Modal>
            </div>

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
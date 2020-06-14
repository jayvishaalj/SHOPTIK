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
    const [show, setShow] = useState(false);
    const [showShop, setShowShop] = useState(false);
    const [wrongCred,setWrongCred] = useState(false);
    const [userId,setUserId] = useState(null);
    const [shopId,setShopId] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseShop = () => setShowShop(false);
    const handleShowShop = () => setShowShop(true);

    const userLogin = (e) => {
        e.preventDefault();
        console.log("USER LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        console.log(email, pwd);
        //login api for user must be called
        if(pwd !== "admin"){
            setWrongCred(true);
        }
        else
        {
            setWrongCred(false);
            setUserPageRedirect(true);
            setUserId(1);//here set the user id is as public key got from backend
        }
    }

    const shopLogin = (e) => {
        e.preventDefault();
        console.log("SHOP LOGINED");
        const email = e.target.elements.formBasicEmail.value;
        const pwd = e.target.elements.formBasicPassword.value
        console.log(email, pwd);
        //login api for user must be called
        if(pwd !== "admin"){
            setWrongCred(true);
        }
        else
        {
            setWrongCred(false);
            setShopPageRedirect(true);
            setShopId(1);//here set the shop id is as public key got from backend
        }
    }
    if(userPageRedirect){
        let url = "/user/"+userId;
        return <Redirect to={url}/>
    }
    else if(shopPageRedirect){
        let url = "/shop/"+shopId;
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
                        <img alt="hero" src={User} onClick={handleShow}/>
                        <label className="signText" onClick={handleShow}>  Sign in or Register </label> 
                        <img className="shopIcon" onClick={handleShowShop} src={Shop} alt="hero" />
                        <label className="signText" onClick={handleShowShop}> Shop Login</label> 
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
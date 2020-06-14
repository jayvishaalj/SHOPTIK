import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header.png';
import ShopLogo from '../../assets/shop.png';
import './Shop.css';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';


export default function ShopToken(){

    let { id } = useParams();
    let shopName = "Reliance Mart";
    let shopProfile = 'data:image/png;base64,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';
    const jsonRes = [
        {
            "slot" : "08:00",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "08:45",
            "booked" : "28",
            "class" : "danger"
        },
        {
            "slot" : "09:30",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "10:15",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "11:00",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "11:45",
            "booked" : "28",
            "class" : "danger"
        },
        {
            "slot" : "12:30",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "01:15",
            "booked" : "28",
            "class" : "success"
        },
        {
            "slot" : "02:00",
            "booked" : "28",
            "class" : "warning"
        },
        {
            "slot" : "02:45",
            "booked" : "28",
            "class" : "success"
        }
    ]
    var days = [];
    var someDate = new Date();
    for(let i=1;i<=7;i++){
        someDate.setDate(someDate.getDate() + 1);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        var someFormattedDate = dd + '/'+ mm + '/'+ y;
        days.push(someFormattedDate);
    }
    const [shopLogoutRedirect, setShopLogoutRedirect] = useState(false);


    const handleLogout = () =>{
        setShopLogoutRedirect(true);
    }

    if(shopLogoutRedirect){
        let url = "/"
        return <Redirect to={url}/>
    }
    else{
        return(
            <div>
                    <img alt="hero" className="hero" src={Hero} />
                    <div className="UserNavbar">
                        <label className="title">SHOPTIK</label>
                        <div>
                        <img className="shopIcon" onClick={handleLogout} src={ShopLogo} alt="icon"/>
                        <label classNaTODAYme="logoutText" onClick={handleLogout}>Logout</label>
                        </div>                
                    </div>
                    <div className="jumbotron">
                        <p className="welcomeText">Welcome, {shopName}  </p>
                        <p className="shopIdText"> SHOP ID : {id}</p>
                        <center><img className="shopProfile" src={shopProfile} alt="seems like you didnt upload ur shop pic!" /></center>
                        <div className="buttonDiv">
                        <Button variant="primary" size="lg">
                            STOCK
                        </Button>
                        <Button variant="primary" size="lg">
                            TOKENS BOOKED
                        </Button>
                        </div>
                    </div>
                    <div>
                        <center><label className="headingText">SLOTS BOOKED FOR YOUR STORE</label></center>
                        <label className="dateText">{days[0]} : </label>
                        <div className="slotsArea">
                        {
                            jsonRes.map(json =>
                                <OverlayTrigger
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-${json.slot}`}>
                                    Tokens Sold : <strong>{json.booked}</strong>.
                                    </Tooltip>
                                }
                                >
                                    <Button className="slotBox" variant={"outline-"+json.class}>{json.slot}</Button>
                                </OverlayTrigger>                         
                            )
                        }
                        </div>
                    </div>
            </div>
        );
    }
    
}

{/* <label className="dateText">{days[0]} : </label>
<div className="slotsArea">
    <Button className="slotBox" variant="outline-success">08:00</Button>
    <Button className="slotBox" variant="outline-success">08:45</Button>
    <Button className="slotBox" variant="outline-success">09:30</Button>
    <Button className="slotBox" variant="outline-warning">10:15</Button>
    <Button className="slotBox" variant="outline-success">11:00</Button>
    <Button className="slotBox" variant="outline-warning">11:45</Button>
    <Button className="slotBox" variant="outline-success">12:30</Button>
    <Button className="slotBox" variant="outline-danger">01:15</Button>
    <Button className="slotBox" variant="outline-danger">02:00</Button>
    <Button className="slotBox" variant="outline-success">02:45</Button>
</div> */}
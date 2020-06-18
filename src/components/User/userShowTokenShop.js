import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header.png';
import ShopLogo from '../../assets/shop.png';
import '../Shop/Shop.css';
import { Button, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';

export default function ShopToken(){

    let { id } = useParams();
    const BASE_URL = 'https://spider.nitt.edu/chainrunner';
    const [isLoading, setIsLoading] = useState(true);
    const [shopName, setShopName] = useState('');
    const [shopImage, setShopImage] = useState('');
    const [holdLimit, setHoldLimit] = useState(0);
    const [shopLogoutRedirect, setShopLogoutRedirect] = useState(false);
    const [shopTokensBooked, setShopTokensBooked] = useState([]);
    const[ showTookenBook, setShowTookenBook] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    var days = [];
    var someDate = new Date();
    for(let i=1;i<=7;i++){
        someDate.setDate(someDate.getDate() + 1);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        var someFormattedDate = y +'-'+mm+'-'+ dd ;
        days.push(someFormattedDate);
    }

    useEffect(() =>{
        let apiCall = BASE_URL+'/api/shop/details/'+id;
        fetch(apiCall)
        .then(res => res.json())
        .then(async response => {
            setShopName(response.name);
            setShopImage(response.image); 
            setHoldLimit(response.hold_limit);
            let shopTokens = [];
            let i =0;
            let apiUrl = BASE_URL+'/api/shop/tokens/booked/'+days[i]+'/'+id;
            // await axios.get(apiUrl).then(response => {
            //     console.log(response.data);
            //     setShopTokensBooked(response.data);    
            //     setIsLoading(false);            
            // });
            for(i=0;i<7;i++){
                console.log(days);
                let apiUrl = BASE_URL+'/api/shop/tokens/booked/'+days[i]+'/'+id;
                await axios.get(apiUrl).then(response => {
                    let data = { day : days[i] , data : response.data};
                    shopTokens.push(data);
                });
                if(i===6)
                {
                    await setShopTokensBooked(shopTokens);
                    setIsLoading(false);
                    console.log("ShpoTokensBooked",shopTokensBooked);
                }
            }           

        });
    
    },[]);


    const handleLogout = () =>{
        setShopLogoutRedirect(true);
    }

    const handleClose = () => setShowTookenBook(false);

    const handleBookToken = (slotId) => {
        console.log(slotId);
        setSelectedSlot(slotId);
        setShowTookenBook(true);
    }

    if(shopLogoutRedirect){
        let url = "/"
        return <Redirect to={url}/>
    }
    else{
        if(isLoading){
            return(
                <div className="loadingArea">
                    <label>LOADING.....:)</label>
                    <ReactLoading type="cubes" color="#000" height={500} width={300} />
                </div>
            )
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
                            <p className="shopIdText"> HOLD LIMIT : {holdLimit}</p>
                            <center><img className="shopProfile" src={shopImage} alt="seems like you didnt upload ur shop pic!" /></center>
                            <div className="buttonDiv">
                            </div>
                        </div>
                        <div>
                            <center><label className="headingText" onClick={() => {
                                console.log(shopTokensBooked);
                            }}>SLOTS BOOKED FOR YOUR STORE</label></center>
                            {shopTokensBooked.map(token => 
                                <div key={token.day}>
                                    <label className="dateText">{token.day} : </label>
                                    <div className="slotsArea">
                                    {
                                        token.data.map(json =>
                                            <OverlayTrigger
                                            key={json.slot}
                                            placement='top'
                                            overlay={
                                                <Tooltip id={`tooltip-${json.slot}`}>
                                                Tokens Sold : <strong>{json.count}</strong>.
                                                </Tooltip>
                                            }
                                            >
                                                <Button className="slotBox" variant={"outline-"+json.class} onClick={() => handleBookToken(json.slot)}>{json.slot}</Button>
                                            </OverlayTrigger>                         
                                        )
                                    }
                                    </div>
                                </div> 
                            )}
                        </div>
                        <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showTookenBook} 
                onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Book Your Token</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="displaySelectedShop"> SHOP ID : {id}</p>
                        <label className="displaySelectedSlot"> SELECTED SLOT : {selectedSlot}</label>
                        <div className="buttonsModal">
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger" onClick={handleClose}>Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                </div>
            );
        }
    }
    
}
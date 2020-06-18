import React, { useState, useEffect}  from 'react';import { useParams, Redirect } from 'react-router-dom';
import UserLogo from '../../assets/user.png';
import Hero from '../../assets/header.png';
import './User.css';
import { Button, Card, Accordion, Container, Row, InputGroup, Modal, Badge, FormControl } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import QRCode from 'qrcode.react';


export default function User() {
    let { id } = useParams();//this is the if of the user that is public key
    const BASE_URL = 'https://spider.nitt.edu/chainrunner';
    const [userLogoutRedirect, setUserLogoutRedirect] = useState(false);
    const [tokenList, setTokenList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userHomePageRedirect, setuserHomePageRedirect] = useState(false);
    const [reportStore, setReportStore] = useState({shopName:"",slotId:"",hold_limit:0});
    const [showReportStore, setShowReportStore] = useState(false);

    useEffect(() =>{
        let apiUrl = BASE_URL + '/api/user/tokens/'+id;
        fetch(apiUrl)
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson);
            setTokenList(resJson);
            setIsLoading(false);
        })
    },[]);

    const handleLogout = () =>{
        setUserLogoutRedirect(true);
    }
    const handleReportClose = () => setShowReportStore(false);

    const handleReportShop = (shopName,slotId,hold_limit) => {
        setReportStore({shopName:shopName,slotId:slotId,hold_limit:hold_limit});
        setShowReportStore(true);
    }

    const handleUserHomePageRedirect = () => {
        setuserHomePageRedirect(true);
    }
    const handleReport = () => {
        alert("Shop has been Reported");
        setShowReportStore(false);
    }

    if(userLogoutRedirect){
        let url = "/"
        return <Redirect to={url}/>
    }
    else if(userHomePageRedirect){
        let url= "/user/"+id;
        return <Redirect to={url} />
    }
    else
    {
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
                    <div className='shop-bg'>
                        <img alt="hero" className="hero" src={Hero} />
                        <div className="UserNavbar">
                            <label className="title">SHOPTIK</label>
                            <label className="logoutText" onClick={handleUserHomePageRedirect}>Home</label>
                            <div>
                            <img className="shopIcon" onClick={handleLogout} src={UserLogo} alt="icon"/>
                            <label className="logoutText" onClick={handleLogout} >Logout</label>
                            </div>                
                        </div>
                        <div className="jumbotronBackGround">
                            <p className="welcomeText">Welcome,</p>
                            <p className="welcomeText">Your id : {id}</p>
                            <marquee>SHOP SAFE WITH US, STAY SAFE, STAY HOME !!!</marquee>
                            <p className="bookTicketHeading">BOOKED TOKENS</p>
                    </div> 
                    </div>
                    <div className="grid-container">
                            {tokenList.map(token => 
                                <div className="grid-item">
                                    {/* <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={token.image} />
                                        <Card.Body>
                                                <Card.Title>{token.name}</Card.Title>
                                                <Card.Text>
                                                    <p className="displayDetails">USER ID : {id}</p>
                                                    <p className="displayDetails">HOLD LIMIT: {token.hold_limit}</p>
                                                    <p className="displayDetails">SHOP ADDRESS: {token.shop_address}</p>
                                                    <p className="displayDetails">SLOT TIMING & DATE: {token.slot}</p>
                                                </Card.Text>
                                        </Card.Body>
                                    </Card> */}
                                    <Accordion defaultActiveKey="0">
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={token.image} alt="Avatar" className="imageCard"/>
                                                <p className="shopHeadingText">{token.name}</p>
                                                <p className="displayDetails">{token.slot}</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <p className="itemInShopText">DETAILS ABOUT SHOP</p>
                                                <p className="displayDetails"> HOLD LIMIT : {token.hold_limit}</p>
                                                <p className="shopAddressText">{token.shop_address}</p>
                                                <p className="shopAddressText">{token.email}</p>
                                                <Button className="toggleButton" variant="primary" onClick={() => handleReportShop(token.name,token.slot,token.hold_limit)}>Report Store</Button>
                                                <Accordion.Toggle as={Button}  className="toggleButton" variant="button" eventKey="1">
                                                   Show QR
                                                </Accordion.Toggle>
                                            </div>
                                        </div>
                                    </div> 
                                    <Accordion.Collapse  eventKey="1">
                                        <Card className="itemListCard">
                                        <Card.Body>
                                            <Container>
                                                <Row className="justify-content-md-center">
                                                <QRCode value={token.qr} width="20%" height="20%"/>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                        </Card>
                                    </Accordion.Collapse>
                                </Accordion>
                                </div>  
                            
                                )}
                    </div>
                    <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showReportStore} 
                    onHide={handleReportClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Report on {reportStore.shopName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>shop Limit : {reportStore.hold_limit}  </p>
                            <p>During Slot <Badge variant="secondary">{reportStore.slotId}</Badge> </p>
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text>Report Complaint</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>
                            <div className="buttonsOnReportModal">
                                <Button variant="warning" onClick={handleReport}>Report</Button>
                                <Button variant="danger" onClick={handleReportClose}>Cancel</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
            </div>   
            );
        }
        
    }
}

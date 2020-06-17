import React, { useState, useEffect}  from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserLogo from '../../assets/user.png';
import Hero from '../../assets/header.png';
import './User.css';
import { Button, Card, Accordion, Container, Row, Col } from 'react-bootstrap';
import ReactLoading from 'react-loading';


export default function User() {
        let { id } = useParams();//this is the if of the user that is public key
        const BASE_URL = 'https://spider.nitt.edu/chainrunner';
        const [userLogoutRedirect, setUserLogoutRedirect] = useState(false);
        const [shopsList, setShopsList] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() =>{
            let apiUrl = BASE_URL + '/api/shop/nearme';
            fetch(apiUrl)
            .then(res => res.json())
            .then(resJson => {
                console.log(resJson);
                setShopsList(resJson);
                setIsLoading(false);
            })
        },[]);

        const handleLogout = () =>{
            setUserLogoutRedirect(true);
        }

        if(userLogoutRedirect){
            let url = "/"
            return <Redirect to={url}/>
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
                                <div>
                                <img className="shopIcon" onClick={handleLogout} src={UserLogo} alt="icon"/>
                                <label className="logoutText" onClick={handleLogout} >Logout</label>
                                </div>                
                            </div>
                            <div className="jumbotronBackGround">
                                <p className="welcomeText">Welcome,</p>
                                <p className="welcomeText">Your id : {id}</p>
                                <p className="bookTicketHeading">BOOK YOUR TOKENS</p>
                        </div> 
                        </div>
                        <div className="grid-container">
                            {shopsList.map(shop => 
                                <div className="grid-item">
                                <Accordion defaultActiveKey="0">
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={shop.shop.image} alt="Avatar" className="imageCard"/>
                                                <p className="shopHeadingText">{shop.shop.name}</p>
                                                <p className="shopAddressText">{shop.shop.address}</p>
                                                <p className="shopAddressText">{shop.shop.phone}</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <p className="itemInShopText">ITEMS IN THIS SHOP</p>
                                                <ul className="itemList">

                                                    <li className="itemText">{shop.products[0][0]}</li>
                                                    <li className="itemText">{shop.products[1][0]}</li>
                                                    <li className="itemText">{shop.products[2][0]}</li>
                                                    <li className="itemText">{shop.products[3][0]}</li>
                                                </ul> 
                                                <Button className="toggleButton" variant="primary">Book Token</Button>
                                                <Accordion.Toggle as={Button}  className="toggleButton" variant="button" eventKey="1">
                                                   All Items
                                                </Accordion.Toggle>
                                            </div>
                                        </div>
                                    </div> 
                                    <Accordion.Collapse  eventKey="1">
                                        <Card className="itemListCard">
                                        <Card.Body>
                                            <Container>
                                                <Row className="justify-content-md-center">
                                                    {shop.products.map(product => 
                                                    <Col md="auto"><li className="itemText">{product[0]}</li></Col>
                                                        )}
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                        </Card>
                                    </Accordion.Collapse>
                                </Accordion>
                                </div>  
                            
                                )}
                    </div>
                </div>   
                );
            }
            
        }
}

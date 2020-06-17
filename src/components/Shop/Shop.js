import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header.png';
import ShopLogo from '../../assets/shop.png';
import './Shop.css';
import { Button, Form, Col, Container, Row, Spinner } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';

export default function Shop() {
    let { id } = useParams();
    const BASE_URL = 'https://spider.nitt.edu/chainrunner';
    const [isLoading, setIsLoading] = useState(true);
    const [shopName, setShopName] = useState('');
    const [shopImage, setShopImage] = useState('');
    const [stocks,setStocks] = useState([]);
    const [addProductLoading, setAddProductLoading] = useState(false);
    const [shopLogoutRedirect, setShopLogoutRedirect] = useState(false);
    const [shopTokenRedirect, setShopTokenRedirect] = useState(false);
    const [holdLimit, setHoldLimit] = useState(0);

    useEffect(() =>{
        let apiCall = BASE_URL+'/api/shop/details/'+id;
        fetch(apiCall)
        .then(res => res.json())
        .then(response => {
            setShopName(response.name);
            setShopImage(response.image); 
            setHoldLimit(response.hold_limit);
            apiCall = BASE_URL+'/api/shop/products/'+id;
            fetch(apiCall)
            .then(prodRes => prodRes.json())
            .then(prodResponse => {
                setStocks(prodResponse);
                console.log("USEEFFECT");
                setIsLoading(false);
            });
        });
    
    },[]);

    const loadProducts = () => {
        let apiCall = BASE_URL+'/api/shop/products/'+id;
            fetch(apiCall)
            .then(prodRes => prodRes.json())
            .then(prodResponse => {
                setStocks(prodResponse);
                console.log("USEEFFECT");
                setIsLoading(false);
            });
    }

    const handleLogout = () =>{
        setShopLogoutRedirect(true);
    }

    const handleShopTokenClicked = () => {
        setShopTokenRedirect(true);
    }

    //api call to be made to make availablity false to item from stock for a shop
    const handleRemoveItem = async (pid) => {
        const apiURL = BASE_URL+'/api/shop/stock/delete/'+id+'/'+pid;
        console.log("API URL : ",apiURL);
        fetch(apiURL)
        .then(res => res.json())
        .then( async resJson => {
            if(resJson.success === true){
                loadProducts();
            }
            alert(resJson.message);
        }); 
    }

    //api call to be made to add item to stocks of the shop
    const handleAddItem = (e) =>{
        e.preventDefault();
        setAddProductLoading(true);
        let apiUrl = BASE_URL+'/api/shop/stock/insert'
        axios.post(apiUrl,{
            "product" : e.target.elements.productName.value,
            "shop_id" : id,
            "product_id" : e.target.elements.productId.value
        }).then(response => {
            console.log(response);
            alert(response.data.message);
            if(response.data.success === true){
                loadProducts();
            }
            setAddProductLoading(false);
        });
    }



    if(shopLogoutRedirect){
        let url = "/"
        return <Redirect to={url}/>
    }
    else if(shopTokenRedirect){
        let url = "/shop/tokens/"+id;
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
        else
        {
            return(
            
                <div className='shop-bg'>
                    <img alt="hero" className="hero" src={Hero} />
                    <div className="UserNavbar">
                        <label className="title">SHOPTIK</label>
                        <div>
                        <img className="shopIcon" onClick={handleLogout} src={ShopLogo} alt="icon"/>
                        <label className="logoutText" onClick={handleLogout} >Logout</label>
                        </div>                
                    </div>
                    <div className="jumbotron">
                        <p className="welcomeText">Welcome, {shopName}  </p>
                        <p className="shopIdText"> SHOP ID : {id}</p>
                        <p className="shopIdText"> HOLD LIMIT : {holdLimit}</p>
                        <center><img className="shopProfile" src={shopImage} alt="seems like you didnt upload ur shop pic!" /></center>
                        <div className="buttonDiv">
                        <Button variant="primary" size="lg">
                            STOCK
                        </Button>
                        <Button variant="primary" size="lg" onClick={handleShopTokenClicked}>
                            TOKENS BOOKED
                        </Button>
                        </div>
                    </div>
                    <div>
                        <label className="addItemText">ADD ITEM</label>
                        <Form onSubmit={handleAddItem} className="productForm"> 
                            <Form.Row className="addProduct">
                                <Col xs={2}>
                                <Form.Group controlId="productId">
                                    <Form.Control placeholder="Product ID" />
                                </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="productName">
                                    <Form.Control placeholder="Product Name" />
                                </Form.Group>
                                </Col>
                                <Col xs={1}>
                                <Button variant="primary" className="addButton" type="submit" >
                                    +
                                </Button>
                                </Col>
                                <Col xs={2}>
                                {
                                    addProductLoading && (
                                    <div>
                                    <Spinner animation="grow" variant="primary" />
                                    <Spinner animation="grow" variant="secondary" />
                                    <Spinner animation="grow" variant="success" />
                                    </div>
                                    )
                                }
                                </Col>
                            </Form.Row>
                        </Form>
                        <label className="existingStockText">EXISTING STOCK</label>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <center><div>
                            {
                                stocks.map(stock => 
                                    <Container key={stock[1]}>
                                    <Row className="justify-content-md-center">
                                        <Col className="itemBox" sm={4}>
                                            <label>{stock[0]}</label>
                                        </Col>
                                        <Col className="itemButton" sm={2}>
                                            <Button variant="primary" onClick={() => handleRemoveItem(stock[1])} >
                                            -
                                            </Button>
                                        </Col>
                                    </Row>
                                    </Container>                   
                                )
                            }
                        </div></center>
                    </div>
                    
                </div>
            )
        }
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

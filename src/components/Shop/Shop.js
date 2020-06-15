import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Hero from '../../assets/header.png';
import ShopLogo from '../../assets/shop.png';
import './Shop.css';
import { Button, Form, Col, Container, Row, Spinner } from 'react-bootstrap';

export default function Shop() {
    let { id } = useParams();
    let shopName = "Reliance Mart";
    let shopProfile = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQoAAAC+CAMAAAD6ObEsAAAAq1BMVEX///+/oWEAAAAfGRddWlnt7ewQBgC7m1S+n10aExHf3t78/PxraWh4dXQ5NDIdFxUVDQqxsK++vb2mpaTU09MNAAC8nVjT0tJwbm1pZ2b19fXn5ubq4c/8+vcjHRvEw8NTUE+fnp3l2sSPjYx/fX1HQ0KYlpbx69/KsoDg07nTv5gsJyWMiophXl0/OzpEQT/Dp2zi1bvby6v18enVwpzIrnnOuIu2k0MwKynLrofpAAAJ+klEQVR4nO2aDXeiuhaGaQQUEPkSQWgFKtqZEW1n2s71//+yu3cCgoptz12n4tX9rC6lEGLyJvsjAUkiCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgPuTh6f7x8f7p9aHrhnTLw+Pfl36/P5nAx9372/3NynH/tz8Z3O0YDPqTX09dN6oL7l/6DR0qOfo/bk6M1x8tQggx3rpu23m5n7QLgUzubmli/OmfFIJPjPuuG3g2PlYCuBktfn6mBGhxGzZy/7kSYCS3kGK8Tr6gxN3gR9ftPAM/TseOPRN57Lqh387jV8yDzwuj66Z+Ny9fVOJu8qfrpn4z91/yFEKLrtv6zXzRU3AprttbPBxNisGEr9FbEvErDyKPB1LASvTx1TAenn6+H7vT/lXnFm/7gz95r7PKYy9y3en3+54U/b0gcZR7TX521cxzcHdaCUn6fWg917xz8dCcFINfh5cP3MXgbxdtPBN7UrwcXT6ItFcdQppStDjFtxuV4nhSSL8OpDiyoGviODw8tF4VRa56FVIH03Kf6qmxXfV04DavO/OuvUFfnPjZGPn3g+T7unf16s280lW81y7j11GK1VEjz8NrJUWZMzz0q6F//XGoxFWnFVKdOpTR4c8ED57uf/89flh23UuQ2kJKKQZ8/fn7P60Pyzpu6rfz0pQC1+wYMn+3bHhe92IMKaeFyCRfKu/Y9rys44aegdJbYOQQiQT3CW+HWly7p0DKIIJ5xR8eNERS+Xc/gEyuOumuEE9CMIiKNUfpQfeC6aBlhXKNcMeAXvGtKUUz2RzcxCNTBB0D+k2x6VuFCuOu0mIwee22gWcE5wXkEw/CVKp+V0v4wd3tKIH+YoCTAf1mI79+xcchg/4179i08PreR894t/+04+HP+8uvG4iiBzz2f+I8uIGXB77Ab5gP99e8wU8QxL/G1b9l9GXmjDldt+FfJjNzjmnCQeGNT5eMXSdbFmbE/wlYr8eiM7XxTDhTxnzfX8mynDLA906W3GygJFP4Py5KoZytleei8Htqzo8SW7NYerqkqVb9N1aMrc/QtjOjs55qisPYt3qsOFnSYbupEHnX5ioQpZZCmvs9i50MDgm7Rqto0JSCu0P9VMmbkiJGKU6GkZuSIjiIDEkRhoVbWUxDiijW68kTzMMwzyoFDUUPEhcibezl5nxPV8UzQzOLT9XfOU0pMtazF7sryYxti9zeZVNuKUWOYZfNylKuzeR5ASfWokv8IliZyYMzC3fVRXBmXUD0rn4tWbFtnmuXk601pVhpPZZUF5ZlG9c+W/ITQSlF7Mp+TxuJUpB3BvBlbLQyvCpJD2oZb2eZ64zsHqsyFd1mI7w7qeKwV9Y/rervnIYUQ9+uR8hlZS8i1RKudFwbSGqXUkAoFuLhQWkzCZqZuHejaeXsiWzbV0S9oiDULxSILO20fzorOymCBWPpzgNEatUJaWirfJo3pMhYKQX6D9Ej36pkhBpZJg7dnUBD35/zg9zvYUHD0malkwhVdfpNnftnQMOtbZo++4zNG3E0Y2UOyvvdw++GFF4lhQGuRPhBsJBsV2M1QeLqsJ40JrNwHnlMrdwIVDa7CNcJDddGYbi1e34z0VxoO1vBocW1V5sUUqSXvRhp5bA3pTCqw7lvld1VZO5KU3uv/osI0mggMP6KqvUarjyyLS0Nh0iYMpWPvN4mRVnc2fiVpTSlkKpD2dY2ezcc1H8yrzsnla8Aq7fqFsHM1tJhSRiuUYJTUihOyrbZyKqCRZsUW02rozQQ7dc/vSgpMKnQVpXNopG7ByXbpQhkxvIYDeQjKVbHUlxMOrGjDqZrv+dP67NH0b5ViiFjG37yYykgqu4bCOv5F5JN1NRSRJhhlVEAhlEND0q2SVEwSzPKGz6SYmpb6t6210izLyOCNmikWGPMjcpsc1jnFRUtUhh1CgF5hbur8UiKjDXyWMRULySCNmgm3ktwF7bobdJ0FsYCk+v4WAq9Nnn1QyngXjutqovkmGfxO2dhpMG/3q//gcYuFkb7nv0sBmuhWnYV7UMeTJVWKXwxK+K6awd5hUiqTVYvR1IbbCWF+qtFqnkZwRQDx86j4ZaeuuHtUmxbs/icVqb1MqMcvcK3fK4Ys0SHXFYb/7hWRd8JYIww8cB74gXvuGJB/XweReFRsOoAN5eZbdtsZc6FU3PgX5/JBXQvHjGbzdaQAXElAm/k26pfBJBP5VhqhXm6yzSNyVOLxR6z/MXQlZLlSoUaQxCjPDS5LtECqvPXw2e2EZMh3uzV3zXzVBakz6V/N/m/Cz6rnYWNGxNLfqlYiIKFpCzEXQscy2TDi8BwF5qvpmPJFBfTFOyqPJRF1U6K1T3X6YQ4MZv/XzxRieL409WBsiuifBYSjqr7Sv0EQRAEQRDENaHn5uGmzTHBp8sGvWWJ5bYtQI2lub6AhamzTlPz8NGUsbY/3VRhrPV0AGsPU6TSz8cb+jGT21txEU/HorY3jjKtTYq8+crR+ETjjd2LSXrLvHFjfLp6tL2rXIYU9tFAGUdSGPwvXByWrF/fNHZH7NMdS9XZvxfH42KkiMLU89IV34FO5HmezgypkENpPEzx6WZe5IskCkercChl8jSQF1Iu4+BHZmHm0CN3vZxWilZSLOXUkBw5HYejVEnkrYlbQOlSCqZaGsIvBdOljJooYV6ElyMFfC50YbEubt1Ne9C/9QanewaGAQ2fQ6uHCxzInCUOeIFwBbdp4BkXIbgA6FG1J7ybFXN8qctjmRGtZok05o+MZyBIpGVQT8AisIsEJoSHP3o5Ukg4IxTmSoaGz4y5geS4y9cDKYYbaKhSGcgSNIjEl8MiJSqYpDMvkqptyp0UHkrhou80cRtUwzm3yfGBM26GpiHcux1KhWpcmK+YzYUUMd+U5FKYKIUFzVaembU0mlIA8xVOEC/LvIy/lCLvtrhPSNHbk8LopXivK6VY6UVKofBNWSHFsyRmRSTpS3xp6EiKeRlQIylyF1XoFFKM3UMprP1ZsS1TFxkFvwwpDI0Hv8pApBQFWFrwkWMHVGg2fjsgwxAvVVIst7izjVmUJy3xq+oNG+LnBqWQ8GnKblagAFwKrFMq+GsKHhiZjr98ASmW7jHbUaDFCz3yWKhIsbV2vQXLFHBshbNko0RS13osJ2gGxTLSU+ZC7/ALzyzdPIPuOIqT8vpiqM913TUbK1PmGYoJblPfgHtM8IWehI1AsNTPPMlIZ54zhP9C33FyNu3+kZAejMcBdHs81qNgHGAG5HqxMo5hzMYeOP4Y1Ik9T7xF5eh4Q6Dw+zCDih0PblGixCvzqRjrA8YGHAUR/9DhFP7CWHxIkYNiQvUu3+kOvMAIaLOXIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIIgb4b+g0LS0ZQmPagAAAABJRU5ErkJggg==';
    const [stocks,setStocks] = useState([]);
    const [addProductLoading, setAddProductLoading] = useState(false);
    const [shopLogoutRedirect, setShopLogoutRedirect] = useState(false);
    const [shopTokenRedirect, setShopTokenRedirect] = useState(false);

    useEffect(() =>{
        let stocksJson =  [
            {
                "pid" : 1,
                "item" : "SUGAR"
            },
            {
                "pid" : 2,
                "item" : "RICE"
            },
            {
                "pid" : 3,
                "item" : "IDLY RICE"
            },
            {
                "pid" : 4,
                "item" : "BARLEY"
            },
            {
                "pid" : 5,
                "item" : "TROPICANO"
            }
        ];
        setStocks(stocksJson);
        console.log("USEEFFECT");
    
    },[]);

    const handleLogout = () =>{
        setShopLogoutRedirect(true);
    }

    const handleShopTokenClicked = () => {
        setShopTokenRedirect(true);
    }

    //api call to be made to make availablity false to item from stock for a shop
    const handleRemoveItem = async (pid) => {
        console.log("PID : ",pid);
        var stocksJson = stocks.slice();
        stocksJson.splice(pid-1,1);
        console.log(stocksJson);
        await setStocks(stocksJson);
        console.log("STOCKS : ",stocks);
    }

    //api call to be made to add item to stocks of the shop
    const handleAddItem = (e) =>{
        e.preventDefault();
        setAddProductLoading(true);
        console.log(e.target.elements.productId.value);
        console.log(e.target.elements.productName.value);
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
                    <center><img className="shopProfile" src={shopProfile} alt="seems like you didnt upload ur shop pic!" /></center>
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
                                <Container key={stock.pid}>
                                <Row className="justify-content-md-center">
                                    <Col className="itemBox" sm={4}>
                                        <label>{stock.item}</label>
                                    </Col>
                                    <Col className="itemButton" sm={2}>
                                        <Button variant="primary" onClick={() => handleRemoveItem(stock)} >
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

// <div key={stock.pid} className="itemRow">
//     <div className="itemBox">
//     <label>{stock.item}</label>
//     </div>
//     <Button variant="primary">
//     -
//     </Button>
// </div>   

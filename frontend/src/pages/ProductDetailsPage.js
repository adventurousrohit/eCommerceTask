import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Card, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET } from '../constants'
import axios from 'axios'
// import { ToastContainer } from 'react-toastify'
import {getTokenCookie} from '../common/token'


function ProductDetailsPage({ history, match}) {
    const [product,setProduct]=useState([])
  const [loading,setLoading]=useState(false)
  const [addingCart,setAddingCart]=useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        productInfo()
      console.log("infooo",match.params.id)

    }, [])

    // product delete confirmation
    const confirmDelete = () => {
        // dispatch(deleteProduct(match.params.id))
        handleClose()
    }
    const productInfo= async (e) => {

        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
      setLoading(true)
        const response=await axios.get(`http://localhost:8000/e-shop/product/${match.params.id}`,config)
      setLoading(false)

        if(!response?.data?.length){
            setLoading(true)
        }
        if(response.status==200){
            setProduct(response.data)
         return
        }
      }
      const addToCart= async (e) => {
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
      const data={
        product:match.params.id,
        quantity:1

      }
      setAddingCart(true)
        const response=await axios.post(`http://localhost:8000/e-shop/cart`,data,config)
        setAddingCart(false)
        alert("Product added in you card ")

        if(!response?.data?.length){
            // setLoading(true)
        }
        if(response.status==200){
            setProduct(response.data)
         return
        }
      }

    return (
        <div>

            {/* Modal Start*/}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <i style={{ color: "#e6e600" }} className="fas fa-exclamation-triangle"></i>
                            {" "}
                            Delete Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this product <em>"{product.name}"</em>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => confirmDelete()}>
                            Confirm Delete
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            {/* Modal End */}

            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Product Details</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            {
              addingCart && <span style={{ display: "flex" }}>
              <h5>Adding Product in cart</h5>
              <span className="ml-2">
                  <Spinner animation="border" />
              </span>
          </span>  
            }
            {/* {error ? <Message variant='danger'>{error}</Message>
                : */}
                <div>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Card.Img variant="top" src={`http://localhost:3000${product?.[0]?.image}`} height="420" />

                                {/* Product edit and delete conditions */}
{/* 
                                {userInfo && userInfo.admin ?
                                    <span style={{ display: "flex" }}>
                                        < button
                                            className="btn mt-2 btn-danger btn-sm button-focus-css"
                                            style={{ width: "100%" }}
                                            onClick={() => handleShow()}
                                        >Delete Product
                                        </button>

                                        <button
                                            className="ml-2 mt-2 btn btn-primary btn-sm button-focus-css"
                                            onClick={() => history.push(`/product-update/${product.id}/`)}
                                            style={{ width: "100%" }}
                                        >Edit Product
                                        </button>
                                    </span>
                                    : ""} */}
                            </Col>

                            <Col sm>
                                <b>{product?.[0]?.name}</b>
                                <hr />
                                <span className="justify-description-css">
                                    <p>{product?.[0]?.description}</p>
                                </span>
                                <span style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    border: "1px solid",
                                    borderColor: "#C6ACE7",
                                    padding: "2px"
                                }}>
                                    Price:<span className="text-success ml-2">₹ {product?.[0]?.price}</span>
                                </span>
                            </Col>
                            <Col sm>
                                <b>Buy</b>
                                <hr />
                                {product?.[0]?.stock ?
                                    <Link to={`${product.id}/checkout/`}>
                                        <button className="btn btn-primary">
                                            <span>Pay with Stripe</span>
                                        </button>
                                    </Link>
                                    :
                                    <Message variant='danger'>
                                        Out Of Stock!
                                    </Message>}
                                   
                            </Col>
                            <Col sm>
                                <b>Add to cart</b>
                                <hr />
                                {product?.[0]?.stock ?
                                        <button className="btn btn-primary" onClick={addToCart}>
                                            <span>Add</span>
                                        </button>

                                    :
                                    // <Link to={`${product.id}/checkout/`}>
                                        <button disabled={true} className="btn btn-primary">
                                            <span>Add</span>
                                        </button>
                                    // </Link>
                                    }
                                   
                            </Col>
                        </Row>

                    </Container>
                </div>
            {/* } */}
        </div >
    )
}

export default ProductDetailsPage

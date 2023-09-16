import React, { useEffect ,useState} from 'react'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {getTokenCookie} from '../common/token'


function ProductsListPage(search) {
  const [product,setProduct]=useState([])
  const [loading,setLoading]=useState(false)


    let history = useHistory()
    let searchTerm = history.location.search

    useEffect(() => {
        productInfo()
    }, [])
    const productInfo= async (e) => {
        console.log("ttrr")
        // e.preventDefault()
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
        const response=await axios.get(`http://localhost:8000/e-shop/product`,config)
        console.log("dfs",response)
        // if(!response?.data?.length){
        //     setLoading(true)
        // }
        if(response.status==200){
            setProduct(response.data)
         return
        }
      }
    const showNothingMessage = () => {
        return (
            <div>
                {!loading ? <Message variant='info'>Nothing to show</Message> : ""}                
            </div>
        )
    }

    return (
        <div>
            {/* {error && <Message variant='danger'>{error}</Message>} */}
            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Products</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            <div>
                <Row>

                    {product?.map((product, idx) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <div className="mx-2"> 
                                <Product product={product} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default ProductsListPage

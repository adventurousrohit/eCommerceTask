import React,{useState,useEffect} from "react";
import { Table, Button } from "react-bootstrap";
import axios from 'axios'
import {getTokenCookie} from '../common/token'  

const Cart = ({ cartItems, clearCart, removeFromCart }) => {
    const [product,setProduct]=useState([])
useEffect(()=>{
    productInfo()

},[])
    const productInfo= async (e) => {
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
        const response=await axios.get(`http://localhost:8000/e-shop/user-cart`,config)
        if(response.status==200){
            setProduct(response.data)
         return
        }
      }

      const cartHandler= async (id,quantity) => {
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
      const data={
        id:id,
        quantity:quantity
      }
        const response=await axios.put(`http://localhost:8000/e-shop/cart-update`,data,config)
        if(response.status==200){
            productInfo()
         return
        }
      }


      const removeHandler= async (id) => {
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
        const response=await axios.delete(`http://localhost:8000/e-shop/cart-delete/${id}`,config)
        if(response.status==200){
            productInfo()
         return
        }
      }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>rs{item.product.price}</td>
              <td><Button onClick={()=>{
                cartHandler(item.id,(item.quantity-1))
              }} style={{marginRight:"1rem"}} disabled={item.quantity==1}>-</Button>{item.quantity}<Button onClick={()=>{
                cartHandler(item.id,(item.quantity+1))
              }} style={{marginLeft:"1rem"}}>+</Button></td>
              <td>${item.product.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => removeHandler(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {product.length > 0 && (
        <div>
          <p>Total: ${product.reduce((total, item) => total + item.product.price * item.quantity, 0)}</p>
          <Button onClick={clearCart}>
            Check Out
          </Button>
        </div>
      )}

      {product.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
};

export default Cart;
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './pages/ProductsListPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
// import CheckoutPage from './pages/CheckoutPage'
import NavBar from './components/Navbar'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import NotFound from './pages/NotFoundPage'
import axios from 'axios'
import {getTokenCookie} from './common/token'
import Cart from './components/Cart'
import ProductListWithCat from './pages/ProductListWithCat'


const App = () => {
  const [data,setData]=useState('')
  const [cart,setCart]=useState([])
  useEffect(()=>{
if(getTokenCookie()&&!data){
  userinfo()
  cartInfo()
}
  },[data])

  const userinfo= async (e) => {
    // e.preventDefault()
    const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`
      }
  }
    const response=await axios.get(`http://localhost:8000/users/user-info`,config)
    if(response.status===200){
      setData(response.data)
     return
    }
  }

  const cartInfo= async (e) => {
    // e.preventDefault()
    const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenCookie()}`
      }
  }
    const response=await axios.get(`http://localhost:8000/e-shop/user-cart`,config)
    if(response.status===200){
      setCart(response.data)
     return
    }
  }

  return (
    // <ToastContainer>
    <div>
      <Router>
        <NavBar data={data} />
        <div className="container mt-4">
          <Switch>
            <Route path="/" component={ProductListPage} exact />
            <Route path="/:id" component={ProductListWithCat} exact />
            <Route path="/cart" component={Cart} exact />
            <Route path="/product/:id" component={ProductDetailsPage} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="" component={NotFound} exact />
          </Switch>
        </div>
      </Router>
    </div >
    // </ToastContainer>
  )
}

export default App

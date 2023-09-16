import React from 'react'
import { Navbar, Nav, Container, NavDropdown ,Badge} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom";
import SearchBarForProducts from './SearchBarForProducts'
import {removeTokenCookie} from '../common/token'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function NavBar(data,nav) {
const userInfo=data.data.user
    let history = useHistory()
    const logoutHandler = () => {
        removeTokenCookie()
        history.push("/login")

    }
console.log("ddddd",userInfo)
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand><i className="mb-2 fas fa-home"> Home</i></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">


                            {/* New Product (Admins Only) */}

                            {userInfo && userInfo.admin ?
                                <LinkContainer to="/new-product/">
                                    <Nav.Link >Add Product</Nav.Link>
                                </LinkContainer>
                                : ""
                            }

                                <span className="">
                                    <SearchBarForProducts />
                                </span>

                        </Nav>




                        <div style={{ width: "30px", height: "30px", color: "white",marginRight:'5rem' }}>
                            <Link to="/cart">
            <img src='/cart.svg' alt="Cart" />
            <Badge className='cart-total--item'>{data.data.cartCount}</Badge>
            </Link>
          </div>

                        {userInfo ?
                            <div>
                                <NavDropdown className="navbar-nav text-capitalize" title={userInfo.username} id='username'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            :

                            <LinkContainer to="/login">
                                <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                            </LinkContainer>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default NavBar

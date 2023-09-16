import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message';
import {setTokenCookie,getTokenCookie} from '../common/token'
import axios from 'axios'
// import { toast } from "react-toastify";



function LoginPage({ history }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    useEffect(() => {
        if (getTokenCookie()!=undefined) {
            history.push('/') // homepage
        }
    }, [history])

    const submitHandler = async (e) => {
        e.preventDefault()
        const data={
            username:username,
            password:password
        }
        const response=await axios.post(`http://localhost:8000/users/login`,data)
        console.log("tt",response)
        if(response.status==203){
            setError("User credential is not correct")
         return
        }else{
        setError("")
         setTokenCookie(response.data.token)
         history.push('/')
         
        }
    }

    return (
        <div>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>                    
                    <h1>Sign In</h1>                    
                    {error && <Message variant='danger'>{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='username'>
                            <Form.Label>
                                Username
                    </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>
                                Password
                    </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant='primary'>Sign In</Button>
                    </Form>

                    <Row className="py-3">
                        <Col>
                            Do not have an account?
                    <Link
                                to={`/register`}
                            > Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default LoginPage
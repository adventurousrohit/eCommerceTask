import React, { useState,useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios'
// import { ToastContainer } from 'react-toastify'
import {getTokenCookie} from '../common/token'


function SearchBarForProducts() {

    let history = useHistory()
    const [product,setProduct]=useState([])
    const [searchTerm, setSearchTerm] = useState("")
    useEffect(() => {
        categories()
    }, [])
    const categories= async (e) => {
        const config = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getTokenCookie()}`
          }
      }
        const response=await axios.get(`http://localhost:8000/e-shop/category`,config)
        if(response.status==200){
            setProduct(response.data)
         return
        }
      }
console.log("ppd",product)
    const onSubmit = (e) => {
        e.preventDefault();
        if(searchTerm) {
            history.push(`/?searchTerm=${searchTerm}`)
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <span
                    style={{ display: "flex" }}
                    className=""
                >
                    {/* <input
                        type="text"
                        value={searchTerm}
                        placeholder="search products"
                        className="form-control"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    /> */}
                        <DropdownButton id="dropdown-basic-button" title="Category">
                            {product?.map((cat) => (
                                <Dropdown.Item key={cat?.name} href={`/${cat?.id}/${cat?.name}`}>
                                    {cat?.name}
                                </Dropdown.Item>
                            ))}
</DropdownButton>
                  
                </span>
            </form>
        </div>
    )
}

export default SearchBarForProducts

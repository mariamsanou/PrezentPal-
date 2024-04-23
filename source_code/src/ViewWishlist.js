import {React, useState, useEffect} from "react";
import axios from 'axios';
import './Wishlist.css';
//import Menubar from "../Menubar";
import RemoveItem from "./RemoveWishItem";

const ViewWishlist = () => {
    const [items, setWishlist] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/getWishlist')
        .then(function (response) {
          setWishlist(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        }, []);

  return (
    <div className="container">
        {/* <Menubar /> */}
                <h2 className="card-title text-center">Wishlist</h2>
                <table>
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Link</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((items, index) => (
                        <tr key={index}>
                            <td>{items.item_name}</td>
                            <td>{items.item_desc}</td>
                            <td>{items.item_price}</td>
                            <td>{items.item_link}</td>
                            <td> <RemoveItem /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    
  );
};

export default ViewWishlist;
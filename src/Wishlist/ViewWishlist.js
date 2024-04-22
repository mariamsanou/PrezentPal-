import {React, useState, useEffect} from "react";
import axios from 'axios';

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
                <h2 className="card-title text-center">Wishlist</h2>
                <p>lol</p>
                <table>
                <thead>
                    <tr>
                        {/* <th>Project Name</th>
                        <th>Description</th>
                        <th>Manager</th>
                        <th>Owner</th>
                        <th>Team</th> */}
                    </tr>
                </thead>
                <tbody>
                    {/* {items.map((items, index) => (
                        <tr key={index}>
                            <td>{items.items_name}</td>
                            <td>{items.description}</td>
                            <td>{items.owner_details.firstName}</td>
                            <td>{items.manager_details.firstName}</td>
                            <td>{items.teams_details.team_name}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
    </div>
    
  );
};

export default ViewWishlist;
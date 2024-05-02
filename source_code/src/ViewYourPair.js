import {React, useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";


export default function PairView() {
    const [pairs, setPairs] = useState([]);
    const [users,setUsers] = useState([]);
    const [thisUser, setUser] = useState('');
    const [pairName, setPair] = useState('');
 
    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
        .then(function (response) {
          setUsers(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
        }, []);


    const handleFindPartner = (event, thisUser) => {
        event.preventDefault()
        axios.post('http://localhost:9000/findPartner', {thisUser})
        .then(function (response) {
            console.log(thisUser)
            setPair(response.data);
        })
            .catch((err) => alert('Error in Finding Pair'))     
    }

    return (
        <div>
               <form>
               <select onChange={(e) => setUser(e.target.value)} value={thisUser}>
                <option value="">Select Your Name</option>
                {users.map((user, index) => {
                 return <option key={index} value={user._id}>   
                    {user.firstname} {user.lastname}
                </option>
                })
                }
                </select>
                <button type="button" onClick= {(event) => handleFindPartner(event,thisUser)}>
                    Find My Pair!
                </button>
               </form>

            

        <h1>Your Pair</h1>
        <p1> 
            {pairName[0] + " " + pairName[1] }
            </p1>
        <p><Link to="/Home">Back to Home</Link></p>
    </div>
    );
};
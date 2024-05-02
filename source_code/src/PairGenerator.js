import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Menubar from './Menubar'; // Import the MenuBar component

export default function PairGenerator(){
    const [users, setUsers] = useState([])
    const [pairs, setPairs] = useState([]);
   
    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            }, []);
    }, []);

    const pairUsers = () => {
        const shuffledUsers = users.slice().sort(() => 0.5 - Math.random());
        const pairedUsers = [];
        for (let i = 0; i < shuffledUsers.length; i += 2) {
          pairedUsers.push([shuffledUsers[i], shuffledUsers[i + 1]]);
        }
        setPairs(pairedUsers);
      };

    const handleSavePairs = (event) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createPairs', {pairs})
            .catch((err) => alert('Error in Creating Pair'))
    }

    return (
        <div>
        <Menubar />
        <h1>User Pairing Generator</h1>
        <button onClick={pairUsers}>Pair Users</button>
        {pairs.map((pair, index) => (
          <div key={index}>
            <p>{pair[0].firstname} {pair[0].lastname}  is paired with {pair[1].firstname} {pair[1].lastname}</p>
          </div>
        ))}

        <button onClick={handleSavePairs}>Save Pairs</button>
      </div>
    );



}


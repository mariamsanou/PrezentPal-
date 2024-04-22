import {React, useState, useEffect} from "react";
import axios from 'axios';

const CreateWishItem = () => {
    const [proj_name, setWishItemName] = useState('');
    const [proj_desc, setWishItemDescription] = useState('');
    const [prod_owner_id, setProductOwner] = useState('');

    const handleCreateWishItem = (event, proj_name, proj_desc, prod_owner_id,) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createWishItem', { proj_name, proj_desc, prod_owner_id })
            .catch((err) => alert('Error in Creating WishItem'))
    }

  return (
    <div className="container">
              <h2 className="card-title text-center">Create Wishlist Item</h2>
      <form>
        <label>
          Wish Item Name:
          <input
            type="text"
            value={proj_name}
            onChange={(e) => setWishItemName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Wish Item Description:
          <textarea
            type="text"
            value={proj_desc}
            onChange={(e) => setWishItemDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Wish Item Price:
          <select onChange={(e) => setProductOwner(e.target.value)} value={prod_owner_id}>
            <option value="">Select Price</option>
            {/* {users.map((user, index) => {
             return <option key={index} value={user._id}>   
                {user.firstName} {user.lastName}
            </option>
            })
            } */}
            </select>
        </label>
        <br />
     
        <br />
        <button type="button" onClick={(event) => handleCreateWishItem(event, proj_name, proj_desc, prod_owner_id)}>
          Create Wishlist Item
        </button>
      </form>
    </div>
  );
};

export default CreateWishItem;
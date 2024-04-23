import {React, useState, useEffect} from "react";
import axios from 'axios';

const CreateWishItem = () => {
    const [item_name, setWishItemName] = useState('');
    const [item_desc, setWishItemDescription] = useState('');
    const [prod_owner_id, setProductOwner] = useState('');

    const handleCreateWishItem = (event, item_name, item_desc, prod_owner_id,) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createWishItem', { item_name, item_desc, prod_owner_id })
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
            value={item_name}
            onChange={(e) => setWishItemName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Wish Item Description:
          <textarea
            type="text"
            value={item_desc}
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
        <button type="button" onClick={(event) => handleCreateWishItem(event, item_name, item_desc, prod_owner_id)}>
          Create Wishlist Item
        </button>
      </form>
    </div>
  );
};

export default CreateWishItem;
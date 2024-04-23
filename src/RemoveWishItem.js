import React, { useState } from 'react';
import axios from 'axios';

function RemoveItem({ itemId }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleRemoveItem = () => {
    axios.delete(`http://localhost:9000/items/${itemId}`)
      .then(response => {
        console.log('Item removed successfully:', response.data);
        setIsDeleted(true);
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  };

  return (
    <div>
      {!isDeleted ? (
        <button onClick={handleRemoveItem}>Remove Item</button>
      ) : (
        <p>Item has been removed.</p>
      )}
    </div>
  );
}

export default RemoveItem;

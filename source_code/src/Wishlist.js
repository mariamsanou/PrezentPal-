import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Wishlist.css'; // Ensure you have a corresponding CSS file for styling

function Wishlist() {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        interestTag: '',
    });

    useEffect(() => {
        axios.get('http://your-api-endpoint/user/wishlist')
            .then(response => {
                setItems(response.data.wishlist);
            })
            .catch(error => {
                console.error('Error fetching wishlist items:', error);
            });
    }, []);

    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddNewItem = () => {
        if (!newItem.name || !newItem.description) {
            alert('Please fill out both the item name and description.');
            return;
        }

        // Send the new item to the backend
        axios.post('http://your-api-endpoint/user/wishlist/add', newItem)
            .then(response => {
                setItems([...items, response.data]);
                setNewItem({ name: '', description: '', interestTag: '' }); // Reset the state
                setShowAddItemModal(false); // Close modal
            })
            .catch(error => {
                console.error('Error adding wishlist item:', error);
            });
    };

    return (
        <div className="wishlist-container">
            <h2>View Wishlist</h2>
            <button onClick={() => setShowAddItemModal(true)}>Add Wishlist Item</button>
            <div className="wishlist-items">
                {items.map((item, index) => (
                    <div key={index} className="wishlist-item">
                        <div className="wishlist-item-name">{item.name}</div>
                        <div className="wishlist-item-description">{item.description}</div>
                        <div className="wishlist-item-interest">{item.interestTag || 'None'}</div>
                    </div>
                ))}
            </div>
            {showAddItemModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title">Add New Wishlist Item</span>
                            <button onClick={() => setShowAddItemModal(false)} className="close-button">&times;</button>
                        </div>
                        <div className="modal-body">
                            <input type="text" name="name" value={newItem.name} onChange={handleNewItemChange} placeholder="Item Name" />
                            <input type="text" name="description" value={newItem.description} onChange={handleNewItemChange} placeholder="Item Description" />
                            <input type="text" name="interestTag" value={newItem.interestTag} onChange={handleNewItemChange} placeholder="Interest Tag" />
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleAddNewItem}>Add Item</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Wishlist;

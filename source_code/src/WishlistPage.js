import {React, useState} from "react";
//import Navbar from "./Navbar";
import ViewWishlist from "./Wishlist/ViewWishlist";
import CreateWishItem from "./Wishlist/CreateWishItem";
import RemoveItem from "./Wishlist/RemoveWishItem";

const WishlistPage = () => {
    return(
    <div>
      {/* <Navbar />     */}
      <ViewWishlist />
      <CreateWishItem />
      
    </div>
  );
};

export default WishlistPage;
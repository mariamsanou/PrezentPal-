import {React, useState} from "react";
import Menubar from "./Menubar";
import ViewWishlist from "./ViewWishlist";
import CreateWishItem from "./CreateWishItem";
import RemoveItem from "./RemoveWishItem";

const WishlistPage = () => {
    return(
    <div>
      <Menubar />
      <ViewWishlist />
      <CreateWishItem />
      
    </div>
  );
};

export default WishlistPage;
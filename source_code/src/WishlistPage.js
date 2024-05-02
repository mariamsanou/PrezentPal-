import {React, useState} from "react";
import Menubar from "./Menubar";
import ViewWishlist from "./ViewWishlist";
import CreateWishItem from "./CreateWishItem";

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
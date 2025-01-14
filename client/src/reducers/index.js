import { combineReducers } from "redux";
import { userReducer } from './userReducer.js'
import { cartReducer } from "./cartReducer.js";
import { searchReducer } from "./searchreducer.js";
import { drawerReducer } from "./drawerReducer.js";
import { coupounReducer } from "./couponReducer";
import {  CODReducer } from "./CODreducer";
import { wishlistReducer } from "./wishlist";
import { sidebarReducer } from "./sideBar.js";
import { traderReducer } from "./trader.js";
 const rootReducer = combineReducers({
     user: userReducer,
      search: searchReducer,
      cart:cartReducer,
     drawer: drawerReducer,
     coupon: coupounReducer,
     COD:CODReducer,
     wishlist: wishlistReducer,
     sidebar: sidebarReducer,
     trader: traderReducer
})
export default rootReducer
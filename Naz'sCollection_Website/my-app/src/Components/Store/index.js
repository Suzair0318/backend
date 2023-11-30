import { configureStore } from "@reduxjs/toolkit";
import { Product_page_Slice } from "./Slices/Redux_Slice";



const store = configureStore({

    reducer : {
        Product_page_store : Product_page_Slice.reducer,
    }
})

export {store};
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';




export const fetch_api = createAsyncThunk('fetchdata' , async() => {
     const getdata = await axios.get('http://localhost:3000/naz_api_data' , {crossOriginIsolated : true });
     return getdata
     
})

export const fetchsingle_api = createAsyncThunk('fetchsingledata' , async(id) => {

      const getsingledata = await axios.get( `http://localhost:3000/Singlecart_api/${id}`);
    
      return getsingledata
      
})

export const fetchsearch_api = createAsyncThunk('fetchsearch' , async(search) => {
     
     const getsearch = await axios.get(`http://localhost:3000/Search/${search}`);
     return getsearch
})

export const fetchprice_api = createAsyncThunk('fetchprice' , async(price) => {
     const getprice = await axios.get(`http://localhost:3000/Searchprice/${price}`);
     return getprice
})


const Product_page_Slice = createSlice({

    name : 'Product_pages',

    initialState : {
          product_data : [],
          loading_product  : false,

          singlecartdata : [],
          loading_singlecart : false,

          total_product : [],

          totalprice : 0,
          shipmentprice : 0,
          grandtotal : 0
        
    },

   
    extraReducers : (builder) => {
              // for call an all product api 
             builder.addCase(fetch_api.pending , (state , action) => {
                     state.loading_product = true
             })
             builder.addCase(fetch_api.fulfilled , (state , action) => {
                state.loading_product = false
                state.product_data = action.payload.data;
                
             })
             builder.addCase(fetch_api.rejected , (state , action) => {
                
             })
              // for single params data
             builder.addCase( fetchsingle_api.pending , (state , action) => {
                  state.loading_singlecart = true
             })
             builder.addCase( fetchsingle_api.fulfilled , (state , action) => {
                    state.loading_singlecart = false
                   state.singlecartdata = action.payload.data;
                   
             })
             builder.addCase( fetchsingle_api.rejected , (state , action) => {
                    
             })
             // for search filter
             builder.addCase(fetchsearch_api.pending , (state , action) => {
     
             })
             builder.addCase(fetchsearch_api.fulfilled , (state , action) => {
                 
                 state.product_data = action.payload.data
             })
             builder.addCase(fetchsearch_api.rejected , (state , action) => {

             })
             // for range price
             builder.addCase(fetchprice_api.pending , (state , action) => {

             })
             builder.addCase(fetchprice_api.fulfilled , (state , action) => {
                    state.product_data = action.payload.data
             })
             builder.addCase(fetchprice_api.rejected , (state , action) => {
                 
             } )
    },

    reducers : {
         

      TotalProduct : (state , action) => {
             state.total_product.push(action.payload);
            
      },

      // for Deatls 

      add : ( state, action) => {
           
           state.total_product.map((e )  => {
                if(e._id === action.payload){
                
                   return e.quantity+=1
                }
                
          })
      },

      sub : ( state, action) => {
            
             state.total_product.map((e)  => {
                  if(e._id === action.payload){
                        console.log(e.quantity-1)
                     return e.quantity-=1
                    
                  }
            })
        },

      fitler  :  ( state , action) => {
            const cardfilter = state.total_product.filter((e) => {
                    return e._id !== action.payload
            })

            state.total_product = cardfilter

           
     },

     total : (state , action) => {
            const t =  state.total_product.reduce((acc , e) => {
                       acc += e.price*e.quantity
                       return acc
            }, 0)

            state.totalprice = t

            state.grandtotal = state.totalprice+state.shipmentprice 

     },

     location : (state , action) => {
            
          if(action.payload === 'karachi'){
              state.shipmentprice = 300 
          }
          else{
               state.shipmentprice = 350
          }
          state.grandtotal = state.totalprice+state.shipmentprice 
      
     },

     
      
           
  
    }



})

export const {   TotalProduct , add , sub , fitler , total , location } = Product_page_Slice.actions;

export {Product_page_Slice};
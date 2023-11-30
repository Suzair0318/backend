import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { add  , sub , total , fitler , location  } from '../Store/Slices/Redux_Slice'
import { Link } from 'react-router-dom'
import './Detail.css';



export const Detail = () => {

  
  
  const totalcart = useSelector((state) => state.Product_page_store.total_product )
  const totalprice = useSelector((state) => state.Product_page_store.totalprice)
  const shipment = useSelector((state) => state.Product_page_store.shipmentprice)
  const grandtotal = useSelector((state) => state.Product_page_store.grandtotal)


  useEffect(() => {
     dispatch(total())
  },[totalcart])

  
  
  const dispatch = useDispatch();

  return (
    <>
    <Navbar />
      
      <section class="h-100 h-custom" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card card-registration card-registration-2"  style={{borderRadius : '15px'}}>
          <div class="card-body p-0">
            <div class="row g-0">
              <div class="col-lg-8">
                <div class="p-5">
                  <div class="d-flex justify-content-between align-items-center mb-5">
                    <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                    
                  </div>
                  <hr class="my-4"/>
                  
                     {totalcart.map((e) => {
                           
                          return (
                            <>
                                         <div key={e._id} class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                      <img src={e.images}  class="img-fluid rounded-3" alt="Cotton T-shirt"/>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3 my-2">
  
                      <h6 class="text-black mb-0 my-3">{e.brand}</h6>
                    </div>

                   
                  
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 my-2">
                      <h6 class="mb-0"  >Rs : {e.price}</h6>
                    </div>

                    <div class="col-md-3 col-lg-3 col-xl-3" style={{display : 'flex' , }}>
                    <button className={`btn btn-success ${e.quantity === e.stock ? 'disabled' : null}`} onClick={() => dispatch(add(e._id))}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                     </svg>
                    </button> 
                    <h2 class="text-black mb-0 my-3 mx-3">{e.quantity}</h2>
                    <button className={`btn btn-danger ${e.quantity === 0 ? 'disabled' : null}`}onClick={() => dispatch(sub(e._id))}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                    </svg>
                    </button>
                    </div>

                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 my-2">
                      <h6 class="mb-0"  >total : {e.price*e.quantity}</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-start my-3"> 
                     <button className=' btn btn-danger' onClick={() => dispatch(fitler(e._id))}><svg xmlns="http://www.w3.org/2000/svg" style={{color : 'whi'}} width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                    </svg></button>
                    
                    </div>
                  </div>
                            </>
                          )

                     })}

                     
                
                

                  <hr class="my-4"/>

                  <div class="pt-2">
                    <Link className='btn btn-success' to={'/Products'} >Continue Shopping </Link>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 bg-grey">
                <div class="p-5">
                  <h3 class="fw-bold mb-3 mt-2 pt-1">Summary</h3>
                  <hr />

                  <div class="d-flex justify-content-between mb-2">
                    <h5 class="text-uppercase"  style={{borderRight : '2px solid grey'  , paddingRight : '10px'  }}>Price</h5>
                    <h5>{totalprice}</h5>        
                  </div>
                  <div className='text-center mb-3' style={{color : 'red'}}>(Please Select your City)</div>
                   <div class="d-flex justify-content-between mb-4">
                    
                    <h5 class="text-uppercase" style={{borderRight : '2px solid grey'  , paddingRight : '10px'  }}>City</h5>
              
                    <div class="form-check">
                   <input class="form-check-input "  style={{border : '2px solid black'}} value={'karachi'} type="radio"  onChange={(e) => dispatch(location(e.target.value))  }  name="flexRadioDefault" id="flexRadioDefault1"  />
                  <label class="form-check-label" for="flexRadioDefault1">
                  Karachi
                 </label>
                  </div>
                   <div class="form-check">
                     <input class="form-check-input" style={{border : '2px solid black'}} value={'other'} type="radio"  onChange={(e) => dispatch(location(e.target.value))  }  name="flexRadioDefault" id="flexRadioDefault2" />
                     <label class="form-check-label" for="flexRadioDefault2">
                     Other city
                   </label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-4">

                    <h5 class="text-uppercase" style={{borderRight : '2px solid grey'  , paddingRight : '10px'  }}>Shipment</h5>
                    <h5>{shipment}</h5>
                  </div>
               
                 
                  <hr class="my-3"/>

                  <div class="d-flex justify-content-between mb-3">
                    <h5 class="text-uppercase">Total Amount</h5>
                    <h5>Rs :{grandtotal}</h5>
                  </div>

                  <Link  to={'/Buyform'} type="button"  class="btn btn-primary"
                    data-mdb-ripple-color="dark">Buy Now</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      
      
     </>
  )
}


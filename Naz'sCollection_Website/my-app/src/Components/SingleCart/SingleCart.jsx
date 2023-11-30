import React, { useEffect, useState } from 'react'
import './SingleCart.css';
import {Link , useParams } from 'react-router-dom';
import {Footer} from '../Footer/Footer';
import {Navbar} from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchsingle_api } from '../Store/Slices/Redux_Slice';
import { TotalProduct } from '../Store/Slices/Redux_Slice';


export const SingleCart = () => {

  const dispatch = useDispatch();
  
  const params = useParams();
  const [paramsvalue , setparamsvalue] = useState(params.id);

  
  const singledata = useSelector((state) =>  [state.Product_page_store.singlecartdata] )
  const loading_singlecart = useSelector((state) => state.Product_page_store.loading_singlecart)

  
  
   useEffect(() => {
          
         dispatch(fetchsingle_api(paramsvalue))
   })
  return (
    <>
    
    <Navbar />
  
     <div >
     { singledata.map((e) => {
         return (
           <>
                 <section class="h-100 gradient-custom">
  <div class="container py-5">
    <div class="row d-flex justify-content-center my-4">
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body shadow bg-white rounded">
           
            <div class="row">
              <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
               
                <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={e.images}class="w-100" alt="Blue Jeans Jacket" />
                </div>
              </div>

              <div class="col-lg-5 col-md-6  mb-lg-0 ">
                
                <p><strong>Brand : {e.brand}</strong></p>
                <p><strong> Details :</strong> {e.title}</p>
                <p><strong> Rating :</strong>
               {Array.from({length : 5}).map(( elem , index) => {
    let number = index + 0.5;

    return  (
      <>
      <span className='mx-2' key={index}>{ e.rating > index+1 ? <svg style={{  color : 'orange'}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path className='fullstar' d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg> : e.rating > number ? <svg style={{ color : 'orange'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
    <path className='fullstar' d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
  </svg> : <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path className='fullstar' d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg> }</span>
      </>
    )
  })}
               </p>
                <p><strong> Avialable Stock :</strong> {e.stock}</p>
                <p><strong> Details :</strong> {e.title}</p>
                <p><strong> Description :</strong> {e.description}</p>
                <p><strong> Discount :</strong>  {e.discountpercentage}%</p>
                <p class="text-start text-md-center">
                  <strong>Rs : {e.price}</strong><span style={{textDecoration : 'line-through', marginLeft : '8px'}}>{e.cutprice}</span>
                </p>
              </div>

              <hr class="my-2" />
  
              <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                
                
                <div class="d-flex mb-4 " style={{maxWidth : '160px'}}>
                  <Link onClick={() => dispatch(TotalProduct(e))}  to={'/Detail'}  type="button" class="btn btn-primary shadow  rounded">Add to Cart</Link>
                </div>

              </div>
            </div>
           

            <hr class="my-2" />

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

              
           </>
         )
     })}
     </div> 

  <Footer />
    </>
  )
}

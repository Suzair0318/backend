import React, { useEffect, useState } from 'react';
import {useSelector , useDispatch} from 'react-redux'
import './Products.css';
import cash_2 from '../images/cash-removebg-preview.png';
import {Navbar} from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import {Footer} from '../Footer/Footer';
import { fetch_api } from '../Store/Slices/Redux_Slice';
import { fetchsearch_api } from '../Store/Slices/Redux_Slice';
import { fetchprice_api } from '../Store/Slices/Redux_Slice';

export const Products = () => {

    const [searchvalue , setsearchvalue] = useState("");
   
    const [ gridview , setgridview] = useState(true);
  
    const [pricevalue  , setpricevalue] = useState(0);
  const dispatch = useDispatch();
   
  const apidata =  useSelector((state) => state.Product_page_store.product_data);
  const loading_products = useSelector((state) => state.Product_page_store.loading_product);
   
  

        
                    
   
                  
          

 
 // for search bar 
  const handlechangesearch = (e) => {
    e.preventDefault();
     setsearchvalue(e.target.value)
    
  }
 // for search button
  const handlesearch = (e) => {
    e.preventDefault();
  
     dispatch(fetchsearch_api(searchvalue))
  }

  // for ptice bar 
  const handlechangerange = (e) => {
     setpricevalue(e.target.value)
     
  }     
  // for rangel rpice
  const handlerange = (e) => {
    e.preventDefault();
    console.log(pricevalue)
    dispatch(fetchprice_api(pricevalue))
    
  }

  // for unique value in brands

  const uniquebrand = apidata.map((e) => {
       return e['brand']
  })

  const brand = [ ...new Set(uniquebrand) ];



   useEffect(() => {
     dispatch(fetch_api()) 
   },[])

  
   

  return (
    <>
    <Navbar />
    <div className=" product-page-background ">

    <div className='product-header'>
    <div className="container header-content ">
     <div className='search-bar  shadow   bg-white rounded'>
      {/* search bar  */}
    <form  className=' d-flex '  onSubmit={handlesearch} role="search">
    <input class="form-control me-2" style={{ borderRadius : '20px' , textAlign : 'center' , boxShadow : '0 0.1rem 1rem rgba(0, 0, 0, 0.15)'}} onChange={handlechangesearch} name='search' type="search" placeholder="Search" aria-label="Search"/>
    <button className='btn btn-primary' style={{  borderRadius : '20px' , boxShadow : '0 0.1rem 1rem rgba(0, 0, 0, 0.15)'}} type='submit'  >Search</button>
    </form>
    </div>

    <div className='filters-header shadow bg-white rounded '>
      {/* rangebox */}
         <div className=' range'>
          <div className='range-adjust'>
          <div  style={{display : 'flex' , justifyContent : 'space-evenly'}}>
         <label for="customRange1 "  class="form-label mb-0 ">Rs : {pricevalue} </label>
         <input   type="range" min={0}  step={10} max={5000}  value={pricevalue} onChange={handlechangerange} class="form-range "  id="customRange1" style={{width : '4rem'}}   />
         <svg style={{borderLeft : '2px solid grey', paddingLeft : '4px' }} xmlns="http://www.w3.org/2000/svg" onClick={handlerange} width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
    </div>
</div>
         </div>
        
         <div className='grid-view '>
         <nav aria-label="Page navigation example">
  <ul class="pagination my-2">
    <li class="page-item "><Link onClick={ () => setgridview(true)} className=' grid page-link '><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
  <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
</svg></Link></li>
    <li class="page-item "><Link onClick={ () => setgridview(false)} className=' grid page-link'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg></Link></li>
  </ul>
</nav>
         </div>
    </div>
    </div>
        <div className="container cont-brands-category  ">
       <div className='brands-category'  >
        {brand.map((e) => {
          return (
            <>
            <div key={e}><span class="badge  " style={{ backgroundColor : '#ff385b'}}  >{e}</span></div>
            </>
          )
        })} 
       </div>
       </div>

       <div className='card-container'>
       { loading_products === true ? <div class="d-flex justify-content-center my-5">
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div> : <div className=" card-content">

        {/* for grid view  */}
        
         
        { apidata.length === 0 ? <h1 className='my-5'> Sorry !! No Product  Avialable</h1> : apidata.map((e) => {
           
          if(gridview === true){
               return (
            <>
            
             {<Link to={`/SingleCart/${e._id}`} style={{listStyle : 'none' , textDecoration : 'none'}} >
             <div class="card shadow bg-white rounded" style={{width : '10.1rem'}} >
        <img src={e.images} class="card-img-top" alt="..." style={{height : '14rem'}}/>
        <div class="card-body">
          <p  className='card-text text ' >{e.brand}</p>
              {/* helo */}
              <div className='stars my-1'>   {Array.from({length : 5}).map(( elem , index) => {
    let number = index + 0.5;

    return  (
      <>
      <span className='mx-1' key={index}>{ e.rating > index+1 ? <svg style={{  color : 'orange'}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path className='fullstar' d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg> : e.rating > number ? <svg style={{ color : 'orange'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
    <path className='fullstar' d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
  </svg> : <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path className='fullstar' d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg> }</span>
      </>
    )
  })}</div>
      {/* end */}
          <div style={{display : 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}>
         <img src={cash_2} alt='img' dis width={'50px'} height={'25px'} style={{imageOrientation : '-moz-initial'}}/>
      
      <p className='badge' style={{ height : '1.4rem' , padding : '2px',  width : '2.5rem' ,   backgroundColor : '#ff2f2f'}}>-{e.discountpercentage}%</p>
      </div>
  
   
       <div style={{display: 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}><h6 class="card-title text" style={{color : '#f50'}}>Rs : {e.price}</h6><span style={{color : '#9e9e9e'}} className='price_cut'> {e.cutprice}</span></div>
      
          
        </div>
      </div>
      </Link>  }  
      </>         
               )
          }
        if( gridview === false){
             return (  
            <> 
          <Link to={`/SingleCart/${e._id}`}  style={{textDecoration : 'none'}}>  <div class="card mb-3" style={{ maxWidth : "540px"}}  >
  <div class="row g-0">
    <div class="col-md-4">
      <img src={e.images} class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <p  className='card-text text my-1' style={{fontSize : '1.5rem'}}>{e.brand}</p>
        {/* helo */}
        <div >   {Array.from({length : 5}).map(( elem , index) => {
    let number = index + 0.5;

    return  (
      <>
      <span key={index}>{ e.rating > index+1 ? <svg style={{  color : 'orange'}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
    <path className='fullstar' d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg> : e.rating > number ? <svg style={{ color : 'orange'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-half" viewBox="0 0 16 16">
    <path className='fullstar' d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"/>
  </svg> : <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
    <path className='fullstar' d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg> }</span>
      </>
    )
  })}</div>
      {/* end */}
        <h6 class="card-title text"  style={{ fontSize : '2rem' ,  color : '#f50'}}>Rs : {e.price}<span style={{ fontSize : '1.5rem' ,  marginLeft : '1rem' , color : '#9e9e9e'}} className='price_cut'>{e.cutprice}</span><span className='badge' style={{   fontSize : '1.5rem'  , marginLeft : '1rem' ,   backgroundColor : '#ff2f2f'}}>-{e.discountpercentage}%</span></h6>
      </div>
    </div>
  </div>
</div> 
</Link>
            </>
             )
        }
            
        })}

      {/* grid view end here */}

      {/* for line view start here */}
      
         
    
      {/* line view  end here */}
        </div>}
       </div>

    </div>
    <Footer />
    </div>
    
    </>
  )
}

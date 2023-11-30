import React, { useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Navbar } from '../Navbar/Navbar'
import axios from 'axios';

export const Uploadform = () => {

  const [uploaddata , setuploaddata] = useState({
        brand : "",
        title : "",
        description : "",
        price : "",
        discountpercentage : "",
        rating : "",
        stock : "",
        category : "",
        cutprice : ""
  });

  const [uploadimage , setuploadimage] = useState();
  const [errmsg , seterrmsg] = useState('');
  const [alert , setalert] = useState();

  const handleimagechnage = (e) => {
      const filereader = new FileReader();
       filereader.readAsDataURL(e.target.files[0])
      filereader.onload = () => {
          setuploadimage(filereader.result)
      }
      filereader.onerror = (err) => {
        console.log(err)
      }
  }

  const handleuploadchange = (e) => {
       setuploaddata({...uploaddata , [e.target.name] : e.target.value})
        const r = uploaddata.rating;
       if(isNaN(r)){
              seterrmsg('please enter number not a alphabet ');
       }else{
        seterrmsg('');
       }
  }

  const handlesubmit = async(e) => {
    e.preventDefault();
     try {
     
      
      const postuploaddata = await axios.post('http://localhost:3000/Send_data_api'  , {
        brand : uploaddata.brand,
        title : uploaddata.title,
        description : uploaddata.description,
        price : uploaddata.price,
        discountpercentage : uploaddata.discountpercentage,
        rating : uploaddata.rating,
        stock : uploaddata.stock,
        category : uploaddata.category,
        images : uploadimage,
        cutprice : uploaddata.cutprice

      })
       
      if( postuploaddata.status !==200){
           
      }else{
         setalert(<div class="alert alert-warning alert-dismissible fade show" role="alert">
         <strong>Success!</strong> Data is Uploaded
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>)
      }
      
     
     } catch (error) {
      console.log(error)
     }
  }

  return (
    <>
    <Navbar />
   
     <div className="container">

        <h1 className='text-center my-4'>UPLOAD DATA </h1>
     <form action='/Send_data_api' method='POST' onSubmit={handlesubmit}>
   
     <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Brand </label>
    <input type="text" class="form-control" name='brand' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label"> Product Title</label>
    <input type="text" class="form-control" name='title' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Description</label>
    <input type="text" class="form-control" name='description' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Price</label>
    <input type="number" class="form-control" name='price' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Discount Price</label>
    <input type="number" class="form-control" name='cutprice' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Discount</label>
    <input type="number" class="form-control" name='discountpercentage' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Rating (3 to 5 )</label>
    <input type="text" class="form-control" name='rating' onChange={handleuploadchange}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div style={{color : 'red'}}>{errmsg}</div>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Avialable Stock</label>
    <input type="number" class="form-control" name='stock' onChange={handleuploadchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Type (Category) </label>
    <input type="text" class="form-control" name='category' onChange={handleuploadchange}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
  <label for="formFile" class="form-label">Image</label>
  <input class="form-control" type="file" name='images' onChange={handleimagechnage} id="formFile"/>
  </div>
   {alert}
  <div class="mb-3">
  <button type="submit" class="btn btn-primary my-2 " style={{marginLeft : '1rem'}}>Submit</button>
  </div>
</form>
     </div>
     <Footer/> 
    </>
  )
}

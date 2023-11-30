import React, { useState } from 'react';
import './Buyform.css';
import { useSelector } from 'react-redux';
import axios from 'axios';



export const Buyform = () => {

  const totalorder = useSelector((state) => state.Product_page_store.total_product );
  const grandtotal = useSelector((state) => state.Product_page_store.grandtotal);
  const [submit_loading , setsubmit_loading] = useState(false);
  const [ errmsg , seterrmsg] = useState('');
  const [disable , setdisable] = useState('');
  const [msg , setmsg]= useState()

 
  const ord =  totalorder.map((e) => {
       return e._id
   })

  
  
  const [formdata , setformdata] = useState({
    firstname : '',
    lastname : '',
    number : 0,
    email : '',
    address : '',
    city : '',
  })
   
  const handlechange = (e) => {
      setformdata({ ...formdata , [e.target.name] : e.target.value})
   
       
     const d = document.getElementsByClassName('rating')[0].value;
     console.log(d)
     if(d.length !== 11 ){
        seterrmsg('Please Enter Valid Number')
     }else{
      seterrmsg('')
     }
   
  }

  const handlesubmit = async(e) => {
    try {

    
      e.preventDefault();
   
       const postorder = await axios.post('http://localhost:3000/Naz_Order' , {
        order_id : ord,
        firstname : formdata.firstname,
        lastname : formdata.lastname,
        number : formdata.number,
        email : formdata.email,
        address : formdata.address,
        city : formdata.city,
        order : totalorder,
        total_amount : grandtotal
       });
         
        
       if(postorder.status !== 200){
            setsubmit_loading(true)
       }else{
         setmsg(<div class="alert alert-success" role="alert">
       Form Submit  !! Order is Placed
</div>)
      setdisable('disabled')
       }

       const postemmail = await axios.post('http://localhost:3000/SendMail' , {

         email : formdata.email,
         orderID : ord
       })

       console.log(postemmail);

    } catch (error) {
      console.log(error)
    }
      
  }

 


  return (
    <>
    
    <div className="container">
    <div class="alert alert-danger alert-dismissible fade show my-2" role="alert">
  <div> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
</svg> <strong >Disclaimer </strong></div> If you want to <strong> Change or Return</strong> for any purpose . You can contact us by <div> <strong><svg style={{color : 'green'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-whatsapp mb-2" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
</svg>  Whatssapp 0311-3193361</strong></div>  
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

    <h1 className='text-center ' style={{marginTop : '30px'  , textShadow : '2px 4px 4px pink'}}> Your Details  </h1>
    <form onSubmit={handlesubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Firstname</label>
    <input type="text" required class="form-control" name='firstname'  onChange={handlechange} placeholder='Enter your firstname' id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Lastname</label>
    <input type="text" required class="form-control" name='lastname' onChange={handlechange} placeholder='Enter your lastname' id="exampleInputPassword1"/>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Phone Number</label>
    <input type="number" required    class="form-control rating" name='number' onChange={handlechange} placeholder='Enter your PhoneNumber' id="exampleInputPassword1"/>
    <div style={{color : 'red'}}>{errmsg}</div>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Email</label>
    <input type="email" required class="form-control" name='email' onChange={handlechange} placeholder='Enter your Email' id="exampleInputPassword1"/>
  </div>
                                                                                                                               
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Address</label>
    <textarea class="form-control" name='address' onChange={handlechange}  id="exampleFormControlTextarea1" rows="3"></textarea>
    <div id="emailHelp" class="form-text">Please enter complete address (street # , house # , city)</div>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">City</label>
    <input type="text" required class="form-control" name='city' onChange={handlechange} placeholder='Enter your City' id="exampleInputPassword1"/>
  </div>
 {msg}
  <div class="mb-3 d-flex justify-content-center " >
  <button type="submit" class={`btn btn-primary text-center ${disable}`}  style={{width : '50%' }}>
  
     { submit_loading === true ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> :  'Submit' }
  
 </button>
  </div>
</form>
    </div>

    </>
  )
}

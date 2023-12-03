
// dotenv
 require('dotenv').config();

// for express 
const express = require('express');
const app = express();
const port =  process.env.PORT ;

// for depolment
const path = require('path');

// for cors policy error
const cors = require('cors');

 // "dev": "nodemon ./src/app.js"

// for nodemailer
const nodemailer = require('nodemailer');


// for use api data
const body_parser = require('body-parser');

// all Middlewares

app.use(body_parser.json({ limit: '50mb' }));
app.use(body_parser.urlencoded({ extended: true , parameterLimit: 50000  , limit : '50mb'}));


// cors middle ware
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
   );
   res.setHeader(
     "Access-Control-Allow-Methods",
     "GET, POST, PATCH, DELETE, OPTIONS"
   );
   next();
 });
  
 let corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// middleware for file
const fileupload = require('express-fileupload');
app.use(fileupload({ useTempFiles : true }))


// for MongoDB Connection

require('./src/db/connections')


// for Schame of API
const NazDB = require('./src/db/Api_Schema');

// for Schema of Nazorder
const NazOrderDB = require('./src/db/User_Schema');

// for Cloud storage to images
const cloudinary = require('cloudinary').v2;
cloudinary.config({ secure: true });
cloudinary.config({ 
    cloud_name: 'de2nzvcrd', 
    api_key : process.env.CLOUDINARY,
    api_secret : process.env.CLOUDINARY_SECRET
  });

// middleqware for deplyment 
app.use(express.static(path.join( __dirname ,  `/Naz'sCollection_Website/my-app/build`)));

app.get('*' , (req , res) => {
   res.sendFile(path.join(  __dirname,  `/Naz'sCollection_Website/my-app/build/index.html`))
})


app.get('/' , (req , res ) => {
     res.send({
        name : "suzair"
     })
})

app.get('/naz_api_data' , async( req , res ) => {
          try {

                const get_api = await NazDB.find(); 
                
                  res.status(200).json(get_api);
                
                
                
          } catch (error) {
                res.status(400).send(error)
                console.log(error)
          }
        
} )

app.post('/Send_data_api' , async(req , res) => {
       try {
        
         const file =  req.body.images;
         
        cloudinary.uploader.upload( file , async( error , result) => {

                const create_api =  new NazDB({
                title : req.body.title,
                description :  req.body.description ,
                price : req.body.price,
                discountpercentage : req.body.discountpercentage,
                rating : req.body.rating,
                stock : req.body.stock,
                brand : req.body.brand,
                category :  req.body.category,
                images : result.url,
                image_id : result.public_id,
                cutprice : req.body.cutprice
        }) 
        const save_api_data = await create_api.save(); 
           res.status(200).json({
               success : true,
               message : "upload ho  gya"
           })
        })
         
       } 
       catch (error) {
          console.log(error)
       }
       
        
})

app.delete('/DeleteSingle/:id' , async( req, res ) => {

  try {
    const id = req.params.id
    const find_image = await NazDB.findOne({ _id : id});
     const image_id = find_image.image_id

     
     const delete_image_clouds = await cloudinary.uploader.destroy(image_id)
    const deletedproduct = await NazDB.findByIdAndDelete({_id : id })

        res.status(200).send({
          success : true,
          message : 'prpduct deleted'
        })
    
  } catch (error) {
     console.log(error)
  }

     
} )

app.put('/UpdateProduct/:id' , async(req , res ) => {
  const id = req.params.id
  const updateproduct = await NazDB.findByIdAndUpdate({_id : id} , req.body , { new : true } )

res.send(updateproduct);
})

app.get( '/Singlecart_api/:id'  , async(req , res ) => {
   try {
    const cartid = req.params.id;
    const  getsingleproductapi = await NazDB.findOne({ _id : cartid});
      res.status(200).send(getsingleproductapi);
    
   } catch (error) {
     console.log(error)
   }
})

app.get('/Search/:usersearch' , async(req , res) => {
      try {
        
        const searchvalue = req.params.usersearch;
        const getsearch = await NazDB.find({
              "$or" : [ {brand : {$regex : searchvalue ,  $options : "i"}} , {category : {$regex : searchvalue , $options : "i"}} ]
        })
       
        res.status(200).send(getsearch);

      } catch (error) {
        console.log(error)
      }
})

app.get('/Searchprice/:range'  , async(req , res ) => {
  try {
     const searchprice = req.params.range;
     const getprice = await NazDB.find({ price : {$lte :  searchprice}})

     res.status(200).send(getprice);
  } catch (error) {
    console.log(error)
  }
})

// Now for Naz orer Schema 


app.post( '/SendMail' , async(req , res) => {

  try {
  
const transporter = nodemailer.createTransport({
  
  host: "smtp.gmass.co",
  port:  465,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user : 'gmass',
    // pass : 'cc90c0e5-ccfd-4744-9d34-5b494454178b'
    pass : process.env.GMASS_PASS
  },
});



    const useremail = req.body.email;
    const orderid = req.body.orderID;
    
     const or = orderid.join('   ||   ');
  
    const info = {
      from: 'suzairkhan065@gmail.com', // sender address
      to:  useremail, // list of receivers
      subject: "Naz's Collection", // Subject line
      text: `Your Order ID : ${or} `, // plain text body
    };


    const mail = transporter.sendMail(info , (err ,data) => {
           
      if(err){
        console.log(err)
      }
      else{
        console.log(`Mail successfull `)
      }

    })

    
  } catch (error) {
     console.log(error)
  }

})

app.post('/Naz_Order' , async(req ,res ) => {
          
  try {
    
  const CreateNazUser = new NazOrderDB({
    order_id : req.body.order_id,
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    address : req.body.address,
    city : req.body.city,
    order : req.body.order,
    total_amount : req.body.total_amount
  })
  const createduser = await CreateNazUser.save();
   if(createduser){
    res.status(200).send({
      success : true,
      message : 'Order Succesfull'
   })
   }
  
  } catch (error) {
     console.log(error)
  }
  
})



app.listen( port , () => {
        console.log("servr is ru nibng")
})
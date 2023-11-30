const  mongoose = require('mongoose');


 const DatabaseConnection  = mongoose.connect( `mongodb://127.0.0.1:27017/Naz'sCollection` ).then(() => {
   console.log("Mongo_DB Connection");
}).catch((e) =>{
    console.log(e);
})

module.exports = DatabaseConnection ; 
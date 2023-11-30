
const mongoose = require('mongoose');
// for unique id 
const shortid  = require('shortid');


const Naz_Schema = new  mongoose.Schema({
         
    title : {
       type : String,
    },

    description : {
        type : String,
    },

    price : {
        type : Number,
    },

    discountpercentage : {
        type : Number,
        
    },

    rating : {
        type : String,
    },

    stock : {
        type : Number,
    },

    brand : {
        type : String,
    },

    category : {
        type : String, 
    },

    images : {
        type : String,
    },

    image_id : {
        type : String
    },

    quantity : {
        type : Number,
        default : 1
    },

    weight : {
        type : Number,
        default : 1
    },
    cutprice : {
        type : Number,
        default : 1300
    }
         
})

const NazDB = new mongoose.model("Naz'sCollection_User" , Naz_Schema);


module.exports = NazDB
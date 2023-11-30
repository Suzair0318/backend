const mongoose = require('mongoose');


const Naz_User = new mongoose.Schema({

    order_id : {
        type : Array,
        require : true
    },
      
    firstname : {
        type : String,
        require : true
    },

    lastname : {
        type : String,
        require : true
    },

    email : {
        type : String,
        require : true
    },

    address : {
        type : String,
        require : true
    },

    city : {
        type : String,
        require : true
    },
    
    order : {
        type : Array,
        require : true
    },

    total_amount : {
        type : Number,
        require : true
    }


})

const Naz_Order = new mongoose.model( 'Naz_Order' , Naz_User );

module.exports = Naz_Order
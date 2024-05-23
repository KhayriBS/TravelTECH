import mongoose from "mongoose";
const {Schema,model} = mongoose

const produitSchema = Schema({
   
    nomP : {
          type :String,   
          required : true
    },
    
    descriptionP : {
        type :String,
        required : true
    },
    
    prix:
    {   type:Number,
        required : true
    },

    Qt :
    {   type:Number,
        required : true

    },

    image:
    {    type:String,
        required : true

    },

    stock:{
        type:Number,
        required : true

    },
    statusP:{
        type: Boolean,
        required : true

    }

},{timestamp : true})

export default model('Produit',produitSchema)
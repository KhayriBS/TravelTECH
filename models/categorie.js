import mongoose from "mongoose";
const {Schema,model} = mongoose

const categorieSchema = Schema({
    nomC :{
        type:String,
        required : true

    },

    descriptionC :{
        type: String,
        required : true
    },

    nbrProduit:{
        type:Number,
        required : true

    },
    statusC:{
        type:Boolean,
        required : true
    } ,


},{timestamp : true})

export default model('Categorie',categorieSchema)
import express from 'express'
import { body } from 'express-validator'

import {addProduct, getProduct,getAllProduct,UpdateProduit,deleteProduct} from '../controllers/produit.js'
import multer from '../middlewares/multer-config.js';

const router = express.Router()

router
    .route('/')
    .post(
        multer,
        body('nomP').isLength({ min : 5, max : 20}),
        body('descriptionP').isLength({ min : 15, max :100}),
        body('Qt').isLength({ min : 1, max :100}),
        body('prix').isLength({ min : 8, max : 15}),
        body('stock').isLength({ min : 1, max : 150}),

        addProduct)

router
        
    .route('/:id')
    .get(getProduct)
    .patch(UpdateProduit)
    .delete(deleteProduct);

router

    .route('/')
        .post(
        body('nomP').isLength({ min : 5, max : 20}),
        body('descriptionP').isLength({ min : 15, max :100}),
        body('Qt').isLength({ min : 1, max :100}),
        body('prix').isLength({ min : 8, max : 15}),
        body('stock').isLength({ min : 1, max : 150}),

        )
        .get(getAllProduct)
    
    
export default router;
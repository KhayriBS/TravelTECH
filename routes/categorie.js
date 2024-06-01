import express from 'express'
import { body } from 'express-validator'

import {addCategorie, getCategorie,getAllCategorie,UpdateCategorie,deleteCategorie} from '../controllers/categorie.js'

const router = express.Router()

router
    .route('/')
    .post(
        body('nomC').isLength({ min : 5, max : 20}),
        body('descriptionC').isLength({ min : 15, max :100}),
        body('nbrProduit').isLength({ min : 1, max :100}),
        
        addCategorie)

router
        
    .route('/:id')
    .get(getCategorie)
    .patch(UpdateCategorie)
    .patch(deleteCategorie);

    router
    .route('/')
        .post(
            body('nomC').isLength({ min : 5, max : 20}),
            body('descriptionC').isLength({ min : 15, max :100}),
            body('nbrProduit').isLength({ min : 1, max :100}),
            
        )
        .get(getAllCategorie)
    
    
export default router;
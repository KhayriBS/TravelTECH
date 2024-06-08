import express from 'express'
import { body } from 'express-validator'

import {addProduct, getProduct,getAllProduct,UpdateProduit,deleteProduct , getProductsSortedByName,getProductsByPriceRange,getProductsByAvailability,getProductsByCategory , countProductsByCategory,countProductsInEachCategory} from '../controllers/produit.js'
import multer from '../middlewares/multer-config.js';

const router = express.Router()

router
// Route pour ajouter un produit
    .route('/products')
    .post(
        multer,
        body('nomP').isLength({ min : 5, max : 20}),
        body('descriptionP').isLength({ min : 15, max :100}),
        body('Qt').isLength({ min : 1, max :100}),
        body('prix').isLength({ min : 8, max : 15}),
        body('stock').isLength({ min : 1, max : 150}),

        addProduct)

router
        // Route pour obtenir un produit par son identifiant

    .route('/produit/:id')
    .get(getProduct)

    router
    .route('/update/:id')
    .patch(UpdateProduit)

    router
    .route('/delete/:id')
    .delete(deleteProduct);

router
     // Route pour obtenir tous les produits

    .route('/productsAll')
        .post(
        body('nomP').isLength({ min : 5, max : 20}),
        body('descriptionP').isLength({ min : 15, max :100}),
        body('Qt').isLength({ min : 1, max :100}),
        body('prix').isLength({ min : 8, max : 15}),
        body('stock').isLength({ min : 1, max : 150}),

        )
        .get(getAllProduct)

 /*router
  .route('/filter')
  .get(filterProductsByName);*/
    

  router
  .route('/products/sorted')
  .get( getProductsSortedByName);

  // Route pour filtrer les produits par une plage de prix
router
.route('/products/price-range')
.get( getProductsByPriceRange);


//filtrer les produits par disponibilité en stock

router
.route('/products/availability')
.get(getProductsByAvailability);

//filtrer les produits par catégorie

router
.route('/products/categorie')
.get(getProductsByCategory);

//compter tous les produits d'un catégorie

router
.route('/products/count-by-category')
.get( countProductsByCategory);

// filtrer les produits dans un catégorie avec le nom et compter le nombre de chaque produit

router
.route('/products/count-in-each-category')
.get( countProductsInEachCategory);


export default router;

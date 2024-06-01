
import Produit from "../models/produit.js"

//Ajouter produit
export function addProduct (req, res) {
   
        const {nomP, descriptionP, prix, Qt, image, stock, statusP,categorie } = req.body;

    Produit.create({
       
        nomP: nomP,
        descriptionP: descriptionP,
        prix: prix,
        Qt: Qt,
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        stock: stock,
        statusP: statusP,
        categorie:categorie
    }
    
    ).then(newProdduct => {
        res.status(201).json({newProdduct : 'produit ajouter avec succes'})
    })
    .catch(err => {
        res.status(500).json({ error: 'Erreur lors de la création du produit' })
    })
    }


export function getProduct (req, res) {
    Produit.findById(req.params.id)
    .then( produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

export function getAllProduct (req, res) {
    Produit.find({})
    .then( produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}




export function UpdateProduit (req, res) {
 
    Produit.findByIdAndUpdate(req.params.id , req.body , {new : true})
    .then(produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}

export function deleteProduct (req, res) {
    Produit.findByIdAndDelete(req.params.id)
    .then(produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}


  //filtrer les produits par leur nom 

  export function getProductsSortedByName(req, res) {
    const { order } = req.query; // 'asc' pour A-Z et 'desc' pour Z-A

    const sortOrder = order === 'desc' ? -1 : 1; // Définir l'ordre de tri

    Produit.find({})
        .sort({ nomP: sortOrder })
        .then(produits => {
            res.status(200).json(produits);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération des produits triés' });
        });
}

//filtrer les produits par prix 

export function getProductsByPriceRange(req, res) {
    const { minPrice, maxPrice } = req.query;

    if (minPrice == null || maxPrice == null) {
        return res.status(400).json({ error: 'Les paramètres minPrice et maxPrice sont requis' });
    }

    Produit.find({ prix: { $gte: minPrice, $lte: maxPrice } })
        .then(produits => {
            res.status(200).json(produits);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        });
}
 
//filtrer les produits par disponibilité 

export function getProductsByAvailability(req, res) {
    const { available } = req.query;

    let query = {};
    if (available === 'true') {
        query = { statusP: true }; // Produits en stock (statusP = true)
    } else if (available === 'false') {
        query = { statusP: false }; // Produits hors stock (statusP = false)
    }

    Produit.find(query)
        .then(produits => {
            res.status(200).json(produits);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
        });
}

//filtrer les produits par catégorie

export function getProductsByCategory(req, res) {
    Produit.find({})
        .populate('categorie') // Permet de remplacer l'ID de la catégorie par l'objet catégorie complet
        .then(produits => {
            res.status(200).json(produits);
        })
        .catch(err => {
            res.status(500).json({ error: 'Erreur lors de la récupération des produits avec leur catégorie' });
        });
}

//compter tous les produits d'un catégorie



export function countProductsByCategory(req, res) {
    Produit.aggregate([
        {
            $group: {
                _id: "$categorie", // Group by the category field
                products: { $push: "$nomP" }, // Collect product names
                count: { $sum: 1 } // Count the number of products in each category
            }
        },
        {
            $lookup: {
                from: "categories", // Name of the category collection
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $project: {
                _id: 0,
                category: "$categoryDetails.nomC", // Category name
                products: 1, // Product names
                count: 1 // Count of products
            }
        }
    ])
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        res.status(500).json({ error: 'Erreur lors de la récupération du nombre de produits par catégorie' });
    });
}

// filtrer les produits dans un catégorie avec le nom et compter le nombre de chaque produit

export function countProductsInEachCategory(req, res) {
    Produit.aggregate([
        {
            $group: {
                _id: { categorie: "$categorie", nomP: "$nomP" }, // Group by category and product name
                nbproduit: { $sum: 1 } // Count the number of each product in each category
            }
        },
        {
            $lookup: {
                from: "categories", // Name of the category collection
                localField: "_id.categorie",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $project: {
                _id: 0,
                category: "$categoryDetails.nomC", // Category name
                product: "$_id.nomP", // Product name
                nbproduit: 1 // Count of each product
            }
        }
    ])
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err => {
        res.status(500).json({ error: 'Erreur lors de la récupération du nombre de produits dans chaque catégorie' });
    });
}
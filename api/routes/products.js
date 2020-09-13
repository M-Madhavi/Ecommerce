const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");
const checkAuth = require('../middleware/check-auth');


router.get("/", (req, res, next) => {
    Product.find()
        .select('categoryid name price Description picture size ProductsAvailable Stock')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        categoryid:doc.categoryid,
                        name: doc.name,
                        price: doc.price,
                        Description: doc.Description,
                        picture: doc.picture,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:2020/products/" + doc._id,
                            url1:doc.picture
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/",checkAuth, (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        categoryid:req.body.categoryid,
        name: req.body.name,
        price: req.body.price,
        picture: req.body.picture,
        Description: req.body.Description,
        size:req.body.size,
        ProductsAvailable:req.body.ProductsAvailable,
        Stock:req.body.Stock

    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    categoryid:result.categoryid,
                    name: result.name,
                    price: result.price,
                    Description: result.Description,
                    picture: result.picture,
                    size:result.size,
                    ProductsAvailable:result.ProductsAvailable,
                    Stock:result.Stock,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:2020/products/" + result._id,

                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id description imageURL')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2020/products',
                        url1: doc.picture
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
//to find product by particular product Id
router.patch("/:productId", checkAuth,(req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:2020/products/' + id,
                    url1:doc.picture
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:productId", checkAuth,(req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:2020/products',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;

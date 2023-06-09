const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const router = require("express").Router();

router.post("/addProduct", productController.addProduct);

router.get("/allProducts", productController.getAllProducts);

router.get("/published", productController.getPublishedProduct);

router.get('/search', productController.getSearchProduct);

router.get('/pagenation', productController.getPagenationProduct)

// review url

router.post("/addReview", reviewController.addReview);

router.get("/allReviews", reviewController.getAllReviews);


// product review

router.get('/getProductReviews/:id', productController.getProductRewiews)


router.get("/:id", productController.getOneProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);



module.exports = router;

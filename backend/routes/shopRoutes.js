const express = require("express");
const {
    fetchShopsByCategory,
    fetchShop,
    updateShop,
    createShop,
    deleteShop,
    addOrder,
    updateOrderState,
    rateShop,
    verifyShop,
    addArticle,
    deleteArticle
} = require("../controllers/shopControllers")
const authMiddleware =require("../authMiddleware")

const router = express.Router();

router.get("/shops/category", fetchShopsByCategory);
router.get("/shop/:id", fetchShop);
router.put("/shop/:id",updateShop);
router.post("/shop", createShop);
router.post("/verify-shop", verifyShop);
router.post("/shop/:shopId/orders",authMiddleware, addOrder);
router.put("/shopsandusers/:shopId/:userId/orders/:orderId/state",updateOrderState);
router.delete("/shop", deleteShop);
//router.post("/houses-multiple-filter", fetchHousesByMultipleFilters);
router.post("/shop/:shopId/rate", authMiddleware , rateShop );
router.post("/shop/:shopId/article", authMiddleware , addArticle );
router.delete("/shop/:shopId/article/:articleId", authMiddleware , deleteArticle );

module.exports = router;
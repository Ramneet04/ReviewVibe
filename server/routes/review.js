const express = require("express");
const {submitReview, getRecentReviews} = require("../controller/review");
const router = express.Router();


router.post('/', submitReview);
router.get('/', getRecentReviews);

module.exports = router;
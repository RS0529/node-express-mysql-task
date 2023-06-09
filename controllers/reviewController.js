const db = require("../models");

const Review = db.reviews;

//add review

exports.addReview = async (req, res) => {
  let data = { 
    rating: req.body.rating,
    description: req.body.description,
    product_id : req.body.product_id
    };
  const review = await Review.create(data);
  res.status(200).send(review);
};

// Get all review

exports.getAllReviews = async (req, res) => {
  const reviews = await Review.findAll({});
  res.status(200).send(reviews);
};


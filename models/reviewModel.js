const product = require("./productModel");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    product_id: {
      type:DataTypes.INTEGER,
      references:{
        model: product,
        key: 'id'
      }
    },
    rating: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
  }, {timestamps:false});
  return Review;
};

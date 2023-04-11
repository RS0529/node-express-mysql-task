const db = require("../models");

const Product = db.products;
const Review = db.reviews;

exports.addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// get all product

exports.getAllProducts = async (req, res) => {
  //   let products = await Product.findAll({ attributes: ["title", "price"] });
  let products = await Product.findAll({});

  res.status(200).send(products);
};

// get single product

exports.getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// update Product

exports.updateProduct = async (req, res) => {
  let id = req.params.id;

  const product = await Product.update(req.body, { where: { id: id } });

  res.status(200).send(product);
};

// delete single product

exports.deleteProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("Product is Deleted");
};

// published product

exports.getPublishedProduct = async (req, res) => {
  const products = await Product.findAll({ where: { published: true } });
  res.status(200).send(products);
};

// 1 to many relation product and review

exports.getProductRewiews = async (req, res) => {
  let id = req.params.id;
  const data = await Product.findAll({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: id },
  });
  res.status(200).send(data);
};

//search product

exports.getSearchProduct = async (req, res) => {

  // const {query} = req.query;
  // const sql = `SELECT * FROM products WHERE title LIKE '%${query}%'`;
  // db.sequelize.query(sql, (error, results, fields) => {
  //   if (error) {
  //     console.error(error);
  //     return res.sendStatus(500);
  //   }
  //   res.json(results);
  // });
  // const { query } = req.query;

  // const [rows] = await db.sequelize.query(
  //   `SELECT * FROM products WHERE title LIKE '%${query}%'`
  // );

  // res.json(rows);


  const { query } = req.query;
  try {
    const [rows] = await db.sequelize.query(
      `SELECT * FROM products WHERE title  LIKE '%${query}%'`
    );
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// pagenation product

exports.getPagenationProduct = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const offset = (page - 1) * limit;
    const products = await Product.findAll({ limit, offset });
    res.json(products);
  } catch (err) {
    next(err);
  }
}
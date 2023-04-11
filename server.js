const express = require("express");
const session = require('express-session')
const cors = require("cors");

const app = express();
app.use(
  session({
    secret:'secret',
    resave: true,
    saveUninitialized: true,
  })
)

let corOptions = { origin: "https://localhost:8000" };





//middeware

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//routers
const productRoutes = require("./routes/productRouter");
const authRoutes = require("./routes/authRouter");


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Hello express+mysqli project" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is running port ${PORT}`));

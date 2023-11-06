const express = require("express");
const Products = require("./product");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes

app.get("/", (req, res) => {
  res.send("your home page");
});

// app get func

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById({ id });
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// app update a product

app.put("products/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const product = await Products.findByIdAndUpdate(id, req.body);

    //  we   cannot find any product with ID
    if (!product) {
      return res
        .status(404)
        .json({ message: "cannot find any product with ID" });
    }
    const upDateProduct = await Products.findById(id);
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// app delete a product

app.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Products.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
 
// app post

app.post("/products", async (req, res) => {
  try {
    const product = await Products.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// mongoose connect

mongoose.set("strictQuery", false);

mongoose
  .connect(
    "mongodb+srv://baxtiyor:baxtiyor060708@cluster0.pwwfnzj.mongodb.net/Surxan-Api?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected Mongodb");
    app.listen(3000, (req, res) => {
      console.log("Surxan-Bazar-listening port");
    });
  })
  .catch(() => {
    console.log(error);
  });

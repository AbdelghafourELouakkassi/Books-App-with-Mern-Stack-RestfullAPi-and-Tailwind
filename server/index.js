require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const connectDb = require("./connectDb");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/upload", express.static("upload"));
const multer  = require('multer')


connectDb();
const Books= require("./models/Books");



app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    const data = await Books.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "error while fetching books" });
  }
});



app.get("/api/books/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const data = await Books.findOne({ slug: slug });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "error while fetching book" });
  }
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix +"-"+ file.originalname)
  }
})

const upload = multer({ storage: storage })


app.post("/api/books/CreateBook",upload.single("thumbnail"), async (req, res) => {
  const { title, slug, description,stars, category } = req.body;
  
  const newbook = new Books({
    title,
    slug,
    description,
    thumbnail:req.file.filename,
    stars,
    category,
  });
  try {
    await Books.create(newbook);
    res.json("book added");
  } catch (error) {
    res.status(500).json({ error: "error the new book not added" });
  }
});


app.put("/api/books/update/:slug",upload.single("thumbnail"), async (req, res) => {

  const { title, slug, description,stars, category } = req.body;
  const slugparam=req.params.slug
  const updateBook ={
    title,
    slug,
    description,
    stars,
    category,
  };

  if(req.file){
    updateBook.thumbnail=req.file.filename
  }
  try {
    await Books.updateOne({slug:slugparam},updateBook);
    res.json("book updated");
  } catch (error) {
    res.status(500).json({ error: "the book not updated" });
  }
});





app.delete("/api/books/:id", async (req, res) => {
  const bookid=req.params.id
  try {
    await Books.deleteOne({_id:bookid});
    res.json("the book is deleted");
  } catch (error) {
    res.status(500).json({ error: " book not deleted" });
  }
});



app.get("/", (req, res) => {
  res.json("hello abdo");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

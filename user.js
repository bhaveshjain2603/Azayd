const con = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile("index.html", { root: "public/html" });
});

app.listen(3030, () => {
    console.log("Server is running on port 3030")
})
const con = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//to send specific file to client
app.use(express.static("public"));
//user entered data should be encoded;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("index.html", { root: "public" });
});

app.post("/signup-customer", function (req, res) {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const customerPassword = req.body.customerPassword;
    const cusotmerPhone = req.body.cusotmerPhone;
   
    console.log(customerName);
    console.log(customerEmail);
    console.log(customerPassword);
    
    let sql = `INSERT INTO USER (username,email,password,phone) VALUES ("${customerName}","${customerEmail}","${customerPassword}", "${cusotmerPhone}");`;
    let checkuser = true;
    for (let i = 0; i < emails.length; i++) {
      checkuser = emails[i] === customerEmail ? false : true;
    }
    console.log(checkuser + " user Signup");
    if (checkuser) {
      con.query(sql, function (err, result) {
        if (err) {
          res.send("User Already Exist go back");
        } else {
          res.sendFile("index.html", { root: "public" });
        } 
      });
    } else {
      res.send("User Already Exist go back");
    }
});

app.post('/login-customer', (req, res) => {
    const emailCustomer = req.body.emailCustomer;
    const passwordCustomer = req.body.passwordCustomer;
  
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const values = [emailCustomer, passwordCustomer];
  
    con.query(query, values, (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        res.sendFile("index.html", { root: "public" });
      } else {
        res.send('Invalid credentials');
      }
    });
});

app.listen(3030, () => {
    console.log("Server is running on port 3030")
})
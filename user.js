const con = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//to send specific file to client
app.use(express.static("public"));
//user entered data should be encoded;
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("index.html", { root: "public" });
});

app.post('/free-trial', (req, res) => {
  const registerName = req.body.registerName;
  const registerEmail = req.body.registerEmail;
  const registerPhone = req.body.registerPhone

  const query = `INSERT INTO freetrial(NAME, EMAIL, PHONE) VALUES ("${registerName}", "${registerEmail}", "${registerPhone}");`;

  con.query(query, (err, results) => {
    if (err) {
      res.send("Unsuccessfull Registration")
    } else {
      res.send("Registered Successfully");
    }
  });
});

app.post('/signup-customer', function (req, res) {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const customerPassword = req.body.customerPassword;
    const customerPhone = req.body.customerPhone;
   
    console.log(customerName);
    console.log(customerEmail);
    console.log(customerPassword);
    
    let sql = `INSERT INTO USER (USERNAME,EMAIL,PASSWORD,PHONE) VALUES ("${customerName}","${customerEmail}","${customerPassword}", "${customerPhone}");`;
    let checkuser = true;
    let emails = customerEmail;
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
  
    const query = `SELECT * FROM user WHERE EMAIL = ? AND PASSWORD = ?`;
    const values = [emailCustomer, passwordCustomer];
  
    con.query(query, values, (err, results) => {
      if (err) {
        res.json({ success: false, message: 'Invalid credentials' });
      } else {
        res.json({ success: true });
      }
    });
});

app.post('/logout-customer', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Unable to log out');
    }
    res.redirect('/');
  });
})


app.post('/connect', (req, res) => {
  const userName = req.body.userName;
  const userEmail = req.body.userEmail
  const userText = req.body.userText;

  const query = `INSERT INTO contact (USERNAME, EMAIL, TEXT) VALUES ("${userName}", "${userEmail}", "${userText}");`;
  
  con.query(query, (err, results) => {
    if (err) {
      res.send('Error storing message in database');
    } else {
      res.send('Message stored to the database');
    }
  });
});


app.listen(3030, () => {
    console.log("Server is running on port 3030")
})
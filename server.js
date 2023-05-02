const express = require('express');
const db = require('./config/connection');
// Require model
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Finds all Users
app.get('/users', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(result);
  });
});

// Finds Single User
app.get('/users/:id', (req, res) => {
  console.log("Req Parameters: ", req.params);
  
  User.findById({ _id: req.params.id }, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(data);
    //res.status(200).json({ message: "Find Single User Route", data})
  })
  
})

// Create A New Users
app.post('/users', (req, res) => {
  console.log("Req Body: ", req.body);
  
  User.create(req.body, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
   // res.status(201).json(data);
    res.status(201).json({ message: "Create New User Route", data})
  })
  
})

// Find Single User and UPDATE 
app.put('/users/:id', (req, res) => {
  console.log("Req Parameters: ", req.params);
  console.log("Req Body: ", req.body);
  User.updateOne(req.body, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: "Update Single User Route", data });
  })
})

// REmove USER from DB
app.delete('/users/:id', (req, res) => {
  console.log("Req Parameters: ", req.params);
  User.deleteOne(req.body,(err, data) => {
    if(err){
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Delete Single User Route", data })
  } )
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

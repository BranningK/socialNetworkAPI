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
    res.status(200).json({ message: "Find Single User", data })
  });
});

// Create A New User
app.post('/users', (req, res) => {
  console.log("Req Body: ", req.body);
  User.create(req.body, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
   // res.status(201).json(data);
    res.status(201).json({ message: "Create New User Route", data });
  });
});

// Find Single User and UPDATE 
app.put('/users/:id', (req, res) => {
  console.log("Req Parameters: ", req.params);
  console.log("Req Body: ", req.body);
  User.updateOne(req.body, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: "Update Single User Route", data });
  });
});

// Remove USER from DB
app.delete('/users/:id', (req, res) => {
  console.log("Req Parameters: ", req.params);
  User.deleteOne(req.params.id, (err, data) => {
    if(err){
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Delete Single User Route", data });
  });
});

// Get ALL thoughts
app.get('/thoughts', (req, res) => {
  Thought.find({}, (err, data)=> {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json(data);
  });
});

// Get a thought by ID
app.get('/thoughts/:id', (req, res)=>{
  console.log("Req parameters: ", req.params);
  Thought.findById({ _id: req.params.id }, (err, data) => {
    if(err) {
      res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: "Find single thought", data })
  });
})

// Create THOUGHT
app.post('/thoughts', (req, res) => {
  console.log("Req parameters: ", req.params);
  Thought.create(req.body, (err, data) => {
    if(err){
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Create single thought", data });
  });
});

// Update thought by ID
app.put("/thoughts/:id", (req, res) => {
  console.log("Req Parameters: ", req.params);
  console.log("Req Body: ", req.body);
  Thought.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    console.log("Data: ", data);
    if(err){
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Update thought by ID", data });
  });
});

// Delete a thought by ID
app.delete("/thoughts/:id", (req, res) => {
  console.log("Req parameters: ", req.params);
  Thought.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
    if(err){
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Delete thought by ID", data });
  });
})

// Post a reaction to a thought by its ID
app.post("thoughts/:id/reactions", (req, res) => {
  console.log("Req Parameters: ", req.params);
  console.log("Req Body: ", req.body);
  // const reaction = req.body;
  Thought.findOneAndUpdate({ _id: req.params.id }, { $push: { reactions: req.body }}, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Add reaction to thought", data });
  });
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({}, (err, data)=> {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(data);
    });
  },

  getThoughtById(req, res) {
    console.log("Req parameters: ", req.params);
    Thought.findById({ _id: req.params.id }, (err, data) => {
      if(err) {
        res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json({ message: "Find single thought", data });
    });
  },

  createThought(req, res) {
    console.log("Req parameters: ", req.params);
    Thought.create(req.body, (err, data) => {
      if(err){
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Create single thought", data });
    });
  },

  updateThought(req, res) {
    console.log("Req Parameters: ", req.params);
    console.log("Req Body: ", req.body);
    Thought.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
      console.log("Data: ", data);
      if(err){
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Update thought by ID", data });
    });
  },

  deleteThought(req, res) {
    console.log("Req parameters: ", req.params);
    Thought.findOneAndDelete({ _id: req.params.id }, req.body, (err, data) => {
      if(err){
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Delete thought by ID", data });
    });
  }

};
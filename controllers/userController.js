const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find({}, (err, result) => {
            if (err) {
              res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json(result);
        });
    },

    getUserById(req, res) {
        console.log("Req Parameters: ", req.params);
        User.findById({ _id: req.params.id }, (err, data) => {
            if(err) {
              res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: "Find Single User", data })
        });
    },

    createUser(req, res) {
        console.log("Req Body: ", req.body);
        User.create(req.body, (err, data) => {
            if(err) {
              res.status(500).json({ message: 'Internal server error' });
            }
           // res.status(201).json(data);
            res.status(201).json({ message: "Create New User Route", data });
          });
    },

    updateUser(req, res) {
        console.log("Req Parameters: ", req.params);
        console.log("Req Body: ", req.body);
        User.updateOne({ _id: req.params.id }, req.body, (err, data) => {
            if(err) {
              res.status(500).json({ message: 'Internal server error' });
            }
            res.status(200).json({ message: "Update Single User Route", data });
        });
    },

    deleteUser(req, res) {
        console.log("Req Parameters: ", req.params);
        User.deleteOne({ _id: req.params.id }, (err, data) => {
            if(err){
              res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "Delete Single User Route", data });
        });
    }

};
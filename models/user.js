const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true, 
            unique: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i,
            trim: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "thought"
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

userSchema.virtual("friend_count").get(function(){
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
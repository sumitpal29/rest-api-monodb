// create a a schema for the blog post
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    header: {
        type: String,
        required: true,
    },
    body: {
        type:String,
        required: true,
    },
    auther: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});
// model takes two params name and schema
// model helps to directly interact with the database using the schema
const model = mongoose.model('blogpostModel', schema);

module.exports = model;
require("dotenv").config();
// pulling mongoose for connecting with our server
const mongoose = require("mongoose");
// connect moongose with database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// setting up some events for databse connection
const db = mongoose.connection; // DATABASE VARIABLE
db.on("error", err => console.error("Failed to connect with database"));
db.once("open", () =>
  console.log("Successfully connected with the database!!")
);

const assert = require("assert");
const BlogpostModel = require("../models/blog-model");
// describe all tests
// require two params - Name of the test and a function will all tests
describe("Adding a blogpost", function() {
  // inside create test cases
  // each it block will describe a test
  it("add a blog post data into db", function(done) {
    const data = new BlogpostModel({
      header: "Test blogpost header",
      body: "test content",
      auther: "tester"
    });

    data.save().then(function() {
      // inside this we have to assert the result - what is gonna be
      assert(data.isNew === false);
      // mocha does not know when it will complete
      // so explicitly we need to call done method
      // and go to the next test
      done();
      db.close()
    });
  });
});


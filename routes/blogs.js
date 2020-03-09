const express = require('express');
const router = express.Router();
const BlogpostModel = require('../models/blog-model');

// middle wares
// this middleware will be used to get data of a specific blog
// functions use three params - req, res, and, next 
// next functions says done here move to the next step
const getBlog = async function (req, res, next) {
    // async because we are going to use data base inside
    let blogpost;
    try{
        
        // fetcing a blog by id from database
        blogpost = await BlogpostModel.findById(req.params.id);
        // console.log(blogpost,req.params.id)
        if(blogpost === null) {
            return res.status(404).json({message: `Cannot find the blog`})
        }
    } catch (err) {
        return res.status(500).json({message: `Error while retrieving the blog: ${err}`})
    }

    // keeping the blopgpost data inside res object for future use
    res.blogpost = blogpost;
    // call next say we are done here
    next();
}; 

// Getting all blogs
// Create a GET method for getting all blogs
router.get('/', async (req,res)=>{
    try {
        const allBlogs = await BlogpostModel.find();
        res.json(allBlogs);
    } catch (err) {
        // send back the user the failor in JSON with a status code
        res.status(500).json({message: err + ' Internal server error!!'})
    }
});
// Getting a specific blog
router.get('/:id', getBlog, (req,res)=>{
    // check middleware first
    // getting blogpost from response
    res.status(200).json({
        header: res.blogpost.header,
        auther: res.blogpost.auther
    });
    // res.send(res.header);
});
// Creating one
router.post('/', async (req,res)=>{
    const newBlogpost = new BlogpostModel ({
        header: req.body.header,
        body: req.body.body,
        auther: req.body.auther,
    });

    try {
        res.status(201).json( await newBlogpost.save());
    } catch (err) {
        res.status(400).json({message: `Error from clientside: ${err}`})
    }

});
// Update one
router.patch('/:id', getBlog, async (req,res)=>{
    req.body.header && (res.blogpost.header = req.body.header);
    req.body.body && (res.blogpost.body = req.body.body);
    req.body.auther && (res.blogpost.auther = req.body.auther);
    console.log(req.body, res.blogpost)
    try{
        const updatedBlogpost = await res.blogpost.save();
        res.json(updatedBlogpost);
    } catch (err) {
        res.status(500).json({message: `' Internal server error!!' : ${err}` });
    }
});
// Delete one blog
router.delete('/:id', getBlog, async (req,res)=>{
    try{
        await res.blogpost.remove();
        res.json({
            message: `Successfully deleted the blogpost`
        });
    } catch (err) {
        res.status(500).json({message: err + ' Internal server error!!'});
    }
});

module.exports = router;
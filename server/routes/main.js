const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
 */
router.get('', async (req, res) => {
    try {
      const locals = {
        title: "Humtheman",
        description: "Philosophy, Poetry and General Lifestyle. Elevate your mindset like never before."
      }
  
      let perPage = 10;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      // Count is deprecated - please use countDocuments
      // const count = await Post.count();
      const count = await Post.countDocuments({});
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

/**
 * GET /
 * POST: id
 */
router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Philosophy, Poetry and General Lifestyle. Elevate your mindset like never before.",
      }
  
      res.render('post', { 
        locals,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  
  });
  
/**
 * GET /
 * POST - searchTerm
 */
router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Search",
        description: "Philosophy, Poetry and General Lifestyle. Elevate your mindset like never before."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          // { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/contact', (req, res) => {
  res.render('contact')
})

module.exports = router


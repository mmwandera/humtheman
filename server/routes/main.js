const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
/**
 * GET /
 * HOME
 */
router.get('', async(req, res) => {

    const locals = {
        title: 'Humtheman',
        description: 'Philosophy, Poetry and General Lifestyle. Elevate your mindset like never before.'
    }

    try{
        // Pagination
        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: {createdAt: -1}} ])
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

        // querying the total number of documents in the Posts collection
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // const data = await Post.find();
        res.render('index', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
         })
    } catch(error) {
        console.log(error)
    }

    res.render('index', { locals })
})



router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router

// function insertPostData(){
//     Post.insertMany([
//         {
//             title: "Balance From the Imbalance",
//             body: "What is the one metric that we can improve upon which will ultimately make life infinitely satisfactory?"
//         },
//         {
//             title: "Life is Not A Rehearsal",
//             body: "The title says it all, life is not a rehearsal. It plainly and simply isn't. Why do we then end up living our lives like a rehearsal?"
//         },
//         {
//             title: "The Most Important Relationship",
//             body: "The saying that you are the sum total of who you spend your time with is true. By virtue of being social and highly self aware, you can simply infer this simple conclusion by not only looking at your life but also from the experiences of others. "
//         },
//         {
//             title: "Balance From the Imbalance",
//             body: "What is the one metric that we can improve upon which will ultimately make life infinitely satisfactory?"
//         },
//         {
//             title: "New Year's Resolutions",
//             body: "When I started this blog, it was aimed at being a journal about the mind and all its capabilities. The aim was to shed light on an often neglected aspect of the human spectrum which can prove to be the difference between experiencing heaven or hell on earth."
//         },
//         {
//             title: "What Then?",
//             body: "Life man. There is no coherence, formula, or playbook that we can consult because each situation is unique. One person gets bad news and deals with it and for another, the very fabric of life is torn apart."
//         },
//         {
//             title: "The Price Of Admission",
//             body: "I have been intrigued ever since I heard the phrase “The Price of Admission” which quite literally means the cost or sacrifice that is required in order to gain access to a particular opportunity."
//         },
//         {
//             title: "Adaptability",
//             body: "Is it objectively possible to live a life without regrets? Can we go through life unscathed, no wounds or no scars from the ensuing battle?"
//         },
//         {
//             title: "Beyond Labels: The Power and Perils of Self-Identification",
//             body: "We love labels, don’t we? Being known as the guy who always delivers marquee presentations or being known as Mr reliable in our social circles tends to up our confidence in unfathomable ways."
//         },
//         {
//             title: "The Linearity Complex",
//             body: "Linearity has been the core of our existence, it has been something that has been perpetuated and reinforced over and over all through our lives. It has dictated our progress, pushing us to move linearly from one life stage to the next."
//         },
//     ])
// }

// insertPostData();
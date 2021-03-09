const router = require('express').Router();
const _ = require('lodash');
const Author = require('../models/author');
const Course = require('../models/course');

router.get('', async (req,res)=>{
    let courses = await Course.find();
    res.send(courses)
})

router.get('/:id', async (req,res)=>{
    let course = await Course.findById(req.params.id)
                                .populate('author.id')
    if(!course)
        return res.status(404).send('Course Id is not found')
    res.send(course)
})

router.post('/', async (req,res)=>{
    let author = await Author.findById(req.body.author.id);
    if(!author)
        return res.status(404).send('Author Id is not found')
    req.body.author.name=author.name
    let course = await new Course(_.pick(req.body, ['title','author','tags','price','isPublished']));
    try {
        course = await course.save();
    } catch (error) {
        return res.status(400).send("Error Store in DB : "+error.message)
    }

    res.status(201).send(course)
})

router.put('/:id', async (req,res)=>{
    let course = await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Course Id is not found')
    /* if(req.body.title)
        course.title = req.body.title */
    course = _.merge(course,req.body);
    course = await course.save();
    res.send(course)
})

router.delete('/:id', async (req,res)=>{
    let course = await Course.findByIdAndDelete(req.params.id);
    if(!course)
        return res.status(404).send('Course Id is not found')
    res.send(course)
})

module.exports = router
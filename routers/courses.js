const router = require('express').Router();
const Course = require('../models/course');

router.get('', async (req,res)=>{
    let courses = await Course.find();
    res.send(courses)
})

router.get('/:id', async (req,res)=>{
    let course = await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Course Id is not found')
    res.send(course)
})

module.exports = router
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title : {type :String, required : true},
    author: { id : {type : mongoose.Schema.Types.ObjectId, ref :'Author'}, name :String},
    tags : {type :[String], validate : { validator : function (v) { return v.length > 0} , 
                                        message: 'Course tags must have one tag at least'}},
    price : {type : Number, required : function() { return this.isPublished == true}},
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course
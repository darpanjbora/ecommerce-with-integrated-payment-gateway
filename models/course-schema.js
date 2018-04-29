var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    courseId: { type: Number, unique: true, required: true },
    courseName: String,
    coursePrice: Number,
    courseDescription: String
});

var course = module.exports = mongoose.model('course', courseSchema);

//Get courses
module.exports.getCourse = function(callback, limit) {
    course.find(callback).limit(limit);
}

//Post course
module.exports.postCourse = function(data, callback) {
    course.create(data, callback);
}
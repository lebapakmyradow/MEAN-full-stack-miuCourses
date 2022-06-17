const mongoose = require("mongoose");

const professorSchema = new mongoose.Schema({
    
    fullname: {
        type: String, 
        // required: true
    },
    email: String
});

const courseSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    code: {
        type: String, 
        required: true
    },
    description: String, 
    rate: {
        type: Number, 
        min: 1, 
        max: 5,
        default:2 
    },
    professors: [professorSchema]
    
});

//"courses" is collection name
mongoose.model(process.env.DB_COURSES_MODEL, courseSchema, "courses"); //compiling the model
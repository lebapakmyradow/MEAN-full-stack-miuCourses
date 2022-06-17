const mongoose = require("mongoose");
const Course = mongoose.model(process.env.DB_COURSES_MODEL);

//given courseId, gives list of professors that course taught by
const getAllProfessors = function (req, res) {
    console.log("GET Professors of the course with id: ", req.params.courseId);
    const courseId = req.params.courseId;
    //console.log(Course.findById(courseId).select("title"));
    Course.findById(courseId).select("professors").exec(function (err, course) {
        //console.log(course.professors);
        console.log("Found professors ", course.professors, " for course ", course);
        res.status(200).json(course.professors);
    });
};

//given courseID and profId, it returns professor's fullname and email
const getOneProf = function (req, res) {
    console.log("GET One Prof ");
    const courseId = req.params.courseId;
    const profId = req.params.profId;
    Course.findById(courseId).select("professors").exec(function (err, course) {
        console.log("Found professor ", course.professors.id(profId), " for course ", course);
        res.status(200).json(course.professors.id(profId));
    });
};

const addOneProf = function (req, res) {
    console.log("Add One Prof ");
    const courseId = req.params.courseId;
    Course.findById(courseId).select("professors").exec(function (err, course) {
        console.log("Found course ", course);
        const response = { status: 200, message: course };
        if (err) {
            console.log("Error finding the course");
            response.status = 500;
            response.message = err;
        }
        else if (!course) {
            console.log("Error finding course");
            response.status = 404;
            response.message = { "message": "Course ID not found " + courseId };
        }
        if (course) {
            _addProfessor(req, res, course);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};
//helper function to add professor to the array of professor
const _addProfessor = function (req, res, course) {
        
        course.professors.push({fullname: req.body.fullname, email: req.body.email})
       
        course.save(function (err, updatedCourse) {
            console.log("test.....");
        const response = { status: 200, message: [] };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        else {
            response.status = 201;
            response.message = updatedCourse.professors;
        }
        res.status(response.status).json(response.message);
    });

};

//deletes the professor given a courseID and profId
const deleteOneProf = function (req, res) {
    console.log("Delete One Prof ");
    const courseId = req.params.courseId;
    Course.findById(courseId).select("professors").exec(function (err, course) {
        console.log("Found course ", course);
        const response = { status: 200, message: course };
        if (err) {
            console.log("Error finding the course");
            response.status = 500;
            response.message = err;
        }
        else if (!course) {
            console.log("Error finding course");
            response.status = 404;
            response.message = { "message": "Course ID not found " + courseId };
        }
        if (course.professors.id(req.params.profId)) {
            _deleteProfessor(req, res, course);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};
//helper function for deleting one prof
const _deleteProfessor = function (req, res, course) {
        
    course.professors.remove(req.params.profId);
   
    course.save(function (err, updatedCourse) {
        console.log("test.....");
    const response = { status: 200, message: [] };
    if (err) {
        response.status = 500;
        response.message = err;
    }
    else {
        response.status = 201;
        response.message = updatedCourse.professors;
    }
    res.status(response.status).json(response.message);
});

};



module.exports = {
    getAllProfessors: getAllProfessors,
    getOneProf: getOneProf,
    addOneProf: addOneProf,
    deleteOneProf: deleteOneProf

}
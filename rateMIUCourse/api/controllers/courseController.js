const mongoose = require("mongoose");
const Course = mongoose.model(process.env.DB_COURSES_MODEL);

//searches by course title
const _runTitleQuery = function (req, res) {
    const title = req.query.search;
    const query = {
        "title": {$regex: title, $options:'i'}
    };
    Course.find(query).limit(10).exec(function (err, courses) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: courses
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

//gets all courses with given count and offset
const getAllCourses = function (req, res) {
    if (req.query && req.query.search) {
        _runTitleQuery(req, res);
        return;
    }

    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    // if (isNaN(offset) || isNaN(count)) {
    //     res.status(400).json({
    //         "message": "QueryString Offset and Count should be numbers"
    //     });
    //     return;
    // }
    if (count > maxCount) {
        res.status(400).json({
            "message": "Cannot exceed count of " + maxCount
        });
        return;
    }
    Course.find().skip(offset).limit(count).exec(function (err, courses) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: courses
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}



//gives one course according to passed courseId
const getOneCourse = function (req, res) {
    const courseId = req.params.courseId;
    Course.findById(courseId).exec(function (err, course) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: course
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!course) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
};

//adds one course with post given course details as json
const addCourse = function (req, res) {
    console.log("Add a course request");
    const newCourse = {
        title: req.body.title,
        code: req.body.code,
        description: req.body.description,
        rate: req.body.rate,
        // professors: req.body.professors,
        professors: []
    };
    Course.create(newCourse, function (err, course) {
        const response = { status: 200, message: course };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        else if(!course){
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
};

//deletes the course given courseId to delete
const deleteOneCourse = function (req, res) {
    const courseId = req.params.courseId;
    console.log("Course id", courseId);
    Course.findByIdAndDelete(courseId).exec(function (err, course) {
        const response = {
            status: parseInt(process.env.REST_API_DEL_OK, 10),
            message: course
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!course) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
};

// update starts
const _updateOne = function (req, res, updateCourseCallback) {
    console.log("Update One Course Controller");
    const courseId = req.params.courseId;
    Course.findById(courseId).exec(function (err, course) {
        const response = { status: 204, message: course };
        if (err) {
            console.log("Error finding the course");
            response.status = 500;
            response.message = err;
        }
        else if (!course) {
            console.log("Course id not found");
            response.status = 404;
            response.message = { "message": "Course ID not found" };
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        } else {
            updateCourseCallback(req, res, course, response);
        }
    });
};



const fullUpdateOne = function (req, res) {
    console.log("Full Update One Course Controller");
    courseUpdate = function (req, res, course, response) {
        if (req.body.title) {
            course.title = req.body.title;
        } 
        if (req.body.code) {
            course.code = req.body.code;
        } 
        course.description = req.body.description;
        course.rate = req.body.rate;
        course.professors = req.body.professors;

        course.save(function (err, updatedCourse) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(updatedCourse);
        });
    }
    _updateOne(req, res, courseUpdate);
};



//partial update
const partialUpdateOne = function (req, res) {
    console.log("Full Update One Course Controller");
    courseUpdate = function (req, res, course, response) {
        if (req.body.title) { course.title = req.body.title; }
        if (req.body.code) { course.code = req.body.code; }
        if (req.body.description) { course.price = req.body.description; }
        if (req.body.rate) { course.rate = req.body.rate; }
        if (req.body.professors) { course.professors = req.body.professors; }

        
        course.save(function (err, updatedCourse) {
            if (err) {
                response.status = 500;
                response.message = err;
            }
            res.status(response.status).json(updatedCourse);
        });
    }
    _updateOne(req, res, courseUpdate);
};



module.exports = {
    getAllCourses: getAllCourses,
    getOneCourse: getOneCourse,
    addCourse: addCourse,
    deleteOneCourse: deleteOneCourse,
    fullUpdateOne: fullUpdateOne,
    partialUpdateOne: partialUpdateOne

}
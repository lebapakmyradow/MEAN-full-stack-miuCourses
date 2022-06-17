const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const profController = require("../controllers/professorContoller");

router.route("/:courseId/professors")
    .get(profController.getAllProfessors)
    .post(profController.addOneProf);

router.route("/:courseId/professors/:profId")
    .get(profController.getOneProf)
    .delete(profController.deleteOneProf);

router.route("/:courseId")
    .get(courseController.getOneCourse)
    .delete(courseController.deleteOneCourse)
    .put(courseController.fullUpdateOne) 
    .patch(courseController.partialUpdateOne);


router.route("/")
    .get(courseController.getAllCourses)
    .post(courseController.addCourse);



module.exports = router;
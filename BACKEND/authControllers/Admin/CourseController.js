const express = require('express');
const { ValidateCourse } = require('../../middlewares/Admin/validateCourse');
const Courses = require('../../modules/CourseModuels/Courses');

exports.CreateCourse = async( req, res ) => {
    try {
        

        const {courseType,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description } = req.body;
       

        const { error } = ValidateCourse.validate( {courseType, department, level, courseTitle, courseCode,   semester, description} );
        if(error) {
        return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const existingCourse = await Courses.findOne({ courseCode });

        if(existingCourse) {
            return res.status(409).json({ success: false, message: "Course already exists with this code" })
        }

        const newCourse = new Courses({
            courseType,
            department, 
            level,
            courseCode,
            courseTitle,
            description,
            semester
        })

        await newCourse.save()
        res.status(201).json({ success: true, message: `New Course Created Successfuly, course: ${newCourse}`   })
    } catch (error) {
        console.log(error)
    }
    

}
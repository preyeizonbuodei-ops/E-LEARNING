
const { ValidateCourse } = require('../../middlewares/Admin/validateCourse');
const Courses = require('../../modules/CourseModuels/Courses');

// Create Course
exports.CreateCourse = async (req, res) => {
    try {
        const {
            courseType,
            courseScope,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description
        } = req.body;

        const { error } = ValidateCourse.validate({
            courseType,
            courseScope,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        let existingCourse;

        if (courseScope === "shared") {
            existingCourse = await Courses.findOne({
                courseCode,
                courseScope: "shared",
                level,
                semester
            });
        } else {
            existingCourse = await Courses.findOne({
                courseCode,
                courseScope: "department",
                department
            });
        }

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists"
            });
        }

        const newCourse = new Courses({
            courseType,
            courseScope,
            department: courseScope === "department" ? department : undefined,
            level,
            courseCode,
            courseTitle,
            description,
            semester
        });

        await newCourse.save();

        return res.status(201).json({
            success: true,
            message: "New Course Created Successfully",
            course: newCourse
        });

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Course already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while creating course"
        });
    }
};


// Get All Courses
exports.GetCourses = async (req, res) => {
    try {
        const courses = await Courses.find().sort({
            courseTitle: 1
        });

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching courses"
        });
    }
};


// Update Course
exports.UpdateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const existingCourse = await Courses.findById(courseId);

        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const {
            courseType,
            courseScope,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description
        } = req.body;

        const updatedData = {
            courseType: courseType ?? existingCourse.courseType,
            courseScope: courseScope ?? existingCourse.courseScope,
            department: department ?? existingCourse.department,
            level: level ?? existingCourse.level,
            courseTitle: courseTitle ?? existingCourse.courseTitle,
            courseCode: courseCode ?? existingCourse.courseCode,
            semester: semester ?? existingCourse.semester,
            description: description ?? existingCourse.description
        };

        // Remove fields that do not apply to the selected course type/scope.
        if (updatedData.courseType === "general") {
            updatedData.courseScope = undefined;
            updatedData.department = undefined;
            updatedData.level = undefined;
            updatedData.semester = undefined;
        } else if (updatedData.courseScope === "shared") {
            updatedData.department = undefined;
        }

        const { error, value } = ValidateCourse.validate(updatedData);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        let duplicateQuery;

        if (updatedData.courseScope === "shared") {
            duplicateQuery = {
                courseCode: updatedData.courseCode,
                courseScope: "shared",
                level: updatedData.level,
                semester: updatedData.semester
            };
        } else if (updatedData.courseScope === "department") {
            duplicateQuery = {
                courseCode: updatedData.courseCode,
                courseScope: "department",
                department: updatedData.department
            };
        } else {
            duplicateQuery = null;
        }

        if (duplicateQuery) {
            const duplicateCourse = await Courses.findOne({
                ...duplicateQuery,
                _id: { $ne: courseId }
            });

            if (duplicateCourse) {
                return res.status(409).json({
                    success: false,
                    message: "Course already exists"
                });
            }
        }

        existingCourse.set(value);

        await existingCourse.save();

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: existingCourse
        });

    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A course with this code already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while updating course"
        });
    }
};


// Delete Course
exports.DeleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const deletedCourse = await Courses.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            course: deletedCourse
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error while deleting course"
        });
    }
};

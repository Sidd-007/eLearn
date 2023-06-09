import User from "../models/user";
import Course from "../models/course";


export const makeInstructor = async (req, res) => {
    
}

export const currentAdmin = async (req, res) => {

}
export const allInstructors = async (req, res) => {

    try {
        const instructors = await User.find({ role: "Instructor" }).sort({createdAt: -1}).exec();

        res.json(instructors);
    } catch (error) {
        console.log(error)
    }
}

export const instructorApplication = async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
}
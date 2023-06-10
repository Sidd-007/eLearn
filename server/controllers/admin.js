import User from "../models/user";
import InstructorApplication from "../models/instructorapplication"

export const makeInstructor = async (req, res) => {

}

export const currentAdmin = async (req, res) => {

}
export const allInstructors = async (req, res) => {
    try {
        const instructors = await User.find({
            $or: [{ role: 'Instructor' }, { role: 'Pending Verification' }],
        }).sort({ createdAt: -1 }).exec();

        res.json(instructors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


export const instructorApplication = async (req, res) => {
    try {
        const { userId } = req.params;
        const { questions, resume } = req.body.formData;
        // console.log(req.body)
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new instructor application document
        const application = new InstructorApplication({
            user: user._id,
            questions,
            resume,
        });

        await application.save();

        // Update the user's role to "Pending Verification"
        user.role = 'Pending Verification';
        await user.save();

        console.log(user)

        res.json({ message: 'Instructor application submitted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const instructorApp = async (req, res) => {
    try {
        const { instructorId } = req.params;

        // Find the instructor's application by instructorId
        const application = await InstructorApplication.findOne({
            user: instructorId,
        }).populate('user');

        res.json(application);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};
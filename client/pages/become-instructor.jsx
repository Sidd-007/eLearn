import React, { useState } from "react";
import axios from "axios";
import { Raleway } from '@next/font/google'
import { toast } from "react-hot-toast";
const raleway = Raleway({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

const BecomeInstructor = () => {
    const [formData, setFormData] = useState({
        questions: ["", "", "", "", ""],
        resume: "" // Initialize the resume field as an empty string
    });

    const handleChange = (e, index) => {

        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = e.target.value;
        setFormData({ ...formData, questions: updatedQuestions });
    };

    const handleResumeChange = (e) => {
        setFormData({ ...formData, resume: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newData = new FormData();
            formData.questions.forEach((question, index) => {
                newData.append(`question${index + 1}`, question);
            });
            newData.append('resume', formData.resume); // Append the resume URL
            console.log(formData);

            // setLoading(true);
            const { data } = await axios.post(`/api/admin/instructor-application`, {
                formData,
            });
            router.push("/");
            toast.success("Hurray!!");
            // setLoading(false);
        } catch (error) {
            toast.error(error.message); // Pass the error message instead of the error object
            // setLoading(false);
        }
    };

    return (
        <>
            <div className={raleway.className}>
                <div className="mt-8 xl:p-1 p-8 mb-12 flex items-center justify-center ">
                    <form onSubmit={handleSubmit} className="xl:w-1/2 w-11/12   shadow-2xl  rounded-lg items-center">
                        <div className="px-12 pb-10">
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>
                                        1. What motivated you to become an instructor at eLearn?
                                    </span>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.questions[0]}
                                        onChange={(e) => handleChange(e, 0)}
                                        class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Your Response..." 
                                    />
                                </div>
                            </div>
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>
                                        2. Have you ever encountered any challenges or difficult situations while teaching? How did you handle them?
                                    </span>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.questions[1]}
                                        onChange={(e) => handleChange(e, 1)}
                                        class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Your Response..." />
                                </div>
                            </div>
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>
                                        3. Can you provide examples of positive feedback or success stories from your previous teaching experiences?
                                    </span>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.questions[2]}
                                        onChange={(e) => handleChange(e, 2)}
                                        class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Your Response..." />
                                </div>
                            </div>
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>
                                        4. How would you manage your time and prioritize tasks to ensure timely updates and improvements to your courses?
                                    </span>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.questions[3]}
                                        onChange={(e) => handleChange(e, 3)}
                                        class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Your Response..." />
                                </div>
                            </div>
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>
                                        5. Are you open to feedback from students, and how would you incorporate their feedback to improve your teaching approach?
                                    </span>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        value={formData.questions[4]}
                                        onChange={(e) => handleChange(e, 4)}
                                        class="resize-none mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none" placeholder="Your Response..." />
                                </div>
                            </div>
                            <div className="w-full mb-2 mt-10">
                                <div className="flex flex-col justify-center">
                                    <span>6. Please provide a link to your resume:</span>
                                    <input
                                        type="text"
                                        name="resume"
                                        value={formData.resume}
                                        onChange={handleResumeChange}
                                        className="mt-2 block p-2.5 w-full text-sm bg-gray-50 placeholder:text-gray-700 border-[2px] focus:ring-[#4540E1] focus:border-[#4540E1] rounded py-2 text-gray-700 focus:outline-none"
                                        placeholder="Resume URL"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="w-1/2  mt-6 py-2 rounded bg-[#4540e1da] hover:bg-[#4540E1] transition-all ease-in-out duration-200 text-gray-100 focus:outline-none cursor-pointer">
                                    Submit Application
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BecomeInstructor;

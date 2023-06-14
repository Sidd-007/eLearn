import AWS from 'aws-sdk'
import User from "../models/user";
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import Course from '../models/course'
import Payment from '../models/payment'
import { readFileSync } from 'fs'
import { instance } from "../server.js";
import crypto from 'crypto';


const awsConfig = {
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
}

const S3 = new AWS.S3(awsConfig)

export const uploadImage = async (req, res) => {
    // console.log(req.body)

    try {

        const { image } = req.body

        if (!image) return res.status(400).send("No Image")

        const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");

        const type = image.split(';')[0].split('/')[1]

        const params = {
            Bucket: "elearn-image-bucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        }

        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }

            // console.log(data)
            res.send(data);
        })


    } catch (error) {
        console.log(error)
    }
}

export const removeImage = async (req, res) => {
    try {
        const { image } = req.body;

        const params = {
            Bucket: image.Bucket,
            Key: image.Key,
        }

        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }
            res.send({ ok: true });
        })

    } catch (error) {
        console.log(error)
    }
}


export const createCourse = async (req, res) => {
    // console.log("Create Course", req.body);
    try {
        const alreadyExist = await Course.findOne({
            name: req.body.name
        })
        if (alreadyExist) return res.status(400).send("Title is Already Taken, Try Again")

        const course = await new Course({
            slug: slugify(req.body.name),
            instructor: req.auth._id,
            ...req.body,
        }).save();

        res.json(course);
    } catch (error) {
        console.log(error)
        // return res.status(400).send('Failed to Create Course, Try Again.')
    }
}

export const getSingleCourse = async (req, res) => {
    try {

        const course = await Course.findOne({ slug: req.params.slug }).populate('instructor', "_id name").exec();

        res.json(course)
    } catch (error) {
        console.log(error)
        return res.status(400).send('Failed to Fetch the Course, Try Again.')
    }
}

export const uploadVideo = async (req, res) => {
    try {

        // console.log('user id', req.auth._id)
        // console.log("instructor id",req.params.instructorId)

        if (req.auth._id !== req.params.instructorId) {
            return res.status(400).send("Unauthorized User")
        }

        const { video } = req.files;
        // console.log(video)

        if (!video) return res.status(400).send("No video");

        const params = {
            Bucket: "elearn-image-bucket",
            Key: `${nanoid()}.${video.type.split("/")[1]}`,
            Body: readFileSync(video.path),
            ACL: 'public-read',
            ContentType: video.type,
        }

        S3.upload(params, (err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }

            console.log(data)
            res.send(data);
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send('Failed to Fetch the Video, Try Again.')
    }
}

export const removeVideo = async (req, res) => {
    try {

        if (req.auth._id !== req.params.instructorId) {
            return res.status(400).send("Unauthorized User")
        }
        const { Bucket, Key } = req.body;

        const params = {
            Bucket,
            Key,
        }

        S3.deleteObject(params, (err, data) => {
            if (err) {
                console.log(err)
                return res.sendStatus(400)
            }

            console.log(data)
            res.send({ ok: true });
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send('Failed to Remove the Video, Try Again.')
    }
}

export const addLesson = async (req, res) => {
    try {

        const { slug, instructorId } = req.params;

        const { title, content, video } = req.body;

        // if (req.auth._id !== instructorId) {
        //     return re.status(400).send("Unauthorized User")
        // }

        const updated = await Course.findOneAndUpdate(
            { slug },
            {
                $push: { lessons: { title, content, video, slug: slugify(title) } }
            },
            { new: true }
        ).populate('instructor', "_id name").exec()

        res.json(updated)

    } catch (error) {
        console.log(error)
        return res.status(400).send('Failed to Add the Lesson, Try Again.')
    }
}

export const updateCourse = async (req, res) => {
    try {

        const { slug } = req.params;

        const course = await Course.findOne({ slug }).exec();

        // console.log(course)
        // if (req.auth._id !== course.instructor) {
        //     return res.status(400).send("Unauthorized User")
        // }

        const updated = await Course.findOneAndUpdate({ slug }, req.body, {
            new: true,
        }).exec();

        res.json(updated);

    } catch (error) {
        console.log(error)
        return res.status(400).send('Failed to Update Course, Try Again.')
    }
}




// export const updateLesson = async (req, res) => {
//     try {


//         const { slug, lessonId } = req.params;
//         const { title, content, video, free_preview } = req.body;
//         // find post
//         const course = await Course.findOne({ slug }).exec();



//         // console.log(course)
//         // if (req.auth._id !== course.instructor) {
//         //     return res.status(400).send("Unauthorized User")
//         // }

//         console.log(slug)

//         // res.json({ ok: true });

//     } catch (error) {
//         console.log(error)
//         return res.status(400).send('Failed to Update Course, Try Again.')
//     }
// }

export const updateLesson = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const { title, content, video, free_preview } = req.body;
        // find post
        const courseFound = await Course.findById(courseId)
            .select("instructor")
            .exec();
        // is owner?
        // if (req.auth._id != courseFound.instructor._id) {
        //     return res.status(400).send("Unauthorized");
        // }

        const updated = await Course.updateOne(
            { "lessons._id": lessonId },
            {
                $set: {
                    "lessons.$.title": title,
                    "lessons.$.content": content,
                    "lessons.$.video": video,
                    "lessons.$.free_preview": free_preview,
                },
            }
        ).exec();
        console.log("updated => ", updated);
        res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Update lesson failed");
    }
};


export const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        // find post
        const courseFound = await Course.findById(courseId)
            .select("instructor")
            .exec();
        // is owner?
        // if (req.user._id != courseFound.instructor._id) {
        //     return res.status(400).send("Unauthorized");
        // }
        let course = await Course.findByIdAndUpdate(
            courseId,
            { published: true },
            { new: true }
        ).exec();
        console.log("course published", course);
        return;
        res.json(course);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Publish course failed");
    }
};

export const unpublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        // find post
        const courseFound = await Course.findById(courseId)
            .select("instructor")
            .exec()
        // is owner?
        if (req.user._id != courseFound.instructor._id) {
            return res.status(400).send("Unauthorized");
        }

        let course = await Course.findByIdAndUpdate(
            courseId,
            { published: false },
            { new: true }
        ).exec();
        // console.log("course unpublished", course);
        // return;
        res.json(course);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Unpublish course failed");
    }
};

export const courses = async (req, res) => {
    // console.log("all courses");
    const all = await Course.find({ published: true }).populate("instructor", "_id name").exec();
    // console.log("============> ", all);
    res.json(all);
};


export const checkEnrollment = async (req, res) => {
    const { courseId } = req.params;
    // find courses of the currently logged in user
    const user = await User.findById(req.auth._id).exec();
    // check if course id is found in user courses array
    let ids = [];
    let length = user.courses && user.courses.length
    for (let i = 0; i < length; i++) {
        ids.push(user.courses[i].toString());
    }
    res.json({
        status: ids.includes(courseId),
        course: await Course.findById(courseId).exec(),
    });
};


export const freeEnrollment = async (req, res) => {
    try {
        // check if course is free or paid
        const course = await Course.findById(req.params.courseId).exec();
        if (course.paid) return;

        const result = await User.findByIdAndUpdate(
            req.auth._id,
            {
                $addToSet: { courses: course._id },
            },
            { new: true }
        ).exec();
        console.log(result);
        res.json({
            message: "Congratulations! You have successfully enrolled",
            course,
        });
    } catch (err) {
        console.log("free enrollment err", err);
        return res.status(400).send("Enrollment create failed");
    }
};

export const paidEnrollment = async (req, res) => {

    try {
        const course = await Course.findById(req.params.courseId).exec();

        const totalAmount = course.price;

        const options = {
            amount: Number(totalAmount) * 100,
            currency: "INR"
        }

        const order = await instance.orders.create(options);

        return res.status(201).json({
            order,
            course,
        });
    } catch (error) {
        console.log(error)
    }
};

export const paymentVerification = async (req, res) => {

    try {
        const courseId = req.params.courseId;

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, course, userId } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body).digest("hex");

        if (expectedSignature === razorpay_signature) {

            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                courseId,
                userId
            });

            const result = await User.findByIdAndUpdate(
                req.auth._id,
                {
                    $addToSet: { courses: course._id },
                },
                { new: true }
            ).exec();
            console.log(result);

            res.status(201).json({
                message: `Congratulations! You have successfully enrolled. Payment ID: ${payment._id}`,
            });
        }
        else {
            res.status(400).json({ error: "Payment Verification Failed!" });
        }
    } catch (error) {
        console.log(error)
    }
};

export const userCourses = async (req, res) => {
    try {
        // check if course is free or paid
        const user = await User.findById(req.auth._id).exec();

        const courses = await Course.find({ _id: { $in: user.courses } }).populate("instructor", "_id name").exec();

        res.json(courses);
    } catch (err) {
        console.log("Failed to get user courses", err);
        return res.status(400).send("EFailed to get user courses");
    }
}
export const reviewCourse = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, courseFeedback, instructorFeedback, rating } = req.body;

        // Find the user by userId
        const user = await User.findById(req.auth._id).exec();
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Find the course by slug
        const course = await Course.findOne({ slug });
        if (!course) {
            return res.status(404).send("Course not found");
        }

        // Create a review object
        const userReview = {
            course: course._id,
            title,
            rating,
            courseFeedback: courseFeedback,
            instructorFeedback: instructorFeedback,
        };
        const courseReview = {
            user: req.auth._id,
            title,
            rating,
            courseFeedback: courseFeedback,
            instructorFeedback: instructorFeedback,
        };

        // Update the reviews array for the user
        user.reviews.push(userReview);
        await user.save();

        // Update the reviews array for the course
        course.reviews.push(courseReview);
        await course.save();

        // Return the updated user and course
        res.json({ user, course });
    } catch (err) {
        console.log("Failed to update reviews", err);
        return res.status(400).send("Failed to update reviews");
    }
};

export const reviewCheck = async (req, res) => {
    try {
        const { slug } = req.params;
        const user = await User.findById(req.auth._id).exec();
        const course = await Course.findOne({ slug });


        const reviewExists = user.reviews.some((review) =>
            review.course.equals(course._id)
        );

        // Return the result
        res.json({ hasPostedReview: reviewExists });
    } catch (err) {
        console.log("Failed to update reviews", err);
        return res.status(400).send("Failed to update reviews");
    }
};


export const reviews = async (req, res) => {
    try {

        const allCourses = await Course.find({ published: true }).exec();

        let allReviews = [];

        for (const course of allCourses) {
            for (const review of course.reviews) {
                const user = await User.findById(review.user).exec();
                const reviewWithUser = {
                    ...review._doc,
                    user: user // Replace "user" field with the user object
                };
                allReviews.push(reviewWithUser);
            }
        }

        res.status(200).json(allReviews);

    } catch (error) {
        console.log("Failed to fetch reviews", error);
    }
}
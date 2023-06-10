import AWS from 'aws-sdk'
import User from "../models/user";
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import Course from '../models/course'
import { readFileSync } from 'fs'
import { instance } from "../server.js";


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
    const all = await Course.find({ published: true })
        .limit(3)
        // .select("-lessons")
        .populate("instructor", "_id name")
        .exec();
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
    
};



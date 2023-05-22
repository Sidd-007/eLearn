import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import slugify from 'slugify'
import Course from '../models/course'

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
        return res.status(400).send('Failed to Create Course, Try Again.')
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
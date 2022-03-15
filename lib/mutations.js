
const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    createCourse: async (root, { input }) => {
        const defaults = {
            teacher:'',
            topic:''
        }
        const newCourse = Object.assign(defaults, input)

        let db
        let course
        try {
            db = await connectDB()
            course = await db.db('test').collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId
        } catch (error) {
            console.log(error.message)
        }
        return newCourse
    },
    editCourse: async (root, { id, input }) => {
        let db
        let course
        try {
            db = await connectDB()
            course = await db.db('test').collection('courses').findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: input },
                { new: true, returnOriginal: false }
            )
        } catch (error) {
            console.log(error.message)
        }
        return course.value
    },
    createStudent: async (root, { input }) => {

        const newStudent = Object.assign(input)

        let db
        let student
        try {
            db = await connectDB()
            student = await db.db('test').collection('students').insertOne(input)
            newStudent._id = student.insertedId
        } catch (error) {
            console.log(error.message)
        }
        return newStudent
    },
    editStudent: async (root, { id, input }) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.db('test').collection('students').findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: input },
                { new: true, returnOriginal: false }
            )
        } catch (error) {
            console.log(error.message)
        }
        return student.value
    },
}
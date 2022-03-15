
const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    getCourses: async () => {
        let db
        let courses = []
        try {
            db = await connectDB()
            courses = await db.db('test').collection('courses').find().toArray()
        } catch (error) {
            console.log(error.message)
        }
        return courses
    },
    getCourse: async (root, {id}) => {
        let db
        let course
        try {
            db = await connectDB()
            course = await db.db('test').collection('courses').findOne({_id:ObjectId(id)})
        } catch (error) {
            console.log(error.message)
        }
        return course
    },
    getPeople: async () => {
        let db
        let students = []
        try {
            db = await connectDB()
            students = await db.db('test').collection('students').find().toArray()
        } catch (error) {
            console.log(error.message)
        }
        return students
    },
    getPerson: async (root, { id }) => {
        let db
        let student
        try {
            db = await connectDB()
            student = await db.db('test').collection('students').findOne({ _id: ObjectId(id) })
        } catch (error) {
            console.log(error.message)
        }
        return student
    }
}
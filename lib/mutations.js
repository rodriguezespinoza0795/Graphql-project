
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
    createPerson: async (root, { input }) => {

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
    editPerson: async (root, { id, input }) => {
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
    addPerson: async (root, { courseID, studentID }) => {
        let db
        let student
        let course
        try {
            db = await connectDB()

            course = await db.db('test').collection('courses').findOne({ _id: ObjectId(courseID) })
            student = await db.db('test').collection('students').findOne({ _id: ObjectId(studentID) })

            if (!course || !student) {
                throw new Error('No existe el curso o el estudiante')
            }

            await db.db('test').collection('courses').findOneAndUpdate(
                { _id: ObjectId(courseID) },
                { $push: { people: ObjectId(studentID) } },
                { new: true, returnOriginal: false })

        } catch (error) {
            console.log(error.message)
        }
        return course
    }
}
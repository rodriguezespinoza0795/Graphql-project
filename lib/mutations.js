
const connectDB = require('./db')

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
            course = await db.db('test').collection('courses').insertOne(input)
            newCourse._id = course.insertedId
        } catch (error) {
            console.log(error.message)
        }
        return newCourse
    }
}
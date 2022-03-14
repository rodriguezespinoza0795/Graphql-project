const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    Query: {
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
        }
    }
}
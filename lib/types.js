const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    Course: {
        people: async ({ people }) => {
            let db
            let peopleData
            let ids

            try {
                db = await connectDB()
                ids = people ? people.map(id => ObjectId(id)) : [];
                peopleData = ids.length > 0
                    ? await db.db('test').collection('students').find(
                        { _id: { $in: ids } }
                    ).toArray()
                    : []
            } catch (error) {
                console.log(error.message)
            }
            return peopleData
        }
    },
    Person: {
        __resolveType: (person, context, info) => {
            if (person.phone) {
                return 'Monitor'
            }

            return 'Student'
        }
    }
}
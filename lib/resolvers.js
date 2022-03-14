
const courses = [
    {  
        _id: '1',
        title: 'mi Título',
        teacher: 'mi profesor',
        decription: 'una descripción',
        topic: 'programación'
    },
    {  
        _id: '2',
        title: 'mi Título 2',
        teacher: 'mi profesor',
        decription: 'una descripción',
        topic: 'programación'
    },
    {  
        _id: '3',
        title: 'mi Título 3',
        teacher: 'mi profesor',
        decription: 'una descripción',
        topic: 'programación'
    }
]

module.exports = {
    getCourses: () => {
        return courses
    }
}
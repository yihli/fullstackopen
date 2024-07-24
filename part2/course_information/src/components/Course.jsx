const Course = ({ courses }) => {

const calculateTotal = (course) => course.parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <div>
        {courses.map( course => 
            <div key={course.id}>
            <h1>{course.name}</h1>
            <div>
                {course.parts.map( part =>
                <p key={part.id}>{part.name} {part.exercises}</p>
                )}
            </div>
            <p><strong>total of {calculateTotal(course)} exercises</strong></p>
            </div>
        )}
        </div>
    )
}

export default Course
  
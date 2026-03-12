function StudentTable({ students, setEditingStudent, deleteStudent }) {

  if (students.length === 0) {
    return <p>No students available</p>;
  }

  return (

    <table className="table">

      <thead>

        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {students.map((student) => (

          <tr key={student.id}>

            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.age}</td>

            <td>

              <button
                className="editBtn"
                onClick={() => setEditingStudent(student)}
              >
                Edit
              </button>

              <button
                className="deleteBtn"
                onClick={() => deleteStudent(student.id)}
              >
                Delete
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>
  );
}

export default StudentTable;
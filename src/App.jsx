import { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import { exportToExcel } from "./utils/exportExcel";

function App() {

  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading from localStorage or fallback
    const timer = setTimeout(() => {
      const savedStudents = localStorage.getItem("students");
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      } else {
        const initialData = [
          { id: 1, name: "Adil Khan", email: "adil@gmail.com", age: 22 },
          { id: 2, name: "Rahul Sharma", email: "rahul@gmail.com", age: 21 }
        ];
        setStudents(initialData);
        localStorage.setItem("students", JSON.stringify(initialData));
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);

  const addStudent = (student) => {

    const newStudent = {
      ...student,
      id: Date.now()
    };

    setStudents([...students, newStudent]);
  };

  const updateStudent = (student) => {

    const updated = students.map((s) =>
      s.id === student.id ? student : s
    );

    setStudents(updated);
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {

    const confirmDelete = window.confirm("Delete this student?");

    if (confirmDelete) {
      const filtered = students.filter((s) => s.id !== id);
      setStudents(filtered);
    }

  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Students...</h2>;
  }

  return (

    <div className="container">

      <h1>Students Manager</h1>

      <StudentForm
        addStudent={addStudent}
        updateStudent={updateStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />

      <button
        className="excelBtn"
        onClick={() => exportToExcel(students)}
      >
        Download Excel
      </button>

      <StudentTable
        students={students}
        setEditingStudent={setEditingStudent}
        deleteStudent={deleteStudent}
      />

    </div>
  );
}

export default App;
import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {

    if (editingStudent) {
      setFormData(editingStudent);
    }

  }, [editingStudent]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {

    if (!formData.name || !formData.email || !formData.age) {
      alert("All fields are required");
      return false;
    }

    const emailPattern = /\S+@\S+\.\S+/;

    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }

    setFormData({
      name: "",
      email: "",
      age: ""
    });

  };

  return (

    <form className="form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

    </form>
  );
}

export default StudentForm;
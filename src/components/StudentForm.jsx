import { useState, useEffect } from "react";

function StudentForm({ addStudent, updateStudent, editingStudent, setEditingStudent }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData({
        name: "",
        email: "",
        age: ""
      });
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
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const ageVal = formData.age;

    if (!nameTrimmed || !emailTrimmed || ageVal === "") {
      alert("All fields are required");
      return false;
    }

    const parsedAge = parseInt(ageVal, 10);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
      alert("Please enter a valid age between 1 and 120");
      return false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(emailTrimmed)) {
      alert("Invalid email format");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const finalData = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: parseInt(formData.age, 10)
    };

    if (editingStudent) {
      updateStudent(finalData);
    } else {
      addStudent(finalData);
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

      {editingStudent && (
        <button
          type="button"
          className="cancelBtn"
          onClick={() => setEditingStudent(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default StudentForm;
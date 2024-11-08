import React, { useState } from "react";

const EmployeeForm = ({ onAdd, onUpdate }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUpdateMode) {
      onUpdate(id, name); 
    } else {
      onAdd(id, name); 
    }

    
    setId("");
    setName("");
    setIsUpdateMode(false);
  };

  return (
    <div style={{textAlign:"center"}}>
      <h2>{isUpdateMode ? "Update Employee" : "Add New Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">{isUpdateMode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default EmployeeForm;

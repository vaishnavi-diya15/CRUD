import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState(""); 

  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/show");
      console.log(response);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setMessage("Error fetching employees.");
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.get(`http://localhost:8080/delete?id=${id}`);
      setMessage("Employee deleted successfully!");
      fetchEmployees();  
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage("Error deleting employee.");
    }
  };

  
  const handleAddEmployee = async (id, name) => {
    try {
      const response = await axios.get(`http://localhost:8080/insert?id=${id}&name=${name}`);
      const backendMessage = response.data;
      setMessage(backendMessage);
      if (response.status === 200) {
        fetchEmployees(); 
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setMessage("Error adding employee.");
    }
  };

  
  const handleUpdateEmployee = async (id, name) => {
    try {
      await axios.get(`http://localhost:8080/update?id=${id}&name=${name}`);
      setMessage("Employee updated successfully!");
      fetchEmployees();  
    } catch (error) {
      console.error("Error updating employee:", error);
      setMessage("Error updating employee.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <h1 className="Header">Employee CRUD App</h1>
      <p className="Para">{message}</p>

      <EmployeeForm 
        onAdd={handleAddEmployee} 
        onUpdate={handleUpdateEmployee} 
      />

      <h2 className="Header">Employee List</h2>
      <table border="1" className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
                <button onClick={() => handleUpdateEmployee(employee.id, prompt("Enter new name:"))}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

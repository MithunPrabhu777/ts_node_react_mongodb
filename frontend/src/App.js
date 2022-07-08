import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import axios from "axios"

const App = () => {
  // const [contacts, setContacts] = useState(data);
  const [employeeData,setEmplooyeData] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
    doj: "",
  });

  const [editFormData, setEditFormData] = useState({

    name: "",
    email: "",
    phone: "",
    salary: "",
    doj: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    ListEmployees();
  },[]);

  async function  ListEmployees(){
    const data = await axios.get("http://localhost:3000/employee");
    setEmplooyeData(data.data.employee);
  }

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const   handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newEmployee = {
      name: addFormData.name,
      email: addFormData.email,
      phone: addFormData.phone,
      salary: addFormData.salary,
      doj: addFormData.doj,
    };

    axios.post("http://localhost:3000/employee",newEmployee).then((res) => {
        if(res.status === 201){
          const newEmployees = [...employeeData, newEmployee];
          setEmplooyeData(newEmployees);

        }
    }).catch((er) => {
        return er;
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      phone: editFormData.phone,
      email:editFormData.email,
      salary: editFormData.salary,
      doj: editFormData.doj,
    };

    const newContacts = [...employeeData];

    const index = employeeData.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setEmplooyeData(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact._id);

    const formValues = {
      _id : contact._id,
       name: contact.name,
       email:contact.email,
      phone: contact.phone,
      salary: contact.salary,
      doj: contact.doj,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...employeeData];
    axios.delete(`http://localhost:3000/employee/${contactId}`);
    const index = employeeData.findIndex((contact) => contact._id === contactId);

    newContacts.splice(index, 1);

    setEmplooyeData(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Salary</th>
              <th>DOJ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((contact) => (
              <Fragment>
                {editContactId === contact._id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Employee</h2>
      <form onSubmit={handleAddFormSubmit} className="formi">
        <input
          type="text"
          name="name"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter email..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phone"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="salary"
          name="salary"
          required="required"
          placeholder="Enter salary..."
          onChange={handleAddFormChange}
        />
         <input
          type="doj"
          name="doj"
          required="required"
          placeholder="Enter date of joining..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;

import React from "react";
import axios from "axios";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {

  const handleUpdate = () => {
     axios.put(`http://localhost:3000/employee/${editFormData._id}`,editFormData).then(() => {
      window.location.reload()
     })
     
  }


  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder="Enter email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phone"
          value={editFormData.phone}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter salary..."
          name="salary"
          value={editFormData.salary}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter date of joining..."
          name="doj"
          value={editFormData.doj}
          onChange={handleEditFormChange}
        ></input>
      </td>
      
      <td>
        <button type="submit" onClick={handleUpdate}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;

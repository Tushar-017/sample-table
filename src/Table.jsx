import axios from "axios"
import React, { useEffect, useState } from "react"

function Table() {
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users`)
        // console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = data[data.length - 1].id + 1
    try {
      const response = await axios.post(`http://localhost:3000/users`, {
        id,
        name: formData.name,
        phone: formData.phone,
      })
      location.reload()
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleEdit = (id) => {
    setEditId(id)
  }
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${editId}`,
        {
          id: editId,
          name: formData.name,
          phone: formData.phone,
        }
      )
      console.log(response)
      location.reload()
      setEditId(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Enter Phone"
            name="phone"
            onChange={handleInputChange}
          />
          <button>Add</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) =>
            user.id === editId ? (
              <tr key={index}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    value={user.name}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="phone"
                    onChange={handleInputChange}
                    value={user.phone}
                  />
                </td>
                <td>
                  <button onClick={handleUpdate}>Update</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)}>edit</button>
                  <button>delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table

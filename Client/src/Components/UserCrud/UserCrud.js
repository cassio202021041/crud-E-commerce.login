import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import "../Styles/UserCrud.css";

function UserCrud() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    Axios.get("http://localhost:3001/usuarios")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/usuarios/${id}`)
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleAdd = (values) => {
    Axios.post("http://localhost:3001/register", values)
      .then((response) => {
        fetchUsers();
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  const handleUpdate = (values) => {
    Axios.put(`http://localhost:3001/usuarios/${editingUser.id}`, values)
      .then((response) => {
        fetchUsers();
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  });

  return (
    <div className="user-crud">
      <h1>CRUD de Usuários</h1>
      <Formik
        initialValues={editingUser || { email: "", password: "" }}
        enableReinitialize
        onSubmit={editingUser ? handleUpdate : handleAdd}
        validationSchema={validationSchema}
      >
        <Form className="form">
          <div className="form-group">
            <label>Email</label>
            <Field name="email" type="email" className="form-field" />
            <ErrorMessage name="email" component="span" className="form-error" />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <Field name="password" type="password" className="form-field" />
            <ErrorMessage name="password" component="span" className="form-error" />
          </div>
          <button type="submit" className="submit-button">
            {editingUser ? "Atualizar" : "Adicionar"}
          </button>
        </Form>
      </Formik>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCrud;

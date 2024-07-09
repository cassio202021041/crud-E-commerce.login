import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

import Login from "../Pages/Login"
import Cadastro from "../Pages/Cadastro";
import Crud from '../Pages/Crud'
import Users from "../Pages/Users";
import UserCrud from './components/UserCrud';


const logado = localStorage.getItem('@user');


const Rotas = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>                    
                    {!logado && <Route path="/" element={<Login logado={logado} />} />}
                    {logado && <Route path="/" exact element={<Crud/>} />}
                    {!logado && <Route path="/cadastro" element={<Cadastro logado={logado} />} />}
                    {!logado && <Route path="/usuarios" element={<Users logado={logado} />} />}
                    {!logado && <Route path="/user-crud" element={<UserCrud logado={logado} />} />}
                </Routes>
            </BrowserRouter>
        </div>

    );
};



export default Rotas;
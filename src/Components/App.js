import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Planos from "./Planos";
import PlanoEscolhido from "./PlanoEscolhido";
import Home from "./Home";
import { UserProv } from "../Context/UserContext";


export default function App() {
    return (
        <>
        <UserProv>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Login />} />
                    <Route path="/sign-up" element = {<Cadastro />}/>
                    <Route path="/subscriptions" element = {<Planos />} />
                    <Route path="/subscriptions/:ID_DO_PLANO" element = {<PlanoEscolhido />} />
                    <Route path="/home" element = {<Home />}/>
                </Routes>
            </BrowserRouter>
        </UserProv>
        </>
    );
}
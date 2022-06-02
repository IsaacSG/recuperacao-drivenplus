import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseAPI } from "../Global Data/Data";


export default function Cadastro() {
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function Cadastrar() {

        const body = {email,name,cpf,password};
        const promise = axios.post(`${BaseAPI}/auth/sign-up`, body);

        promise.then(response => {
            navigate("/")
        })

        promise.catch(response => {
            alert("Houve uma falha ao tentar cadastra, verifique os dados e tente novamente.(É necessário colocar os pontos e o traço no CPF)")
            console.log(body);
        })
    }

    return (
        <Container>
            <input type = "text" placeholder = "Nome" value = {name} onChange = {e => setName(e.target.value)}/>
            <input type = "text" placeholder = "CPF" value = {cpf} onChange = {e => setCpf(e.target.value)}/>
            <input type = "email" placeholder = "E-mail" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "password" placeholder = "Senha" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <button onClick = {Cadastrar}> <p>CADASTRAR</p> </button>
            <Link to = "/">Já possuí uma conta? Entre</Link>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0E0E13;
    padding-top: 147px;
    padding-bottom: 50px;

    input{
        height: 52px;
        width: 299px;
        border-radius: 8px;
        margin-bottom: 16px;
    }
    button{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 52px;
        width: 299px;
        background-color: #FF4791;
        border-radius: 8px;
        margin-top: 8px;
        margin-bottom: 24px;
    }
    p{
        font-size: 21px;
        color: #FFFFFF;
    }
    Link{
        font-size: 14px;
        color: #FFFFFF;
    }
`
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { BaseAPI } from "../Global Data/Data";
import Logo from "../Styles/Images/Driven_white 1.png";
import UserContext from "../Context/UserContext";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    function Entrar() {

        const body = {email, password};
        const promise = axios.post(`${BaseAPI}/auth/login`, body);

        promise.then(response => {
            setUser({token:response.data.token, membership:response.data.membership, name:response.data.name})
            if(response.data.membership === null) {
                navigate("/subscriptions")
            }
            else {
                navigate("/home")
            }
        })

        promise.catch(response => {
            alert("Email ou senha incorretos, tente novamente.(Caso não possua uma conta tente criar uma antes)")
        })
    }

    return (
        <Container>
            <img src = {Logo} alt ="Logo" />
            <input type = "email" placeholder = "E-mail" value = {email} onChange = {e => setEmail(e.target.value)}/>
            <input type = "password" placeholder = "Senha" value = {password} onChange = {e => setPassword(e.target.value)}/>
            <button onClick = {Entrar}> <p>ENTRAR</p> </button>
            <Link to = "/sign-up">Não possuí uma conta? Cadastre-se</Link>
        </Container>
    );
}

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #0E0E13;
    padding-top: 134px;
    padding-bottom: 50px;

    img{
        width: 299px;
        height: 49px;
        margin-bottom: 100px;
    }
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
    a{
        color: #FFFFFF;
    }
`
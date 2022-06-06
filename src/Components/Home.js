import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
import { BaseAPI } from '../Global Data/Data';
import Icon from "../Styles/Images/Icon-User.png";

export default function Home() {
    const {user} = useContext(UserContext);
    const {plan} = useContext(UserContext);
    const {myperks} = useContext(UserContext);
    const navigate = useNavigate();

    function Cancelar() {
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.delete(`${BaseAPI}/subscriptions`, config)

        promise.then(response => {
            navigate("/subscriptions")
        })
    }

    function Alterar() {
        navigate("/subscriptions")
    }

    return (
        <Container>
            <img className = "Plan" src = {plan.image} />
            <img className = "Icon" src = {Icon} />
            <h2>Olá, {user.name}</h2>
            <Service>
                {myperks.map(perk => 
                    <a href = {perk.link} target = "_blank"> <p>{perk.title}</p> </a>   
                    )}
            </Service>
            <Buttons>
                <button onClick = {Alterar}> <p>Mudar plano</p> </button>
                <button className = "Cancelar" onClick = {Cancelar}> <p>Cancelar plano</p> </button>
            </Buttons>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0E0E13;
    flex-direction: column;
    position: relative;
    padding-bottom: 300px;
    .Plan{
        position: absolute;
        left: 0;
        top: 0;
        height: 51px;
        width: 76px;
        margin-top: 32px;
        margin-left: 38px;
    }
    h2{
        margin-top: 95px;
        margin-bottom: 53px;
        font-size: 24px;
        color: #FFFFFF;
    }
    .Icon{
        height: 34px;
        width: 34px;
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 22px;
        margin-top: 22px;
    }
`
const Service = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    a{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        height: 52px;
        width: 300px;
        background-color: #FF4791;
        border-radius: 8px;
        margin-bottom: 8px;
    }
`
const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    button{
        height: 52px;
        width: 300px;
        background-color: #FF4791;
        border-radius: 8px;
        margin-bottom: 8px;
        color: #FFFFFF;
    }
    .Cancelar{
        background-color: #FF4747;
    }
`
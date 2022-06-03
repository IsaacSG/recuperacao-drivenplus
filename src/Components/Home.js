import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
import { BaseAPI } from '../Global Data/Data';
import PlanContext from '../Context/PlanContext';

export default function Home() {
    const {user} = useContext(UserContext);
    const {plan} = useContext(PlanContext);
    const navigate = useNavigate();
    console.log(plan);

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

    return (
        <Container>
            <img src = {plan.image} />
            <h2>Olá, {user.name}</h2>

            <Perks>

            </Perks>
            <button onClick = {Cancelar}> <p>Cancelar plano</p> </button>

        </Container>
    );
}

const Container = styled.div`

`
const Perks = styled.div`

`
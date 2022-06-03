import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { BaseAPI } from "../Global Data/Data";
import UserContext from "../Context/UserContext";

export default function Planos() {
    const [planos, setPlanos] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getPlanos()
    }, [planos])

    function getPlanos() {
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get(`${BaseAPI}/subscriptions/memberships`, config)
        promise.then(response => setPlanos(response.data))

    }

    return (
        <Container>
            <p>Escolha seu Plano</p>
            <ListarPlanos>
                {planos.map(plano => 
                <Plano>
                    <Link to = {`/subscriptions/${plano.id}`}>
                        <img src = {plano.image} alt = {plano.id}/>
                        <span>R$ {plano.price}</span>
                    </Link>
                </Plano>
                    )}
            </ListarPlanos>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #0E0E13;
    p{
        font-size: 32px;
        color: #FFFFFF;
        margin-top: 29px;
    }
`

const ListarPlanos = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 24px;
`
const Plano = styled.div`
    display: flex;
    align-items: center;
    height: 180px;
    width: 350px;
    margin-bottom: 10px;
    position: relative;
    border: 3px solid #7E7E7E ;
    border-radius: 12px;
    span{
        margin-left: 30px;
        margin-top: 45px;
        position: absolute;
        font-size: 24px;
        color: #FFFFFF;
    }
    img{
        margin-left: 30px;
        height: 95px;
        width: 140px;
    }
`
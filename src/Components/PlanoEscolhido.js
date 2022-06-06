import React, {useState, useEffect, useContext} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../Context/UserContext';
import { BaseAPI } from '../Global Data/Data';
import Clipboard from "../Styles/Images/Clipboard.png";
import Money from "../Styles/Images/Money.png";
import Arrow from "../Styles/Images/Arrow-left.png";


export default function PlanoEscolhido() {
    const {ID_DO_PLANO} = useParams();
    const [plano, setPlano] = useState([]);
    const {user} = useContext(UserContext);
    const {setPlan} = useContext(UserContext);
    const {setMyperks} = useContext(UserContext);
    const [perks, setPerks] = useState([]);
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [securityNumber, setSecurityNumber] = useState();
    const [expirationDate, setExpirationDate] = useState("");
    const [membershipId, setMenbershipId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getPlano()
    }, [plano])

    function getPlano() {
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get(`${BaseAPI}/subscriptions/memberships/${ID_DO_PLANO}`, config)
        promise.then(response => {
            setPlano(response.data);
            setPerks(response.data.perks);
            setMenbershipId(response.data.id);
        })

    }

    function Assinar() {
        const body = {membershipId, cardName, cardNumber, securityNumber, expirationDate}
        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }
        if(window.confirm(`Tem certeza que deseja assinar o plano ${plano.name} (R$ ${plano.price})?`)) {
            const promise = axios.post(`${BaseAPI}/subscriptions`, body, config)

            promise.then(response => {
                setPlan(response.data.membership);
                setMyperks(response.data.membership.perks);
                navigate("/home");
            })

            promise.catch(response => {
                alert("Algo deu errado verifique suas informações e tente novamente(utilize espaço a cada 4 numeros do seu cartão)");
            })
        }
    }

    return (
        <Container>
            <Link to = {`/subscriptions`}>
                <img className = "Arrow" src = {Arrow} />
            </Link>
                <img src = {plano.image} alt = {plano.id}/>
                <h2>{plano.name}</h2>
                <PlanoSelecionado>
                    <Icon>
                        <img src = {Clipboard} /><h3>Benefícios:</h3>
                    </Icon>
                {perks.map((perk, i) => 
                        <p>{i+1}. {perk.title}</p>
                    )}
                    <Icon>
                        <img className="Money" src = {Money} /><h3>Preco:</h3>
                    </Icon>
                <p>R$ {plano.price} cobrados mensalmente</p>
            </PlanoSelecionado>
            <Inputs>
                <input type = "text" placeholder = "Nome impresso no cartão" value = {cardName} onChange = {e => setCardName(e.target.value)}/>
                <input type = "text" placeholder = "Digitos do cartão" value = {cardNumber} onChange = {e => setCardNumber(e.target.value)}/>
                <Menor>
                <input className = "Menor" type = "text" placeholder = "Código de segurança" value = {securityNumber} onChange = {e => setSecurityNumber(e.target.value)}/>
                <input className = "Menor" type = "text" placeholder = "Validade" value = {expirationDate} onChange = {e => setExpirationDate(e.target.value)}/>
                </Menor>
            </Inputs>
            <button onClick = {Assinar}> <p>ASSINAR</p> </button>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    background-color: #0E0E13;
    flex-direction: column;
    padding-top: 87px;
    position: relative;
    img{
        height: 95px;
        width: 140px;
        margin-bottom: 12px;
    }
    h2{
        font-size: 32px;
        color: #FFFFFF;
        margin-bottom: 10px;
    }
    button{
        margin-top: 27px;
        height: 52px;
        width: 299px;
        border-radius: 8px;
        background-color: #FF4791;
        color: #FFFFFF;
    }
    .Arrow{
        position: absolute;
        height: 32px;
        width: 28px;
        top: 0;
        left: 0;
        margin-top: 22px;
        margin-left: 22px;
    }

`
const PlanoSelecionado = styled.div`
    h3{
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 10px;
        margin-top: 12px;
    }
    p{
        font-size: 14px;
        color: #FFFFFF;
    }


`
const Inputs = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 175px;
    width: 300px;
    margin-top: 34px;
    input{
        height: 52px;
        width: 299px;
        margin-bottom: 8px;
        border-radius: 8px;
    }
`
const Menor = styled.div`
    display: flex;
    .Menor{
        height: 52px;
        width: 138px;
        margin-right: 9px;
    }
`
const Icon = styled.div`
    display: flex;
    img{
        height: 20px;
        width: 20px;
        margin-top: 10px;
    }
    .Money{
        height: 12px;
        width: 15px;
        margin-top: 15px;
    }

`
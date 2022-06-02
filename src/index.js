import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import "./Styles/reset.css";

function Index(){
    return(
        <>
            <App />
        </>
    );
}

ReactDOM.render(<Index />, document.querySelector(".root"));
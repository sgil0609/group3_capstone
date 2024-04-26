import React from "react";
import SummerImage from "../assets/images/A-Summer.png";

export default function Home() {
    return (
        <div className="home">
            <h1>Home</h1>
            <div className="SummerImage">
                <img src={SummerImage} alt="sumr"/>
                </div>
        </div>
    );
}
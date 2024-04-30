import React from "react";
import AFDenim from "../assets/images/23-AFDenim.jpeg";
import CKJ from "../assets/images/ckj.jpeg";
import HM from "../assets/images/hmgoepprod.jpeg";

export default function Home() {
    return (
        <div className="home">
            <div className="top-image">
                <img src={AFDenim} alt="denim"/>
            </div>
        <div className="side-2">
            <div className="CKJ">
                <img src={CKJ} alt="ck"/>
            </div>
            <div className="HM">
                <img src={HM} alt="hmg"/>
            </div>
        </div>
        </div>
    );
}
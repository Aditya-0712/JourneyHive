import "../../views/Home Page/home.css";
import location from "../../images/location.svg";
import search from "../../images/search.svg";
import down2 from "../../images/down2.svg";
import calender from "../../images/calender.svg";
import person from "../../images/person.svg";
import { useState } from "react";

function SearchTicket(){
    const [strength, setStrength] = useState(1);

    return (
        <form autoComplete="off">
            <div style={{margin:"0 auto"}}>
                <span>
                    <img src={location} alt="location" /><p>From: </p>
                    <input
                        type="text"
                        name="from"
                        placeholder="e.g Pune, Maharashtra"
                    />
                </span>

                <span>
                    <img src={location} alt="location" /><p>To: </p>
                    <input
                        type="text"
                        name="to"
                        placeholder="e.g Banglore, Karnataka"
                    />
                </span>

                <button type="submit"><img src={search} alt="search" /></button>
            </div>

            <div style={{margin: "1.31vw auto"}}>
                <span className="classes" style={{cursor:"pointer"}}>
                    <p>All class</p>
                    <img src={down2} alt="down" />
                </span>

                <span className="classes" style={{padding:"0.59vw 0.85vw"}}>
                    <img src={calender} alt="date" />
                    <p className="content">Sun, 6 Nov</p>
                    <p className="op">+</p>
                </span>

                <span className="classes" style={{padding:"0.59vw 0.85vw"}}>
                    <p className="op" onClick={() =>{if(strength!==1)setStrength(strength-1)}}>-</p>
                    <img src={person} alt="no of people" style={{margin:"auto 0.33vw auto auto"}} />
                    <p className="content" style={{margin:"auto auto auto 0.33vw"}}>{strength}</p>
                    <p className="op" onClick={() =>setStrength(strength+1)} >+</p>
                </span>
            </div>
        </form>
    );
}

export default SearchTicket;
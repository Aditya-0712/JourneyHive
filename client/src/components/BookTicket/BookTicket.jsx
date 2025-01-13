import "./bookTicket.css";
import train from "../../images/train2.png";
import cross from "../../images/cross.svg";    
import { useContext, useEffect, useState } from "react";
import person from "../../images/person.svg";
import ticketContext from "../../context/ticketContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function BookTicket(props){
    const { ticketDetails } = useContext(ticketContext);

    const [strength, setStrength] = useState(1);

    const [formValues, setFormValues] = useState({
        email:"",
        name:"",
        phoneNumber:""
    });

    const [warnings, setWarnings] = useState({
        warn1:"none",
        warn2:"none"
    });

    const navigate = useNavigate();

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
            method:"GET",
            headers: {'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            if (res2.success){
                setFormValues(prev =>({...prev, email:res2.message}))
            }
            else{
                navigate("/");
            }
        })
        .catch(err =>console.log(err));
    })

    const handleSubmit = () =>{
        let flag = true;

        if (!formValues.name.includes(" ")){setWarnings(prev =>({...prev, warn1:"flex"})); flag=false}
        else{setWarnings(prev =>({...prev, warn1:"none"}))}

        if (formValues.phoneNumber.length!==10){setWarnings(prev =>({...prev, warn2:"flex"})); flag=false}
        else{setWarnings(prev =>({...prev, warn2:"none"}))}

        if (flag){
            fetch(`${process.env.REACT_APP_BASE_URL}/bookTicket/${ticketDetails.id}`, {
                method:"POST",
                headers: {'Content-Type':'application/json'},
                credentials:"include",
                body:JSON.stringify({quantity:strength, fullName:formValues.name, phoneNumber:"+91 " + formValues.phoneNumber})
            })
            .then(res1 =>res1.json())
            .then(res2 => {
                if (res2.success){
                    props.setBook(false);
                    toast.success("Booking successful");
                }
                else{
                    toast.error("Error in booking ticket");
                }
            })
            .catch(err =>console.log(err))
        }
    }

    return (
        <div className="bookTicket">
            <div className="main">
                <span style={{width:"100%", margin:"0"}}>
                    <p className="id">#{ticketDetails.id}</p>
                    <img src={cross} alt="cross" className="cross" onClick={() =>props.setBook(false)} />
                </span>
                <span style={{margin:"0.66vw auto 0 0"}}>
                    <img src={train} alt="train" className="train"/>
                    <span style={{flexDirection:"column", margin:"auto 0 0 1.31vw"}}>
                        <p className="title">{ticketDetails.ticketName}</p>
                        <p className="desc">{ticketDetails.source} - {ticketDetails.destination} - {ticketDetails.arrivalTime}</p>
                    </span>
                </span>
                <span className="classes">
                    <p className="op" onClick={() =>{if(strength!==1)setStrength(strength-1)}}>-</p>
                    <img src={person} alt="no of people" style={{margin:"auto 0.33vw auto auto"}} />
                    <p className="content" style={{margin:"auto auto auto 0.33vw"}}>{strength}</p>
                    <p className="op" onClick={() =>{if(strength<10){setStrength(strength+1)}}} >+</p>
                </span>

                <form autoComplete="off">
                    <p className="label">Email</p>
                    <p className="input_filled">{formValues.email}</p>
                    <p className="label">Full name <span className="error" style={{display:warnings.warn1}} >(Invalid full name)</span></p>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="e.g John Doe"
                        value={formValues.name}
                        onChange={e =>setFormValues(prev =>({...prev, name:e.target.value}))}
                        style={{borderColor:warnings.warn1==="flex"?"red":"#3a3a3a38"}}
                    />

                    <p className="label">Phone Number <span className="error" style={{display:warnings.warn2}} >(Invalid phone number)</span></p>
                    <span style={{margin:"0.25vw 0 0 0", width:"100%"}}>
                        <p className="cc">+91</p>
                        <input 
                            type="number"
                            name="phno"
                            placeholder="e.g 1234567890"
                            style={{margin:"auto 0 auto 0.66vw", borderColor:warnings.warn2==="flex"?"red":"#3a3a3a38"}}
                            value={formValues.phoneNumber}
                            onChange={e =>setFormValues(prev =>({...prev, phoneNumber:e.target.value}))}
                        /> 
                    </span>
                </form>

                <div className="bill">
                    <p className="header2">Billing</p>
                    <span><p className="p1">Ticket fee:</p><p className="p2">Rs {strength * ticketDetails.ticketPrice}</p></span>
                    <span><p className="p1">Platform fee:</p><p className="p2">Rs 150.00</p></span>
                    <span><p className="p1">GST:</p><p className="p2">Rs 80.00</p></span>
                    <span><p className="p1">Service tax:</p><p className="p2">Rs 95.00</p></span>
                    <div className="line"></div>
                    <span><p className="p1">Total:</p><p className="p2">Rs {(strength * ticketDetails.ticketPrice) + 325}</p></span>
                </div>

                <p className="book" onClick={handleSubmit}>Book ticket</p>
            </div>
        </div>
    );
}

export default BookTicket;
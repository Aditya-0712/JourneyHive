import "../Login Page/login.css";
import vector1 from "../../images/vector1.png";
import colleseum from "../../images/colleseum.webp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import toast from "react-hot-toast";
import google from "../../images/google.png";
import github from "../../images/github.png";

function Register(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:"",
        password2:""
    });

    const [warnings, setWarnings] = useState({
        warn1:"none",
        warn2:"none",
        warn3:"none"
    });

    const validateForm = () =>{
        let flag = true;

        if (!validator.isEmail(formData.email)){setWarnings(prev =>({...prev, warn1:"flex"})); flag=false}
        else{setWarnings(prev =>({...prev, warn1:"none"}))}

        if(formData.password.length<8){setWarnings(prev =>({...prev, warn2:"flex"})); flag=false}
        else{setWarnings(prev =>({...prev, warn2:"none"}))}

        if (formData.password2!==formData.password){setWarnings(prev => ({...prev, warn3:"flex"})); flag=false}
        else{setWarnings(prev => ({...prev, warn3:"none"}))}

        return flag;
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if (validateForm()){
            fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({email:formData.email, password:formData.password})
            })
            .then(res1 =>res1.json())
            .then(res2 => {
                console.log(res2)
                if (res2.success){
                    navigate("/");
                }
                else{
                    toast.error(res2.message);
                }
            })
            .catch(err =>console.log(err))
        }
    }

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
            method:"GET",
            headers: {'Content-Type':'application/json'},
            credentials: "include"
        })
        .then(response =>response.json())
        .then(data =>{
            if (data.success){
                navigate("/home");
            }
        })
        .catch(err =>console.log(err));
    }, [navigate]);

    return (
        <div className="login">
            <div className="up">
                <div>
                    <p className="logo">Journey<span>Hive</span></p>
                    <p className="title">Sign up</p>
                    <p className="desc">Create a new account with your credentials<br></br>If you already have an account click on Sign in</p>
                </div>

                <img src={vector1} alt="vector" />
            </div>

            <form autoComplete="off" onSubmit={(e) =>handleSubmit(e)} style={{margin:"-16vw 9.86vw -14vw auto"}}>
                <p className="header">Welcome to <span>JourneyHive</span></p>
                <p className="header2">Sign up</p>

                <p className="label">Email address <span style={{display:warnings.warn1}}>(Invalid email address)</span></p>
                <input
                    type="email"
                    name="email"
                    placeholder="e.g janedoe@example.com"
                    value={formData.email}
                    onChange={e =>setFormData(prev =>({...prev, email:e.target.value}))}
                    style={{borderColor:warnings.warn1==="none"?"rgba(0, 0, 0, 0.2)":"red"}}
                />

                <p className="label">Create password <span style={{display:warnings.warn2}}>(Should be of minimum 8 characters)</span></p>
                <input
                    type="password"
                    name="password"
                    placeholder="Use numbers and symbols"
                    value={formData.password}
                    onChange={e =>setFormData(prev =>({...prev, password:e.target.value}))}
                    style={{borderColor:warnings.warn2==="none"?"rgba(0, 0, 0, 0.2)":"red"}}
                />

                <p className="label">Type password again<span style={{display:warnings.warn3}}>(Doesn't match the above password)</span></p>
                <input
                    type="password"
                    name="password2"
                    placeholder="Should be the same as above"
                    value={formData.password2}
                    onChange={e =>setFormData(prev =>({...prev, password2:e.target.value}))}
                    style={{borderColor:warnings.warn3==="none"?"rgba(0, 0, 0, 0.2)":"red"}}
                />

                <button type="submit">Continue</button>

                <p className="lnk">Have an account? <span onClick={() =>navigate("/")}>Sign in</span></p>

                <span style={{margin:"1vw auto 0.5vw auto", width:"100%"}} onClick={() =>window.location.href=`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`}>
                    <div className="oauth2">
                        <img src={google} alt="google" />
                        <p>Sign in with Google</p>
                    </div>

                    <div className="oauth2" onClick={() =>window.location.href=`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/github`}>
                        <img src={github} alt="github" />
                        <p>Sign in with GitHub</p>
                    </div>
                </span>
            </form>

            <div className="down">
                <img src={colleseum} alt="colleseum" className="colleseum"/>

                <div className="pstr">
                    <p>Travel the world</p>
                    <p style={{textDecoration:"underline", cursor:"pointer", color:"blue"}} onClick={() =>navigate("/home")}>
                        Explore without signing in!
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Register;
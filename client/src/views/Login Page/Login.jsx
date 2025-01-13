import "./login.css";
import "../../fonts/fonts.css";
import vector1 from "../../images/vector1.png";
import colleseum from "../../images/colleseum.webp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../images/google.png";
import github from "../../images/github.png";

function Login(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const [warnings, setWarnings] = useState({
        warn1:"none",
        warn2:"none"
    });

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch(`${process.env.REACT_APP_BASE_URL}`, {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(formData),
            credentials:"include"
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            console.log(res2);

            res2.success?navigate("/home"):setWarnings({warn1:"flex", warn2:"flex"});
        })
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
                    <p className="title">Login</p>
                    <p className="desc">Sign in with you credentials<br></br>If you don't have an account click on create one</p>
                </div>

                <img src={vector1} alt="vector" />
            </div>

            <form autoComplete="off" onSubmit={(e) =>handleSubmit(e)}>
                <p className="header">Welcome to <span>JourneyHive</span></p>
                <p className="header2">Login</p>

                <p className="label">Email address <span style={{display:warnings.warn1}}>(Invalid email address)</span></p>
                <input
                    type="email"
                    name="email"
                    placeholder="e.g janedoe@example.com"
                    value={formData.email}
                    onChange={e =>setFormData(prev =>({...prev, email:e.target.value}))}
                    style={{borderColor:warnings.warn1==="none"?"rgba(0, 0, 0, 0.2)":"red"}}
                />

                <p className="label">Password <span style={{display:warnings.warn2}}>(Wrong password)</span></p>
                <input
                    type="password"
                    name="password"
                    placeholder="Should be minimum 8 characters"
                    value={formData.password}
                    onChange={e =>setFormData(prev =>({...prev, password:e.target.value}))}
                    style={{borderColor:warnings.warn2==="none"?"rgba(0, 0, 0, 0.2)":"red"}}
                />

                <button type="submit">Continue</button>

                <p className="lnk">Need an account? <span onClick={() =>navigate("/register")}>Create one</span></p>

                <span style={{margin:"1vw auto 0.5vw auto", width:"100%"}}>
                    <div className="oauth2" onClick={() =>window.location.href=`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`}>
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

export default Login;
import "./topbar.css";
import down from "../../images/down.svg";
import settings from "../../images/settings.svg";
import bell from "../../images/bell.svg";
import news from "../../images/news.svg";
import logout from "../../images/logout.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Topbar(props){
    const navigate = useNavigate();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [pfp, setPfp] = useState("/maps/account.svg");
    const navs = {
        home:props.home,
        status:props.status,
        history:props.history
    }

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
            method:"GET",
            headers: {'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            console.log(res2);
            if (res2.success){setLoggedIn(true); setEmail(res2.message); setPfp(res2.data[0].url)}
        })
        .catch(err =>console.log(err))
    }, []);

    const handleClick = () =>{
        isOpen?setOpen(false):setOpen(true);
    }

    const handleLogout = () =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            if (res2.success){
                navigate("/");
            }
        })
    }

    return (
        <div className="topbar">
            <p className="logo">Journey<span>Hive</span></p>
            <p className="options" style={{color:navs.home}} onClick={() =>navigate("/home")}>Home</p>
            <p className="options" style={{color:navs.status}} onClick={() =>navigate("/status")}>Status</p>
            <p className="options" style={{color:navs.history}} onClick={() =>navigate("/history")}>History</p>

            <div style={{margin:"auto 0 auto auto"}}>
                <img src={news} alt="news" className="features" />
                <img src={settings} alt="settings" className="features" />
                <img src={bell} alt="notifications" className="features" />
            </div>
            
            {isLoggedIn && (
                <span style={{flexDirection:"column"}}>
                    <div className="account" onClick={handleClick}>
                        <img src={pfp} alt="account" className="user"/>
                        <div>
                            <p>Welcome back!</p>
                            <p>{email} <img src={down} alt="pull down" /></p>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="pop" onClick={handleLogout}>
                            <img src={logout} alt="logout" />
                            <p>Logout</p>
                        </div>
                    )}
                </span>
            )}

            {!isLoggedIn && (<p className="loginButton" onClick={() =>navigate("/")}>Login</p>)}
        </div>
    );
}

export default Topbar;
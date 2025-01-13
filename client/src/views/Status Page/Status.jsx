import "./status.css";
import Topbar from "../../components/Topbar/Topbar";
import train from "../../images/train2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function StTicket(props){
    const [isPop, setPop] = useState(false);

    const cancelTicket = () =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/bookTicket/${props.bookingId}`, {
            method:"DELETE",
            headers: {'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(response =>response.json())
        .then(data =>{
            console.log(data);
            if (data.success){
                toast.success("Ticket booking cancelled");
                setTimeout(() =>{window.location="/status"}, 1000);
            }
        })
        .catch(err =>console.log(err));
    }

    return (
        <div className="stTicket">
            <img src={`/maps/${props.id}.png`} alt="map" className="map" />
            <span style={{margin:"0 auto 0 0", boxSizing:"border-box", padding:"0.99vw", flexDirection:"column", width:"100%"}}>
                <p className="id">#{props.id}</p>
                <span style={{margin:"0.66vw auto 0 0"}}>
                    <img src={train} alt="train" className="train"/>
                    <span style={{flexDirection:"column", margin:"auto 0 0 1.31vw"}}>
                        <p className="title">{props.ticketName}</p>
                        <p className="desc">{props.source} - {props.destination} - {props.arrivalTime}</p>
                        <span style={{margin:"0.46vw auto 0 0"}}>
                            <span className="dot"></span>
                            <p className="arriving">Ariving on time</p>
                        </span>
                        <p className="sn">Seat numbers: <span>{props.seatNumbers}</span></p>
                    </span>
                </span>
                <p className="cancel" onClick={() =>setPop(true)}>Cancel ticket</p>
                <p className="details" onClick={() =>window.location = `/home/${props.id}`}>View details</p>
            </span>

            {isPop && (
                <div className="popup">
                    <span style={{margin:"auto", flexDirection:"column"}}>
                        <p>Are you sure you want to cancel<br></br>this booking?</p>
                        <p onClick={cancelTicket}>Yes</p>
                        <p onClick={() =>setPop(false)}>No</p>
                    </span>
                </div>
            )}
        </div>
    );
}

function Status(){
    const navigate = useNavigate();

    const [booketTickets, setBookedTickets] = useState([]);

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(res1 =>res1.json())
        .then(res2 =>{
            if (!res2.success && res2.message==="User not logged in"){
                navigate("/");
            }
        })
        .catch(err =>console.log(err));

        fetch(`${process.env.REACT_APP_BASE_URL}/bookTicket`, {
            method:"GET",
            headers: {'Content-Type':'application/json'},
            credentials:"include"
        })
        .then(response =>response.json())
        .then(data =>{
            if (data.success){
                console.log(data);
                setBookedTickets(data.data);
            }
        })
        .catch(err =>console.log(err));
    }, [navigate]);

    const renderBookings = booketTickets.map((x, ind) =>{
        return (
            <span key={ind}>
                <StTicket id={x.ticket.id} ticketName={x.ticket.ticketName} source={x.ticket.source} destination={x.ticket.destination} arrivalTime={x.ticket.arrivalTime} seatNumbers={x.booking.seatNumbers} bookingId={x.booking.bookingId} />
            </span>
        );
    })

    return (
        <span style={{flexDirection:"column", margin:"0"}}>
            <Topbar status={"white"}/>
            <div className="status">
                <p className="heading">View status of your booked tickets</p>
                <div className="stTickets">
                    {renderBookings}
                </div>
            </div>
        </span>
    );
}

export default Status;
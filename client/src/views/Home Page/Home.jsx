import "./home.css";
import Topbar from "../../components/Topbar/Topbar";
import Tickets from "../../components/Tickets/Tickets";
import greentick from "../../images/greentick.png";
import share from "../../images/share.svg";
import { useContext, useState, useEffect } from "react";
import ticketContext from "../../context/ticketContext";
import { useParams } from "react-router-dom";
import BookTicket from "../../components/BookTicket/BookTicket";
import { toast } from "react-hot-toast";
import SearchTicket from "../../components/SearchTicket/SearchTicket";

function Home(){
    const { id } = useParams();

    const { ticketDetails, setTicketDetails } = useContext(ticketContext);

    const [features, setFeatures] = useState([]);

    const [isBook, setBook] = useState(false);

    useEffect(() =>{
        setFeatures(ticketDetails.features.split(","));

        const fetchTicketById = () =>{
            fetch(`${process.env.REACT_APP_BASE_URL}/tickets/${id}`, {
                method: "GET",
                headers: {'Content-Type':'application/json'}
            })
            .then(res1 =>res1.json())
            .then(res2 =>{
                console.log(res2);
                if (res2.id){
                    setTicketDetails(res2);
                }
            })
        }

        if (ticketDetails.id!=="0000000"){
            return;
        }
        else if (String(id).length===7 && id!==ticketDetails.id){
            fetchTicketById();
        }
    }, [ticketDetails.features, id, setTicketDetails, ticketDetails.id]);

    const renderFeatures = features.map((x, ind) =>{
        return (<span key={ind}><p>{x}</p> <img src={greentick} alt="tick" /></span>);
    })

    const handleCopyLink = () =>{
        navigator.clipboard.writeText(`${process.env.REACT_APP_WEBSITE_URL}/home/${ticketDetails.id}`)
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="home">
            <Topbar home={"white"}/>
            {isBook && <BookTicket setBook={setBook} />}
            <div style={{width:"100%", margin:"0"}}>
                <div className="left">
                    <SearchTicket />
                    <Tickets />
                </div>

                <div className="right">
                    {ticketDetails.id==="0000000" && (
                        <div className="mask">
                            <p>Click on view details to display ticket details</p>
                        </div>
                    )}

                    <img src={`/maps/${ticketDetails.id}.png` || "/maps/map2.png"} alt="map" className="map" />
                    <p className="id1">#{ticketDetails.id}</p>
                    <div style={{width:"100%", margin:"0"}}>
                        <div style={{width:"55%", flexDirection:"column", margin:"0"}}>
                            <p className="ticketName">{ticketDetails.ticketName}</p>
                            <p className="dets">Date: <span>{ticketDetails.date}</span></p>
                            <p className="dets">Class: <span>{ticketDetails.className}</span></p>
                            <span><p className="dets">From: <span>{ticketDetails.source}</span></p><p className="dets">To: <span>{ticketDetails.destination}</span></p></span>
                            <span><p className="dets">Arrival Time: <span>{ticketDetails.arrivalTime}</span></p> <p className="dets">Destination Time: <span>{ticketDetails.destinationTime}</span></p></span>
                            <span><p className="dets">Terminal: <span>{ticketDetails.terminal}</span></p><p className="dets">Platform number: <span>{ticketDetails.platformNumber}</span></p></span>
                            <p className="dets">Number of stops: <span>{ticketDetails.numberOfStops}</span></p>
                            <p className="dets">Station: <span>{ticketDetails.station}</span></p>

                            <div className="services">
                                {renderFeatures}
                            </div>
                        </div>

                        <div style={{width:"45%", margin:"0", flexDirection:"column"}} className="bill">
                            <p className="header2">Billing</p>
                            <span><p className="p1">Ticket fee:</p><p className="p2">Rs {ticketDetails.ticketPrice}</p></span>
                            <span><p className="p1">Platform fee:</p><p className="p2">Rs 150.00</p></span>
                            <span><p className="p1">GST:</p><p className="p2">Rs 80.00</p></span>
                            <span><p className="p1">Service tax:</p><p className="p2">Rs 95.00</p></span>
                            <div className="line"></div>
                            <span><p className="p1">Total:</p><p className="p2">Rs {ticketDetails.ticketPrice + 325}</p></span>
                            <span style={{marginTop:"1.314vw"}}>
                                <div className="share" onClick={handleCopyLink}>
                                    <img src={share} alt="share" />
                                    <p>Share</p>
                                </div>
                                <p className="book" onClick={() =>setBook(true)} >Book Ticket</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
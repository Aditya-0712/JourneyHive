import "./tickets.css";
import train from "../../images/train2.png";
import share from "../../images/share.svg";
import { useState, useEffect, useContext } from "react";
import ticketContext from "../../context/ticketContext";
import { toast } from "react-hot-toast";

function Ticket({id, ticketName, duration, featureString, ticketPrice, className, source, destination, arrivalTime, destinationTime, date, numberOfStops, station, terminal, platformNumber, }){
    className=className.replace("_", " ");

    const { setTicketDetails } = useContext(ticketContext);

    const [features, setFeatures] = useState([]);
    
    useEffect(() =>{
        setFeatures(featureString.split(","));
    }, [featureString]);

    const renderFeatures = features.map((x, ind) =>{
        return (<p className="ft" key={ind}>{x}</p>);
    })

    const handleCopyLink = () =>{
        navigator.clipboard.writeText(`${process.env.REACT_APP_WEBSITE_URL}/home/${id}`)
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="ticket">
            <div className="header">
                <img src={train} alt="train" />
                <span><p>#{id} - {ticketName}</p><p>{className} - {duration}</p></span>
                <p className="price">Rs {ticketPrice}</p>
            </div>
            <div className="mid1"><p>{source}</p><p>{destination}</p></div>
            <div className="mid2"><p>{arrivalTime}</p><p>{destinationTime}</p></div>
            <div className="line"></div>
            <div className="features">
                {renderFeatures}
                <span onClick={handleCopyLink}>
                    <img src={share} alt="share" />
                    <p>Share</p>
                </span>
                <p className="details" onClick={() =>setTicketDetails({
                    id:id,
                    ticketName:ticketName,
                    date:date,
                    className:className,
                    source:source,
                    destination:destination,
                    arrivalTime:arrivalTime,
                    destinationTime:destinationTime,
                    numberOfStops:numberOfStops,
                    station:station,
                    terminal:terminal,
                    platformNumber:platformNumber,
                    features:featureString,
                    ticketPrice:ticketPrice
                })}>View details</p>
            </div>
        </div>
    );
}

function Tickets(){
    const [tickets, setTickets] = useState([]);

    useEffect(() =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/tickets`, {
            method: "GET",
            headers:{'Content-Type':'application/json'}
        })
        .then(res1 =>res1.json())
        .then(res2 =>setTickets(res2))
        .catch(err =>console.log(err))
    }, []);

    const renderTickets = tickets.map((x, ind) =>{
        return (<span style={{margin:"0"}} key={ind}>
            <Ticket id={x.id} ticketName={x.ticketName} featureString={x.features} duration={x.duration} ticketPrice={x.ticketPrice} className={x.className} source={x.source} destination={x.destination} arrivalTime={x.arrivalTime} destinationTime={x.destinationTime} date={x.date} platformNumber={x.platformNumber} numberOfStops={x.numberOfStops} station={x.stationName} terminal={x.terminal} />
        </span>);
    })

    return (
        <div className="tickets">
            {renderTickets}
        </div>
    );
}

export default Tickets;
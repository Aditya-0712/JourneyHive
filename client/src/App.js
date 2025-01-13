import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login Page/Login";
import Register from "./views/Register Page/Register";
import Home from "./views/Home Page/Home";
import { Toaster } from "react-hot-toast";
import ticketContext from "./context/ticketContext";
import { useState } from "react";
import Status from "./views/Status Page/Status";
import History from "./views/History Page/History";

function App(){
    const [ticketDetails, setTicketDetails] = useState({
        id:"0000000",
        ticketName:"",
        date:"",
        className:"",
        source:"",
        destination:"",
        arrivalTime:"",
        destinationTime:"",
        numberOfStops:"",
        station:"",
        terminal:"",
        platformNumber:"",
        features:"",
        ticketPrice:""
    });

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{style:{fontFamily:"epilogue-med"}}}
            />

            <ticketContext.Provider value={{ticketDetails, setTicketDetails}}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home/:id?" element={<Home />} />
                        <Route path="/status" element={<Status />} />
                        <Route path="/history" element={<History />} />
                    </Routes>
                </Router>
            </ticketContext.Provider>
        </>
    );
}

export default App;
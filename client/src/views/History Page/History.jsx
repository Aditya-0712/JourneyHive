import "./history.css";
import Topbar from "../../components/Topbar/Topbar";

function History(){
    return (
        <span style={{margin:"0", width:"100%", flexDirection:"column"}}>
            <Topbar history={"white"}/>
            <div className="history">
                <h1>Yet to come...</h1>
            </div>
        </span>
    );
}

export default History;
import { NavLink } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import GoogleMaps from "../../components/googleMaps/GoogleMap";
import Translate from "../../components/translate/translate";
import "./home.css";

const Home = () => {
    return (
        <div id="home">
            <Navbar></Navbar>
            <div className="home__container">
                <div className="home--title">
                    <h1 className="l1 highlight">REIMAGINE YOUR REVS</h1>
                    <h1 className="l2 ">REVPOS</h1>
                    <button className="home--button">
                        <NavLink to="/login">Get Started</NavLink>
                    </button>
                </div>
                <div className="home--title--img">
                    <img
                        src={require("../../images/frame1.png")}
                        alt="illustration of a generic web app"></img>
                </div>
            </div>
            <div className="home-map">
                <GoogleMaps />
            </div>
            <footer>
                <p>Made By Team 51: Johnny, Joshua, Will, Margaret, Mohnish</p>
                <div className="translate">
                    <Translate />
                </div>
            </footer>
        </div>
    );
};

export default Home;

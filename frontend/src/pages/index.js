import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <nav className="navbar bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand mb-0 h1">
              RevPOS
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Home;
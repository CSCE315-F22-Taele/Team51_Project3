import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
      <main>
        <Link to="/pos" className="btn bt-primary">
          Click Here !
        </Link>
      </main>
    </div>
  );
}

export default HomePage;

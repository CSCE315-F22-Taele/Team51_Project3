import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
      </Routes>
    </Router>
  );
  //THIS GIVES HEADACHE
  /*fetch('http://localhost:3000/api/v1/pos')
    .then((res) =>res.json())
    .then(console.log);

    return <div>Hello!</div>*/
}

export default App;

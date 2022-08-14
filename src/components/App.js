import "../App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateCard from "./CreateCard";
import GamePlay from "./GamePlay";
import Leaderboard from "./Leaderboard";
import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
function App() {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    fetch("https://backend-phase2-project.herokuapp.com/Game")
      .then((res) => res.json())
      .then((data) => setGameData(data));
  }, []);
  // ignore
  return (
    <div className="App">
      <div className="App-header">
        <Navbar />
        <Routes>
          <Route exact path="/phase3-frontend-react/" element={<Home />} />

          <Route exact path="/phase3-frontend-react/CreateCard" element={<CreateCard />} />
          <Route exact path="/phase3-frontend-react/Leaderboard" element={<Leaderboard />} />
          <Route exact path="/phase3-frontend-react/GamePlay" element={<GamePlay />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

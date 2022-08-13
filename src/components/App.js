import "../App.css";
import Navbar from "./Navbar";
import Home from "./Home";
import CreateCard from "./CreateCard";
import GamePlay from "./GamePlay";
import Leaderboard from "./Leaderboard";
import React, { useEffect, useState } from "react";

import { Routes, Route } from "react-router-dom";
function App() {
  // Put on state to pass the data as props
  const [gameData, setGameData] = useState([]);

  // Grab the Game data from backend
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
          <Route exact path="/" element={<Home />} />

          <Route exact path="CreateCard" element={<CreateCard />} />
          <Route exact path="Leaderboard" element={<Leaderboard />} />
          <Route exact path="GamePlay" element={<GamePlay />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

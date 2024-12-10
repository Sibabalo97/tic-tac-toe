import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header-icon">🎲</div>
      <h1 className="title">TicTacToe</h1>
      <p className="subtitle">Play with your friends, higher score wins!</p>
      <button className="play-button" onClick={() => navigate("/game")}>
        Play Now
      </button>
      <div className="music-player">
        <button className="music-button">▶️</button>
        <span>Zeeky Beats - Dream or Reality.mp3</span>
      </div>
    </div>
  );
}

export default HomeScreen;

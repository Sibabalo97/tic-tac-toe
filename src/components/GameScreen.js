import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameScreen.css";
import sounds from './sounds/src_sounds_game_over.wav'
import sound2 from './sounds/src_sounds_game_over.wav'
import av1 from '../assets/images (1).jpg'
import av2 from '../assets/images.jpg'

function GameScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const navigate = useNavigate();

  const clickAudio = new Audio(sounds); // Click sound
  const winAudio = new Audio(sound2); // Win sound

  // Playlist URLs for background music
  const playList = [
    "https://jetsetradio.live/radio/stations/lofi/90sFlav%20-%20Balmy.mp3",
    "https://jetsetradio.live/radio/stations/lofi/90sFlav%20-%20Call%20Me.mp3",
    "https://jetsetradio.live/radio/stations/lofi/Adam%20Kay%20-%20Rehab%20(Instrumental).mp3",
  ];

  const backgroundAudio = new Audio(playList[currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      backgroundAudio.play().catch((error) => console.error("Audio playback error:", error));
      backgroundAudio.addEventListener("ended", handleNextTrack);
    }

    return () => {
      backgroundAudio.pause();
      backgroundAudio.removeEventListener("ended", handleNextTrack);
    };
  }, [currentTrack, isPlaying]);

  const handleCellClick = (index) => {
    if (board[index] || winner) return;

    clickAudio.play().catch((error) => console.error("Click sound playback error:", error));

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      winAudio.play().catch((error) => console.error("Win sound playback error:", error));
      setWinner(isXTurn ? "Player 1 (X)" : "Player 2 (O)");

      // Update scores
      if (isXTurn) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const checkWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playList.length);
  };

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`game-container ${isDarkMode ? "dark-mode" : ""}`}>
      <header className="header">
      <div
        className="header-icon"
        onClick={() => navigate("/")} // This will take you to the Home page
        style={{ cursor: "pointer" }} // Changes cursor to pointer when hovered
      >
        🎲
      </div>
        <h1>Tic Tac Toe</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <div className="game-board">
        <div className="player player1">
          <img src={av1} alt="Player 1" />
          <p>Player 1 (X)</p>
          <p>Score: {player1Score}</p>
        </div>

        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell ? "filled" : ""}`}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>

        <div className="player player2">
          <img src={av2} alt="Player 2" />
          <p>Player 2 (O)</p>
          <p>Score: {player2Score}</p>
        </div>
      </div>

      <div className="game-info">
        {winner ? (
          <div className="winner-animation">
            <p>{winner} Wins!</p>
            <p>{winner === "Player 1 (X)" ? "Player 2 (O) Lost!" : "Player 1 (X) Lost!"}</p>
            <button className="reset-btn" onClick={resetGame}>Play Again</button>
          </div>
        ) : (
          <p>Current Turn: {isXTurn ? "Player 1 (X)" : "Player 2 (O)"}</p>
        )}
      </div>

      <div className="music-player">
        <button onClick={toggleMusic}>{isPlaying ? "Pause Music" : "Play Music"}</button>
        <span>{isPlaying ? "Now Playing: " + playList[currentTrack] : "Music Paused"}</span>
      </div>
    </div>
  );
}

export default GameScreen;

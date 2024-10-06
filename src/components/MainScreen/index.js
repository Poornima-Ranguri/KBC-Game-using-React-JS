import React from "react";
import QRCodeGenerator from "../QRCodeGenerator";
import Question from "../Question";
import "./index.css";

const MainScreen = ({ players, question, nextQuestion }) => {
  return (
    <div className="main-screen">
      <h1>Welcome to KBC Game!</h1>

      <h2>Current Question</h2>
      <Question question={question} />

      <button onClick={nextQuestion}>Next Question</button>

      <h2>Players</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name}: {player.score} points
          </li>
        ))}
      </ul>
      <QRCodeGenerator />
    </div>
  );
};

export default MainScreen;

/*import React, { useState } from "react";
import MainScreen from "./components/MainScreen";
import MobileScreen from "./components/MobileScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["A. Paris", "B. London", "C. Berlin", "D. Madrid"],
      correctAnswer: "A",
    },
    {
      question: 'Who wrote "Hamlet"?',
      options: ["A. Dickens", "B. Shakespeare", "C. Tolkien", "D. Homer"],
      correctAnswer: "B",
    },
    // Add more questions here
  ];

  const addPlayer = (name) => {
    setPlayers([...players, { name, score: 0 }]);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/mobile"
          element={
            <MobileScreen
              question={questions[currentQuestionIndex]}
              addPlayer={addPlayer}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainScreen
              players={players}
              question={questions[currentQuestionIndex]}
              nextQuestion={nextQuestion}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
*/

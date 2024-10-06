import React, { useState } from "react";

const MobileScreen = ({ question, addPlayer }) => {
  const [name, setName] = useState("");
  const [answer, setAnswer] = useState("");

  const handleJoin = () => {
    addPlayer(name);
  };

  const handleSubmitAnswer = () => {
    if (answer === question.correctAnswer) {
      alert("Correct!");
    } else {
      alert("Wrong answer, try again.");
    }
  };

  return (
    <div className="mobile-screen">
      {!name ? (
        <div>
          <h2>Enter your name to join:</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleJoin}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>{question.question}</h2>
          {question.options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                name="answer"
                value={option[0]}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {option}
            </div>
          ))}
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default MobileScreen;

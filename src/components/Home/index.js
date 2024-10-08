import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { QRCodeSVG } from "qrcode.react";
import MobileHome from "../Mobile";

import QuestionItem from "../QuestionItem";
import { ToastContainer, toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const questionsList = [
  {
    id: uuidv4(),
    question: "What is React JS?",
    options: [
      { optionId: "A", text: "A back-end framework" },
      { optionId: "B", text: "A front-end JavaScript library" },
      { optionId: "C", text: "A database management tool" },
      { optionId: "D", text: "A server-side language" },
    ],
    answer: "B",
  },
  {
    id: uuidv4(),
    question:
      "Which of the following is used to pass data to components in React?",
    options: [
      { optionId: "A", text: "State" },
      { optionId: "B", text: "props" },
      { optionId: "C", text: "Events" },
      { optionId: "D", text: "Prev State" },
    ],
    answer: "B",
  },
  {
    id: uuidv4(),
    question: "What does the key prop help with in React?",
    options: [
      { optionId: "A", text: "Optimizing performance during list rendering" },
      { optionId: "B", text: "Managing state across components" },
      { optionId: "C", text: "Styling components conditionally" },
      { optionId: "D", text: "Updating props automatically" },
    ],
    answer: "A",
  },
  {
    id: uuidv4(),
    question: "How can you conditionally render elements in React?",
    options: [
      { optionId: "A", text: "Using if-else statements" },
      { optionId: "B", text: "Using the ternary operator (? :)" },
      { optionId: "C", text: "Using the logical && operator" },
      { optionId: "D", text: "All of the above" },
    ],
    answer: "D",
  },
  {
    id: uuidv4(),
    question: "Which of the following is true about React Router?",
    options: [
      { optionId: "A", text: "It is built into React by default" },
      {
        optionId: "B",
        text: "It allows navigation between different components in a React app",
      },
      { optionId: "C", text: "It handles form submissions in React" },
      { optionId: "D", text: "It replaces state management" },
    ],
    answer: "B",
  },
];

class Home extends Component {
  state = {
    playerName: "",
    showHomePageOfGame: false,
    activeQuestionIndex: 0,
    gameCompleted: false,
    showQR: true,
  };

  handleJoin = () => {
    this.setState({ showQR: false });
  };

  renderQRCode = () => {
    const { showQR, playerName } = this.state;
    //const appUrl = window.location.href; // This will be the URL for your React app
    const appUrl = "https://kbcgamepg.netlify.app/Mobile";

    return (
      <div className="qr-code">
        {showQR ? (
          <div>
            <p>Scan the QR code below to join the game:</p>
            <QRCodeSVG value={appUrl} size={150} />
          </div>
        ) : (
          <MobileHome onJoin={this.handleJoin} />
        )}
        {playerName && (
          <h2 className="Joined">
            Player Joined:{" "}
            <span className="playername">{playerName.toUpperCase()}</span>
          </h2>
        )}
      </div>
    );
  };

  onUpdateQuestion = async () => {
    const { playerName, activeQuestionIndex } = this.state;

    // Update the backend to track the player's progress
    const url = "https://backend-for-kbc-game.onrender.com/update-status";

    // Check if the player has completed all questions
    const completedQuestionStatus =
      activeQuestionIndex + 1 === questionsList.length ? true : false;

    const player = {
      username: playerName,
      questions_attempted: activeQuestionIndex + 1, // Increment by 1
      completedAllQuestions: completedQuestionStatus, // Pass as boolean
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(player),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log("Question update response: ", result);
    } catch (error) {
      console.error("Error updating question progress: ", error);
    }
  };

  onUpdatePlayer = () => {
    this.setState((prevState) => {
      const nextIndex = prevState.activeQuestionIndex + 1;
      if (nextIndex < questionsList.length) {
        this.onUpdateQuestion();

        return { activeQuestionIndex: nextIndex };
      } else if (!prevState.gameCompleted) {
        this.showCompletionToast();
      }
    });
  };

  showCompletionToast = () => {
    const { playerName } = this.state;
    toast.success(
      `🎉 Congratulations ${playerName.toUpperCase()}! You've completed all the questions!`,
      {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
        transition: Slide,
        draggable: true,
        style: {
          textAlign: "center",
        },
        onClose: () => {
          this.setState({
            showHomePageOfGame: false,
            gameCompleted: false,
            activeQuestionIndex: 0,
            playerName: "",
          });
        },
      }
    );
  };

  onReplayGame = () => {
    this.setState({
      showHomePageOfGame: true,
      activeQuestionIndex: 0,
      gameCompleted: false,
      playerName: "",
    });
  };

  renderGame = () => {
    const { activeQuestionIndex } = this.state;
    const activeQuestion = questionsList[activeQuestionIndex];
    //const appUrl = window.location.href; // This will be the URL for your React app

    return (
      <div className="qr-code-container">
        <div className="home-card">
          <h1 className="heading">WELCOME TO KBC GAME</h1>
          <ul className="questions-list-container">
            <QuestionItem
              key={activeQuestion.id}
              questionDetails={activeQuestion}
              onUpdatePlayer={this.onUpdatePlayer}
            />
          </ul>
        </div>
        {this.renderQRCode()}
      </div>
    );
  };

  onChangePlayerName = (event) => {
    this.setState({ playerName: event.target.value });
  };

  /* onClickProceed = async () => {
    const { playerName } = this.state;
    if (playerName !== "") {
      const url = "http://localhost:3003/add-user";

      const player = {
        username: playerName,
        questions_attempted: 1,
        completedAllQuestions: "FALSE",
      };

      //console.log(player);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      };

      try {
        const response = await fetch(url, options);
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      this.setState({ showHomePageOfGame: true });
    }
  };
  */

  onClickProceed = async () => {
    const { playerName } = this.state;
    if (playerName.trim() === "") {
      toast.error("Username cannot be empty!", {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
        draggable: true,
      });
      return; // Exit early if the username is empty
    }

    const url = "https://backend-for-kbc-game.onrender.com/add-user";
    const player = { username: playerName };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorMessage = await response.text(); // Retrieve error message
        throw new Error(errorMessage);
      }
      const result = await response.text();
      console.log(result);
      this.setState({ showHomePageOfGame: true });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
        draggable: true,
      });
      console.log("Error:", error);
    }
  };

  renderPlayerName = () => {
    const { playerName } = this.state;
    return (
      <div className="enter-home">
        <h1 className="heading">KBC GAME</h1>
        <input
          type="text"
          onChange={this.onChangePlayerName}
          value={playerName}
          placeholder="Enter Your Name"
          className="input-text"
        />
        <button
          type="button"
          onClick={this.onClickProceed}
          className="proceed-button"
        >
          PROCEED
        </button>
      </div>
    );
  };

  render() {
    const { showHomePageOfGame } = this.state;

    return (
      <div className="home">
        {showHomePageOfGame ? this.renderGame() : this.renderPlayerName()}

        <ToastContainer />
      </div>
    );
  }
}

export default Home;

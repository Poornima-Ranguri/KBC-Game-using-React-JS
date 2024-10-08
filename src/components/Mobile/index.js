import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
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

class MobileHome extends Component {
  state = {
    playerName: "",
    showHomePageOfGame: false,
    activeQuestionIndex: 0,
    gameCompleted: false,
  };

  /*onUpdatePlayer = () => {
    this.setState((prevState) => {
      const nextIndex = prevState.activeQuestionIndex + 1;
      if (nextIndex < questionsList.length) {
        return { activeQuestionIndex: nextIndex };
      } else if (!prevState.gameCompleted) {
        this.showCompletionToast();
      }
    });
  };
  */

  onUpdatePlayer = () => {
    this.setState((prevState) => {
      const nextIndex = prevState.activeQuestionIndex + 1;
      if (nextIndex < questionsList.length) {
        return { activeQuestionIndex: nextIndex };
      } else if (!prevState.gameCompleted) {
        // User has completed all questions
        this.showCompletionToast();
        // Resetting the activeQuestionIndex to 0 and updating the backend
        this.updateUserStatus(prevState.playerName, 0, true); // Call to update status
        return { activeQuestionIndex: 0, gameCompleted: true };
      }
    });
  };

  // New method to update user status in the backend
  updateUserStatus = async (
    username,
    questionsAttempted,
    completedAllQuestions
  ) => {
    try {
      const response = await fetch(
        "https://backend-for-kbc-game.onrender.com/update-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            questions_attempted: questionsAttempted,
            completedAllQuestions,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  showCompletionToast = () => {
    const { playerName } = this.state;
    toast.success(
      `🎉 Congratulations ${playerName}! You've completed all the questions!`,
      {
        position: "top-center",
        autoClose: 6000,
        closeOnClick: true,
        transition: Slide,
        onClose: () => {
          this.setState({
            showHomePageOfGame: false,
            gameCompleted: false,
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

    return (
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
    );
  };

  onChangePlayerName = (event) => {
    this.setState({ playerName: event.target.value });
  };

  onClickProceed = async () => {
    const { playerName } = this.state;

    if (playerName !== "") {
      const url = `https://backend-for-kbc-game.onrender.com/user/${playerName}`;
      try {
        const response = await fetch(url);

        if (response.ok) {
          const user = await response.json();
          // Resume from the user's current question
          this.setState({
            showHomePageOfGame: true,
            activeQuestionIndex: user.questions_attempted,
            playerName: user.username,
          });
        } else {
          // Create a new user if none exists
          this.setState({
            showHomePageOfGame: true,
            playerName: playerName,
            activeQuestionIndex: 0,
          });

          // Create a new user in the backend
          await fetch("https://backend-for-kbc-game.onrender.com/add-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: playerName,
              questions_attempted: 0,
              completedAllQuestions: "FALSE",
            }),
          });
        }
      } catch (error) {
        console.log(error);
      }
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

export default MobileHome;

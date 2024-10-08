import { useState } from "react";
import "./index.css";

const QuestionItem = (props) => {
  const { questionDetails, onUpdatePlayer } = props;
  const { id, question, options, answer } = questionDetails;

  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackClassName, setFeedbackClassName] = useState("");

  const onChangeOption = (optionId) => {
    setSelectedOption(optionId);
  };

  const onClickSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === answer;

      setFeedback(isCorrect ? "Correct Answer!" : "Wrong Answer!");

      // Call onUpdatePlayer after 1 second delay to proceed to next question

      setFeedbackClassName(
        isCorrect ? "wrong-feedback-text" : "correct-feedback-text"
      );

      console.log(isCorrect);

      if (isCorrect === true && id !== 5) {
        setTimeout(() => {
          onUpdatePlayer();
          setFeedback("");
        }, 2000);
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  return (
    <li className="question-item">
      <p className="question">{question}</p>
      <ul className="options-container">
        {options.map((eachOption) => (
          <li
            key={eachOption.optionId}
            className={`option-item ${
              selectedOption === eachOption.optionId ? "selected" : ""
            }`}
            onClick={() => onChangeOption(eachOption.optionId)}
          >
            <p>{eachOption.optionId}</p>
            <p>. {eachOption.text}</p>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onClickSubmit} className="submit-button">
        Submit
      </button>
      {feedback && <p className={feedbackClassName}>{feedback}</p>}
    </li>
  );
};

export default QuestionItem;

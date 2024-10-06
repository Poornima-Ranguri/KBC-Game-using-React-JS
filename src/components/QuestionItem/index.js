import "./index.css";

const QuestionItem = (props) => {
  const { questionDetails } = props;
  const { question, options } = questionDetails;

  return (
    <li className="question-item">
      <p>{question}</p>
      <ul className="options-container">
        {options.map((eachOption) => (
          <li key={eachOption.optionId} className="option-item">
            <p>{eachOption.optionId} </p>
            <p> . {eachOption.text}</p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default QuestionItem;

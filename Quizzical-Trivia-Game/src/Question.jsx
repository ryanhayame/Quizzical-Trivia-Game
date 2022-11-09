import AnswerBtn from './AnswerBtn'

export default function Question(props) {

    /*
        <Question 
            questionId={item.questionId}
            question={item.question}
            answerSelection={item.answerSelection}
            isQuestionCorrect={item.isQuestionCorrect}
            makeSelection={makeSelection}
        />
    */

    let displayAnswers = props.answerSelection.map(item => (
        <AnswerBtn 
            key={item.answerId} 
            answerId={item.answerId} 
            correctAnswer={item.isCorrectAnswer}
            questionId={props.questionId}
            value={item.text} 
            isSelected={item.isSelected}
            isQuestionCorrect={props.isQuestionCorrect}
            makeSelection={props.makeSelection}
            gameOver={props.gameOver}
        />
    ));

    return (
        <div className="question-with-answer">
            <div className="q">
                {props.question}
            </div>
            <div className="a">
                {displayAnswers}
            </div>
        </div>
    )
  }
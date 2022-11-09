
import Question from "./Question"
import {useState, useEffect} from "react";
import { nanoid } from "nanoid";

export default function QuestionsPage(props) {

    /* triviaQuestions is an array of objects:
        {
            questionId: nanoid(),
            question: question.question,
            correctAnswer: question.correct_answer,
            allAnswers: allAnswers,
            answerSelection: createAnswerSelection(allAnswers)
        }
    */

    const [triviaQuestions, setTriviaQuestions] = useState([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => setTriviaQuestions(formatQuizData(data.results)))
    }, [])

    // helper function: decodes html strings to remove things like "&#039" from string
    function decodeHtml(string) {
        const txt = document.createElement("textarea")
        txt.innerHTML = string
        return txt.value
    }

    // helper function: Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /* returns an array of objects:
        {
            answerId: nanoid(),
            text: answerText,
            isSelected: false
        }
    */
    function createAnswerSelection(answersArray, correctAnswerText) {
        return answersArray.map(answerText => {
            const decodedAnswerText = decodeHtml(answerText)
            return {
                answerId: nanoid(),
                text: decodedAnswerText,
                isSelected: false,
                isCorrectAnswer: correctAnswerText === decodedAnswerText ? true : false
            }
        })
    }

    // converts data array to array of objects 
    function formatQuizData(dataArray) {
        const formattedData = dataArray.map((question) => {
            const allAnswers = shuffleArray([...question.incorrect_answers, question.correct_answer])
            const correctAnswerText = decodeHtml(question.correct_answer)
            return {
                questionId: nanoid(),
                question: decodeHtml(question.question),
                answerSelection: createAnswerSelection(allAnswers, correctAnswerText),
                isQuestionCorrect: false
            }
        })
        return formattedData;
    }

    // handles user's inputs on answer buttons
    function makeSelection(answerId, questionId) {
        if (gameOver) {
            return
        }
        setTriviaQuestions((prevQuestions) =>
            prevQuestions.map(object => {
                if (object.questionId === questionId) {
                    let checked;
                    let newAnswersSelectionArray = object.answerSelection.map((answerObject) => {
                        // answer box that you click isSelected becomes true, other answers become false
                        if (answerObject.answerId === answerId) {
                            // if the answer box you click is the right answer, isCorrect for the question becomes true
                            // if the answer box you click is the wrong answer, isCorrect for the question becomes false
                            answerObject.isCorrectAnswer ? checked = true : checked = false 
                            return {...answerObject, isSelected: true}
                        } else {
                            return {...answerObject, isSelected: false}
                        }
                    })
                    return {...object, answerSelection: newAnswersSelectionArray, isQuestionCorrect: checked};
                } else {
                    return object;
                }
            })
        )
    }

    const displayQuestions = triviaQuestions.map(item => (
        <div key={item.questionId} className="question-answer-line">
            <Question 
                questionId={item.questionId}
                question={item.question}
                answerSelection={item.answerSelection}
                isQuestionCorrect={item.isQuestionCorrect}
                makeSelection={makeSelection}
                gameOver={gameOver}
            />
            <hr />
        </div>
    ));

    // handles on click for "check answers" / "play again" button 
    function getResults() {
        if (!gameOver) {
            setScore(0)
            setGameOver(true)
            triviaQuestions.map(questionObject => {
                if (questionObject.isQuestionCorrect) {
                    setScore(prevScore => prevScore + 1)
                }
            })
        } else {
            props.changePhase()
        }
    }

    return (
        <div className="questions-page">
            {displayQuestions}
            <div className="results-container">
                {gameOver && <h2 className="result-text">You scored {score}/5 correct answers</h2>}
                <button className="check-btn" onClick={getResults}>{!gameOver ? "Check Answers" : "Play Again"}</button>
            </div>
        </div>
    )
  }



import React from "react"


export default function Menu(props) {

    return (
        <div className="menu">
            <h1 className="menu-title">
                Quizzical
            </h1>
            <h3 className="menu-text">
                A trivia game by Ryan Hayame built in React
            </h3>
            <button className="menu-button" onClick={props.changePhase}>
                Start Quiz
            </button>
        </div>
    )
  }



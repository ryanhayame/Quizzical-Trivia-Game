import React from 'react'
import Menu from './Menu'
import QuestionsPage from './QuestionsPage'

import blueBlock from './imgs/blue-block.png'
import yellowBlock from './imgs/yellow-block.png'

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  function changeGamePhase() {
    setIsPlaying(oldGamePhase => !oldGamePhase)
  }

  return (
    <div>
      <img src={blueBlock} className="blue-block"/>
      <img src={yellowBlock} className="yellow-block"/>
      { !isPlaying && <Menu changePhase={changeGamePhase}/>}
      { isPlaying && <QuestionsPage changePhase={changeGamePhase}/>}
    </div>
  )
}

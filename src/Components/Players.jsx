import { useState } from "react"

export default function Players({name, symbol, isActive, onChangeName,gameEnded}){
    const [changedPlayerName, setchangedPlayerName] = useState(name)
    const [isEditing, setIsEditing] = useState(false)
    function handleEditClicked() {
    setIsEditing(editing =>!editing)
    if(isEditing){
        onChangeName(symbol, playerName)
    }

    }
    function handleChangeName(event){
        console.log(event.target.value)
        setchangedPlayerName(event.target.value)
    }
    let playerName = <span className="player-game">{changedPlayerName}</span>
    let buttonCaption = "Edit"
    if(isEditing) {
        playerName = (<input type="text" value={changedPlayerName} onChange={handleChangeName} required/>)
        buttonCaption = "save"
    }
    else if(!gameEnded){
        setIsEditing(true)
    }
    return(
        <li className={isActive? 'active' : undefined}>
        <span>
        {playerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClicked}>{buttonCaption}</button>
      </li>
    )
}
import colors from "../../colors"
import Button from "../button"
import {applicationStateInterpreter} from "../../state";
import { useMachine,useActor} from '@xstate/react';


const Menu = () => {

    const [applicationState,applicationStateSend] = useActor(applicationStateInterpreter)
    if(!localStorage.getItem('highScore'))localStorage.setItem('highScore',0)
    const highScore = localStorage.getItem('highScore')

    const newGameSelected=()=>{
        applicationStateSend({type:'NEW_GAME'})
        console.log('new game selected')
    }
    return (
        <div
            className="menuContainer"
        >
            <div className="title"
                style={{
                fontSize:"4vw"
            }}
            >
                Half Double
            </div>
            Menu
            <div
            className='highScore'
        >
            High Score {highScore}
        </div>
                <Button
                    name="newGame"
                    text="New Game"
                    size={{width:"min-content",height:'min-content'}}
                    color={colors.sg}
                    handleClick={newGameSelected}
                >
                </Button>
            </div>
    )
}

export default Menu
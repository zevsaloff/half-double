import { useMachine,useActor} from '@xstate/react';
import { useEffect, useState } from 'react';
import {applicationStateInterpreter} from "../../state";
import { gameMachine,gameStateInterpreter } from './state';
import Button  from '../button/index'
import colors from '../../colors';


const Game = () => {
    const [highScore,setHighScore] = useState(window.localStorage.getItem('highScore'))
    const [applicationState,applicationStateSend] = useActor(applicationStateInterpreter)
    // const [gameState,gameStateSend] = useActor(gameStateInterpreter)
    const [gameState,gameStateSend] = useMachine(gameMachine)
    // const [gameState,gameStateSend] = useMachine(gameMachine)

    useEffect(()=>{
        const remoteListener = (e)=>{
            // game state values: starting, running, paused, ended
            // e.key === 'ArrowLeft','ArrowRight','MediaPlayPause'
            console.log(gameState.value)
            if(gameState.value === 'running'||'paused'){
                gameStateSend({type:e.key})
                e.preventDefault()
            }
            if (gameState.value === 'ended'){
                document.removeEventListener('keydown',remoteListener)
            }

        }
        document.addEventListener('keydown',remoteListener)
        return () => {
            document.removeEventListener('keydown',remoteListener)
        }
    },[gameState.value])

    window.actor = gameState
    let thing = "thing"
    // persist high score with window.localStorage 
    // (window.localstorage.setItem('highScore',highScore),window.localstorage.getItem('highScore'))
    useEffect(()=>{
        if(gameState.context.targetNumber===gameState.context.currentNumber)gameStateSend('MATCH')
      
    },[gameState])
    useEffect(()=>{

        if(gameState.context.score > highScore){
            window.localStorage.setItem('highScore',gameState.context.score)
            setHighScore(gameState.context.score)
        }
    },[gameState.context.score])

    return (
        <div>
            <div>Half Double</div>

            {gameState.value === 'starting'&&
              <div
              className='countdown'
          >
              {gameState.context.countdown}
          </div>
            
            }
          
            <div
            className='numbers'
            >
            {
                gameState.value==='running'&&
                <div>
                    <div
                        className='highScore'
                    >
                        High Score {highScore}
                    </div>
                    <div
                    className="timer"
                    style={{
                        background:"white"
                    }}
                    >
                        Timer
                        {gameState.context.timer}
                    </div>
                    <div
                        className="score"
                        style={{
                            background:"white"
                        }}
                    >
                        Score
                        {gameState.context.score}
                    </div>
                    <div
                        className='targetNumber'
                        style={{
                            background:"white"
                        }}
                    >
                        Target Number
                        {gameState.context.targetNumber}
                    </div>
                    <div
                        className='currentNumber'
                        style={{
                            background:"white"
                        }}

                    >
                        Current Number
                        {gameState.context.currentNumber}
                    </div>
                    <div
                        className='controls'
                    >
                        <Button
                            name="Left Button"
                            text="<"
                            size={{width:"5vmax",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'ArrowLeft'})}
                        >
                        </Button>

                        <Button
                            name="Right Button"
                            text=">"
                            size={{width:"5vmax",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'ArrowRight'})}
                        >
                        </Button>
                        <Button
                            name="Pause Button"
                            text="Pause"
                            size={{width:"min-content",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'MediaPlayPause'})}
                        >
                        </Button>
                    </div>
                 
                </div>



            }  
              
            </div>
            {
                gameState.value==='paused'&&
                <div>
                     <Button
                            name="Resume Button"
                            text="Resume"
                            size={{width:"min-content",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:"MediaPlayPause"})}
                        >
                    </Button>
                    <Button
                            name="Exit Button"
                            text="Exit"
                            size={{width:"min-content",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>{
                                gameStateSend({type:'EXIT'})
                                applicationStateSend({type:'MENU'})
                            }}
                        >
                    </Button>
                </div>
            }
                    
    
            {
                gameState.value ==='ended'&&
                <div>
                    <div
                        className="score"
                        style={{
                            background:"white"
                        }}
                    >
                        Score
                        {gameState.context.score}
                    </div>
                    <div
                        className='highScore'
                    >
                        High Score {highScore}
                    </div>          
                    <Button
                            name="New Game Button"
                            text="New Game"
                            size={{width:"min-content",height:'min-content'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'NEW_GAME'})}
                        >
                    </Button>
                    <Button
                            name="Exit Button"
                            text="Exit"
                            size={{width:"5vmax",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>{
                                gameStateSend({type:'EXIT'})
                                applicationStateSend({type:'MENU'})
                            }}
                        >
                    </Button>
                    
                </div>
            }
           
        </div>
      
    )
}

export default Game
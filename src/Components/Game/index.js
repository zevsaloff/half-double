import { useMachine,useActor} from '@xstate/react';
import { useEffect, useRef, useState } from 'react';
import {applicationStateInterpreter} from "../../state";
import { gameMachine } from './state';
import Button  from '../button/index';
import colors from '../../colors';
import './game.scss'


const Game = () => {
    const [highScore,setHighScore] = useState(window.localStorage.getItem('highScore'))
    const [applicationState,applicationStateSend] = useActor(applicationStateInterpreter)
    const [gameState,gameStateSend] = useMachine(gameMachine)
    const rightButtonRef = useRef(null)
    const leftButtonRef = useRef(null)
    const pauseButtonRef = useRef(null)
    window.actor = gameState

    // effects
    {
        // Link specific keydown events to the button mousedown
        // Remote event effect
        useEffect(()=>{

            const remoteListener = (e)=>{
                // game state values: starting, running, paused, ended
                // e.key === 'ArrowLeft','ArrowRight','MediaPlayPause'
                console.log("keydown event")
        
                if(gameState.value === 'running' & !e.repeat){
                    e.preventDefault()
                    window.rightButton = rightButtonRef.current
                    // send arrows event to state if in running state
                    if(e.key==='ArrowRight')rightButtonRef.current.click()
                    if(e.key==='ArrowLeft')leftButtonRef.current.click()
                    if(e.key==='MediaPlayPause'|| e.key === " ")pauseButtonRef.current.click()

                    // enable button focus from fire tv remote
                }
                if(gameState.value === 'paused'){
                    if(e.key==='MediaPlayPause'|| e.key === " ")pauseButtonRef.current.click()
                }
                if (gameState.value === 'ended'){
                    document.removeEventListener('keydown',remoteListener)
                }
            }
            
            document.addEventListener('keydown',remoteListener)

            return () => {
                document.removeEventListener('keydown',remoteListener)

            }
        })

        // match effect
        useEffect(()=>{
            if(gameState.context.targetNumber===gameState.context.currentNumber)gameStateSend('MATCH')
        },[gameState.context.currentNumber])

        // high score update effect
        useEffect(()=>{
            if(gameState.context.score > highScore){
                window.localStorage.setItem('highScore',gameState.context.score)
                setHighScore(gameState.context.score)
            }
        },[gameState.context.score])
    }

    // send click events to buttons
    {
         // game state values: starting, running, paused, ended
        // e.key === 'ArrowLeft','ArrowRight','MediaPlayPause'
        const inputListener = (e) => {

        }
        document.addEventListener('keydown',inputListener)
    }

    return (
        <div
            id="gameContainer"
            style={{
                    width:"100%",
                    height:'100%',
                    display:'flex',
                    flexFlow:'column'
            }}
        >
            <div
                style={{
                    fontFamily: `'Monofett', cursive`,
                    fontSize: '5vmin'
                }}
            >
                Half<br/>Double
            </div>

            {   gameState.value === 'starting'&&
                <div
                    className='countdownContainer'
                    style={{
                        display:'grid',
                        width:'100%',
                        height:'100%',
                        // gridAutoColumns:'1fr',
                        // gridAutoRows:'1fr',
                        // . for an empty section
                        gridTemplateAreas: `
                            '. countdown countdown .'
                        `,
                        alignItems:'center',
                        justifyItems:'center',
                        gridAutoColumns:'1fr',
                        gridAutoRows:'1fr',
                        fontFamily: `'Press Start 2P', cursive`,
                    }}
                >
                    <div
                        style={{
                            gridArea:'countdown',
                            background:'white',
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        {gameState.context.countdown}

                    </div>

                </div>
            }

            {
                gameState.value==='running'&&
                <div
                id='testId'
                    style={{
                        display:'grid',
                        width:'100%',
                        height:'100%',
                        // fontFamily:`'Orbitron', sans-serif`,
                        fontFamily: `'Press Start 2P', cursive`,
                        // gridAutoColumns:'1fr',
                        // gridAutoRows:'1fr',
                        // . for an empty section
                        gridTemplateAreas: `
                            'highscore header timer'
                            '. score score .'
                            '. currentnumber targetnumber .'
                            '. leftbutton rightbutton pausebutton'
                        `,
                        gridAutoColumns:'1fr',
                        gridAutoRows:'1fr',
                    }}
                >
                    <div
                        className='highScore'
                        style={{
                            gridArea:'highscore',
                            background:"white",
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        High Score<br/><br/> {highScore}
                    </div>
                    <div
                    className="timer"
                    style={{
                        background:"white",
                        gridArea:'timer',
                        padding:'2vmin',
                        width:'min-content'
                    }}
                    >
                        Timer 
                        <br/><br/>
                        {gameState.context.timer}
                    </div>
                    <div
                        className="score"
                        style={{
                            background:"white",
                            gridArea:'score',
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        Score<br/><br/>
                        {gameState.context.score}
                    </div>
                    <div
                        className='targetNumber'
                        style={{
                            background:"white",
                            gridArea:'targetnumber',
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        Target Number<br/><br/>
                        {gameState.context.targetNumber}
                    </div>
                    <div
                        className='currentNumber'
                        style={{
                            background:"white",
                            gridArea:'currentnumber',
                            padding:'2vmin',
                            width:'min-content'
                        }}

                    >
                        Current Number <br/><br/>
                        {gameState.context.currentNumber}
                    </div>
                   
                        <Button
                            ref={leftButtonRef}
                            name="Left Button"
                            className="controllButton"
                            text="<"
                            accesskey="ArrowLeft"
                            size={{width:"50%",height:'30%'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'ArrowLeft'})}
                            style={{
                                gridArea:'leftbutton'
                            }}
                        >
                        </Button>
                        <Button
                            ref={rightButtonRef}
                            name="Right Button"
                            className="controllButton"
                            text=">"
                            accesskey="ArrowRight"
                            size={{width:"50%",height:'30%'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'ArrowRight'})}
                            style={{
                                gridArea:'rightbutton'
                            }}
                        >
                        </Button>
                        <Button
                            ref={pauseButtonRef}
                            name="Pause Button"
                            text="Pause"
                            size={{width:"min-content",height:'3vmax'}}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'MediaPlayPause'})}
                            style={{
                                gridArea:'pausebutton'
                            }}
                        >
                        </Button>
                </div>
            } 

            {
                gameState.value==='paused'&&
                <div
                    id="pausedScreen"
                    style={{
                        display:'grid',
                        width:'100%',
                        height:'100%',
                        gridTemplateAreas: `
                            '. resumebutton exitbutton .'
                        `,
                        alignItems:'center',
                        justifyItems:'center',
                        gridAutoColumns:'1fr',
                        gridAutoRows:'1fr',
                    }}
                >
                     <Button
                        ref={pauseButtonRef}
                        name="Resume Button"
                        text="Resume"
                        size={{width:"min-content",height:'3vmax'}}
                        style={{
                            gridArea:'resumebutton'
                        }}
                        color={colors.sg}
                        handleClick={()=>gameStateSend({type:"MediaPlayPause"})}
                        >
                    </Button>
                    <Button
                            name="Exit Button"
                            text="Exit"
                            size={{width:"min-content",height:'3vmax'}}
                            style={{
                                gridArea:'exitbutton'
                            }}
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
                <div

                    style={{
                        display:'grid',
                        gridTemplateAreas:`
                            '. score highscore .'
                            '. newgame exit .'
                        `,
                        alignItems:'center',
                        justifyItems:'center',
                        width:'100%',
                        height:'100%',
                        gridAutoColumns:'1fr',
                        gridAutoRows:'1fr',
                        fontFamily: `'Press Start 2P', cursive`,
                    }}
                >
                    <div
                        className="score"
                        style={{
                            gridArea:'score',
                            background:"white",
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        Score
                        <br/><br/>
                        {gameState.context.score}
                    </div>
                    <div
                        className='highScore'
                        style={{
                            gridArea:'highscore',
                            background:"white",
                            padding:'2vmin',
                            width:'min-content'
                        }}
                    >
                        High Score<br/><br/> {highScore}
                    </div>          
                    <Button
                            name="New Game Button"
                            text="New Game"
                            size={{width:"min-content",height:'min-content'}}
                            style={{
                                gridArea:'newgame'
                            }}
                            color={colors.sg}
                            handleClick={()=>gameStateSend({type:'NEW_GAME'})}
                        >
                    </Button>
                    <Button
                            name="Exit Button"
                            text="Exit"
                            size={{width:"5vmax",height:'3vmax'}}
                            style={{
                                gridArea:'exit'

                            }}
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
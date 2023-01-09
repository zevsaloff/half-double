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
            style={{
                width:'100%',
                height:'100%',
                display:'grid',
                gridTemplateAreas:`
                    '. title title highscore'
                    '. pagename pagename .'
                    '. newgamebutton newgamebutton .'
                `,
                gridAutoColumns:'1fr',
                gridAutoRows:'1fr',
                alignItems:'center',
                justifyItems:'center',
                fontFamily: `'Press Start 2P', cursive`,

            }}
        >
            <div className="title"
                style={{
                fontSize:"10vmin",
                gridArea:'title',
                fontFamily: `'Monofett', cursive`
            }}
            >
                Half<br/>Double
            </div>
            <div
                className="pagetitle"
                style={{
                    gridArea:'pagename',
                    background:'white',
                    padding:'2vmin'
                }}
            >
                Menu
            </div>
            {/* <button
                accesskey='l'
                onClick={console.log('hello')}
                    >Hello</button> */}
            <div
            className='highScore'
            style={{
                gridArea:'highscore',
                justifySelf: 'baseline',
                background:'white',
                padding:'1vmin',
                width:'min-content'
            }}
        >
            High Score 
            <br/>
            <br/>

            {highScore}
        </div>
                <Button
                    name="newGame"
                    text="New Game"
                    size={{width:"min-content",height:'min-content'}}
                    style={{
                        gridArea:'newgamebutton'
                    }}
                    color={colors.sg}
                    handleClick={newGameSelected}
                >
                </Button>
            </div>
    )
}

export default Menu
import { useMachine } from '@xstate/react';
import { random } from 'chroma-js';
import { createMachine, interpret,assign } from 'xstate';
import { send } from 'xstate/lib/actions'

const getNewTargetNumber = (context)=>{
    let numbers = [2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072]
    numbers.splice(numbers.indexOf(context.currentNumber),1)
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)]
    return randomNumber
}

const gameMachine = createMachine({
    predictableActionArguments: true,
    id:"gameMachine",
    initial:'starting',
    context:{
        countdown:3,
        score:0,
        targetNumber:0,
        currentNumber:2,
        timer:99,
    },
    states:{
        starting:{
            entry:[assign({score:0,
                timer:(c,e)=>60,
                countdown:(c,e)=>3,
                currentNumber:(c,e)=>2,
                targetNumber:(c,e)=>getNewTargetNumber(c)
            },
                )],
            invoke: {
                src: (context) => (callback, onrecieve) => {

                    let countdown = context.countdown
                      const interval = setInterval(() => {
                        if(countdown > 1 ){
                            countdown = countdown -1
                            callback('TICK')
                        }else{
                            callback('RUN')
                        }
                          
                        }, 1000);
                        
                    return () => {
                      clearInterval(interval);
                    };

                }
              },
              on: {
                TICK: {
                    actions: assign({
                        countdown: (context) => {
                            return context.countdown -1
                        }
                      }),
                 
                },
                RUN:{
                    target:'running',
                    // actions:(context,event)=>{console.log('hello')}
                }
              }
        },
        running:{
            invoke:{
                id:'game',
                src: (context) => (callback, onrecieve) => {
                    onrecieve((event)=>{
                        // if(event.type === 'RIGHT'){}
                        // if(event.type === 'LEFT'){}
                    })

                    let timer = context.timer
                      const interval = setInterval(() => {
                        if(timer > 1 ){
                            timer = timer -1
                            callback('TICK')
                        }else{
                            callback('ENDED')
                        }
                        }, 1000);
                        
                    return () => {
                      clearInterval(interval);
                    };

                }
            },
            on:{
                TICK: {
                    actions: assign({
                        timer: (context) => {
                            return context.timer -1
                        }
                      }),
                },
                ENDED:{
                    target:'ended',
                    actions:(context,event)=>{}
                },
                // update change events to change score and target number as needed
                // reassign target number when new current number matches
                ArrowRight:{
                    actions:[assign({
                        currentNumber:(context)=>{
                            const newCurrentNumber = context.currentNumber*2
                            return (newCurrentNumber > 131072 ? 131072 : newCurrentNumber   ) 
                        }
                    })/* ,send({ type: 'RIGHT' }, { to: 'game' }) */]
                },
                ArrowLeft:{
                    actions:[assign({
                        currentNumber:(context)=>{
                            const newCurrentNumber = context.currentNumber === 2? 2 :context.currentNumber/2
                            return newCurrentNumber
                        }
                    })/* ,send({ type: 'LEFT' }, { to: 'game' }) */]
                },
                MATCH:{
                    actions:[assign({
                        targetNumber:(context)=>getNewTargetNumber(context),
                        score:(context)=>context.score +1
                    }),
                ]
                },
                TIMEOUT:{target:'ended'},
                MediaPlayPause:{target:'paused'}
            }

        },
        paused:{
            // actions:send({type:'PAUSE'},{to:'timer'}),
            on:{
                MediaPlayPause:{target:'running'},
                EXIT: {target:'exitGame'}
            }
        },
        ended:{
            // either when new game is selected, or some other way, timer and countdown must be reset
            on:{NEW_GAME:{target:'starting'}},
            // entry:[(context,event)=>{console.log('hello from ended state')}]
        },
        exitGame:{
            type:'final',
        }
    }
})

export {gameMachine}
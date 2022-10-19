import { useMachine } from '@xstate/react';
import { createMachine, interpret } from 'xstate';


const applicationStateMachine = createMachine({
    predictableActionArguments: true,
    id:"applicationState",
    initial:'menu',
    states:{
        menu:{
            on:{
                NEW_GAME:{
                    target:'game'
                },
                actions:(context,event)=>{}
            }
        },
        game:{
            on:{
                MENU:{
                    target:'menu'
                }
            }
        },
    },

})
const applicationStateInterpreter = interpret(applicationStateMachine).start()
export  {applicationStateInterpreter}
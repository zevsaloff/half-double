import './App.css';
import './reset.scss'
import colors from './colors';
import Menu from './Components/Menu'
import Game from './Components/Game';
import { useMachine,useActor} from '@xstate/react';
import {applicationStateInterpreter} from './state';
import { useEffect } from 'react';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const App = () => {
  const [state,send] = useActor(applicationStateInterpreter)
 
  return (
    <div 
    className="App"
    style={{
      background: colors.gb,
      width:"100vw",
      height:"100vh"
    }}
    >
      {
        state.value==='menu'? <Menu></Menu>:<Game></Game>
      }
     
    </div>
  );
}

export default App;

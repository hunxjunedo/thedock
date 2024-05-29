
import './App.css';
import {Thedock} from '../node_modules/thedock/dist/index'
import { useState } from 'react';

function App() {
  const [percentage, setpercentage] = useState(0)
  return (
   <Thedock 
   icons={['src1', 'src2', 'src1', 'src2', 'src1', 'src2', 'src1']}
   ar={'1/1'}
   iconWidth={50}
   containerWidth={'50vw'}
   percentage={percentage}
   setpercentage={setpercentage}
   configuration={[2,3,2]} 
   
   />
  );
}

export default App;

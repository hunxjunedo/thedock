
import './App.css';
import Thedock from 'thedock';
import { useEffect, useState } from 'react';
import ControlBar from './controlBar';
import bgimage from './bg.jpg'

function App() {
  const [percentage, setpercentage] = useState(0)
  const [maxboxes, setmaxboxes] = useState(4)
  const [texts, settexts] = useState([
    'App Store', 'Camera', 'Settings', 'Todo', 'Discord', 'Adobe XD', 'Adobe Illustrator', 'Netflix', 'Adobe Photoshop', 'Adobe Premier Pro', 'Safari', 'Spotify', 'VS Code', 'YouTube'
  ])
  const [icons, seticons] = useState([
    './icons/apps/1.png',
    './icons/apps/2.png',
    './icons/apps/3.png',
    './icons/apps/4.png',
    './icons/apps/5.png',
    './icons/apps/6.png',
    './icons/apps/7.png',
    './icons/apps/8.png',
    './icons/apps/9.png',
    './icons/apps/10.png',
    './icons/apps/11.png',
    './icons/apps/12.png',
    './icons/apps/13.png',
    './icons/apps/14.png'

  ])
  const [heading, setheading] = useState('Apps')
  const ismobile = window.innerWidth <= 600
  const heightfactor = ismobile ? 0.4 : 0.6

  useEffect(()=>(
    setTimeout(() => {
      setpercentage(1.1)
    }, 300)

  ), [])
  const stylings = {
    heading: {position: 'absolute', top: 30, float: 'center', color: 'white' },
    father: { display: 'grid', background: `url(${bgimage})`, backgroundSize: 'cover', justifyItems: 'center', overflow: 'clip', alignItems: 'center', width: '100vw', height: '100vh' },
    dockholder: { backdropFilter: 'blur(20px) saturate(2)', background: 'rgb(80, 80, 80, 0.7)', borderRadius: 50, padding: 20, width: 'fit-content', height: 'fit-content' }
  }
  return (
    <>
      <div style={stylings.father}>
        <h1 style={stylings.heading}>{heading}</h1>
<ControlBar {...{icons, settexts, setheading, seticons, heading, maxboxes,setmaxboxes, percentage, setpercentage}} />
        <div style={stylings.dockholder}
        >
          <Thedock
            icons={icons}
            ar={`${window.innerWidth}/${window.innerHeight * heightfactor }`}
            iconWidth={!ismobile ? 40 : 30}
            containerWidth={ismobile ? '80vw' : '50vw'}
            percentage={percentage}
            setpercentage={setpercentage}
            maxBoxes={maxboxes}
            startingPosition={'middle-center'}
            showText={!ismobile}
            texts={texts}
            marginForText={8}
            iconstyles={{cursor: 'pointer'}}
            onclickHandler={(index, src, text)=>(alert(index))}
            textstyles={{margin: '10px !important', padding: 0, color: 'white', opacity: 0.4, fontSize: 8}}
          />

        </div>

      </div>
    </>
  );
}

export default App;

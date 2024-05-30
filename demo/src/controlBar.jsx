import {CupSoda, Github, LayoutGrid, MoveDiagonal2, Package} from 'lucide-react'
export default function ControlBar({seticons, settexts, maxboxes, percentage, setpercentage, setmaxboxes, icons, heading, setheading}){
    const ismobile = window.innerWidth <= 600
    const iconssize = ismobile ? 15 : 20
    const stylings = {
        ControlBar:{
            width: ismobile ? '80vw' : '5vw',
            justifyContent: 'center',
            height: ismobile ? '10vh' : 'fit-content',
            padding: ismobile ? '0 10px' : '10px 0',
            backdropFilter: 'blur(8px)',
            borderRadius: 20,
            background: 'rgb(10, 10, 10, 0.2)',
            display: 'flex',
            gridAutoFlow: 'row',
            position: 'absolute',
            flexDirection: ismobile ? 'row' : 'column',
            left: ismobile ? 'calc (50% - 40vw)' : 20,
            bottom: ismobile ? 20 : 'calc(50% - 25vh)',
            gridTemplateColumns: '100%',
            alignItems: 'center',
            alignItems: 'center',
            flexWrap: 'no-wrap',
            justifyItems: 'center',
            gap: 5
        },
        vr: {
            height: '90%',
            borderLeft: '1px solid gray'
        }
    }

    const handler = (heading, icons, maxs, texts) => {
        setmaxboxes(maxs)
        setpercentage(0)
        seticons(icons);
        setTimeout(() => {
            setpercentage(1.1)
        }, 100);
        setheading(heading);
        settexts(texts)
        console.log(icons)
    }
    const config = [
        {thisheading: 'Apps', maxBoxes: 4, Icon: LayoutGrid,  icons:
      [   
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
    ], thistexts: ['App Store', 'Camera', 'Settings', 'Todo', 'Discord', 'Adobe XD', 'Adobe Illustrator', 'Netflix', 'Adobe Photoshop', 'Adobe Premier Pro', 'Safari', 'Spotify', 'VS Code', 'YouTube']},
    {thisheading: 'Chill Time', maxBoxes: 3, icons: [
        './icons/freetime/1.png',
        './icons/freetime/2.png',
        './icons/freetime/3.png',
        './icons/freetime/4.png',
        './icons/freetime/5.png',
        './icons/freetime/6.png',
        './icons/freetime/7.png',
        './icons/freetime/8.png',

    
    ], thistexts: ['Travel', 'Sunbath', 'Photography', 'Cards', 'Movie', 'Ludo', 'Diving', 'Music'], Icon: CupSoda}
    ]
    const redirect = type => {
        window.location.href = type === 'gh' 
        ? 'https://www.github.com/hunxjunedo/thedock' : 'https://www.npmjs.org/thedock'
    
    }
    const Iconholder = ({selected, children, onClick}) => {
        return(
            <div onClick={onClick} style={{ overflowX: ismobile ? 'scroll' : 'hidden', width: ismobile ? 'auto' : '70%', height: ismobile ? '70%' : 'auto', cursor: 'pointer', display: 'grid', alignItems: 'center', justifyItems:'center', borderRadius: 15, aspectRatio: '1/1', background: selected ? '#62bf83' : 'rgb(240, 240, 240)'}}>
                {children}
            </div>
        )
    }
    return(
        <div style={stylings.ControlBar}>
            {
                config.map(({Icon,thisheading, icons, maxBoxes, thistexts}) => (
                     <Iconholder selected={heading === thisheading} onClick={()=>{handler(thisheading, icons, maxBoxes, thistexts)}}>
                        <Icon size={iconssize} />
                     </Iconholder>
                ))
            }
            {
                ismobile ? (<div style={stylings.vr}></div>) :   ( <hr style={{width: '70%'}} />)
            }
            <Iconholder onClick={()=>(setpercentage(1.1))} >
            <MoveDiagonal2 size={iconssize} />
            </Iconholder>
            <Iconholder onClick={()=>(redirect('gh'))} >
            <Github size={iconssize} />
            </Iconholder>
            <Iconholder onClick={()=>(redirect('npm'))} >
            <Package size={iconssize} />
            </Iconholder>
        </div>
    )
}
import React, { useState } from "react"
export default function Thedock({configuration, style, iconHeight, iconWidth, maxBoxes, autoArrange, containerHeight, setpercentage, percentage, containerWidth, iconstyles, icons, startingPosition}){

    //STATES
    const [heigth, setheight] = useState(0)
    const [alignment, setAlignment] = useState(['start, start'])
    const [allIconsDestiny, setAllIconsDestiny] = useState([]);


    const max = (arr) => {
        let temp = arr.map(elem=>elem);
        temp.sort((a, b)=>(a - b));
        return temp[temp.length - 1];
    }

      //STYLES
    const stylings = {
        main: {
            width: containerWidth,
            borderRadius: 20,
            marginLeft: 1,
            height: containerHeight,
            display: 'grid',
            alignItems: alignment[0],
            justifyItems: alignment[1],
            backdropFilter: 'blur(4px)'
        },
        icon: {
            position: 'absolute',
            transition: '0.1s',
            width: iconWidth,
            heigth: iconHeight
        }
    }

    //the bounce
    React.useEffect(()=>{

        if(percentage == 1.1){
            setTimeout(() => {
                setpercentage(0.9)
            }, 100);
        }else if(percentage == 0.9){
            setTimeout(() => {
                setpercentage(1.05)
            }, 100);
        }else if(percentage == 1.05){
            setTimeout(() => {
                setpercentage(0.95)
            }, 100);
        }else if(percentage == 0.95){
            setTimeout(() => {
                setpercentage(1)
            }, 100);
        }
        // else if(percentage == 1.1){
        //     setTimeout(() => {
        //         setpercentage(0.9)
        //     }, 20);
        // }else if(percentage == 0.9){
        //     setTimeout(() => {
        //         setpercentage(1)
        //     }, 30);
        // }
    }, [percentage])
    

    //make the virtual boxes
    React.useEffect(()=>{
    //determine the max numebr of boxes in a row
    let maxBoxes = max(configuration);
    //now divide this by the container's width    
    let standard_width = document.querySelector('.thedock_container').clientWidth;
    let boxwidth = standard_width / maxBoxes 
    //height of box = width of box
    let standard_height = document.querySelector('.thedock_container').clientHeight
    let boxHeight = standard_height / configuration.length
    console.log(boxHeight, standard_height)
    //so each box in any row will have this clientWidth, now get the coords of the container
    let containerXstart = document.querySelector('.thedock_container').offsetLeft;
    let containerXend = containerXstart + standard_width;
    let containerYstart =  document.querySelector('.thedock_container').offsetTop;
    let containerYend  = containerYstart + standard_height
    // now begin the math
    // row by row
    let allcords = []
    configuration.forEach((row, rowindex) => {
        //count the excess space
        // let rowCords = [];
        let excessSpace = standard_width - row * boxwidth
        //now get the coordiantes of start of first icon and end of last icon
        let firsticonstart = containerXstart + excessSpace/2;
        let lasticonend = containerXend - excessSpace/2;
        //now get the destiny spots: boxwidth/2 + a x boxwidth
        for(let a = 0; a < row; a++){
            let currentCoordinates = []
            //x coordinate
            currentCoordinates.push(firsticonstart + boxwidth/2 + a*boxwidth)
            //y coordinate
            currentCoordinates.push(containerYstart + boxHeight/2 + rowindex*boxHeight)
            allcords.push(currentCoordinates)
            console.log(containerYstart)
            console.log(currentCoordinates)

        }
        // allcords.push(rowCords)

    })  
    
    //now begin preparing the icons and thier positions
    let coords = [];
    let alignment = []
    let directionx = 0;
    let directiony = 0;
    if(startingPosition === 'top-left'){
        coords = [containerXstart + 0, containerYstart + 0];
        alignment = ['start', 'start'];
        directionx = -1;
        directiony = -1
    }else if(startingPosition === 'top-center'){
        coords = [containerXstart + standard_width/2, containerYstart + 0];
        alignment = ['start', 'center'];
        directiony = - 1
    }else if(startingPosition === 'top-right'){
        coords = [containerXstart + standard_width, containerYstart + 0];
        alignment = ['start', 'end'];
        directiony = -1;
        directionx = 1
    }else if(startingPosition === 'middle-left'){
        coords = [containerXstart + 0, containerYstart + standard_height/2];
        alignment = ['center', 'start'];
        directionx = -1
    }else if(startingPosition === 'middle-center'){
        coords = [containerXstart + standard_width/2, containerYstart + standard_height/2];
        alignment = ['center', 'center'];
    }else if(startingPosition === 'middle-right'){
        coords = [containerXstart + standard_width, containerYstart + standard_height/2];
        alignment = ['center', 'end'];
        directionx = 1
    }else if(startingPosition === 'bottom-left'){
        coords = [containerXstart + 0, containerYstart + standard_height];
        alignment = ['end', 'start'];
        directionx = -1;
        directiony = 1
    }else if(startingPosition === 'bottom-center'){
        coords = [containerXstart + standard_width/2, containerYstart + standard_height];
        alignment = ['end', 'center'];
        directiony = 1
    }else if(startingPosition === 'bottom-right'){
        coords = [containerXstart + standard_width, containerYstart + standard_height];
        alignment = ['end', 'end'];
        directionx = 1;
        directiony = 1
    }

    //initialCords of all the icons are available, apply vectors anf get final coords


    let allIconsOnDestiny = icons.map((iconSRC, index) => {
        //  PD = OD - OP, Im sorry but maths is hard to read ngl
        let OD = allcords[index];
        let OP = coords
        let PD = [OD[0] - OP[0], OD[1] - OP[1]];
        //now subtract the icon's own how
        

        PD[0] = Math.round(PD[0] + directionx*iconWidth/2);
        PD[1] = Math.round(PD[1] + directiony*iconHeight/2);
        console.log(PD)

        
        
    
        //voila, now we know how much each point has to travel from P!
        return {
            Cmpnt: ({transStyles}) => (<img className="thedock_icon" style={{...stylings.icon, ...transStyles, ...iconstyles}} src={iconSRC} />),
            destiny: PD
        }
    })


    setAlignment(alignment)
    setAllIconsDestiny(allIconsOnDestiny)
    setheight(standard_height)
    
    }, [configuration, containerWidth, icons, startingPosition, containerHeight]);



    return (
       <div style={{...stylings.main, ...style}} className="thedock_container">
        {
            allIconsDestiny.map(({Cmpnt, destiny}) => {
                return (<Cmpnt 
                    transStyles={
                        {transform: 
                            `translate(${  destiny[0] * percentage   }px, ${   destiny[1] * percentage  }px)`
                        }
                    } 
                    />)
            })
        }
       </div>
    )
}
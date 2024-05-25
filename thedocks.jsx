import React, { useState } from "react"
export default function Thedock({ configuration, ar, textstyles, marginForText, showText, texts, style,  iconWidth, maxBoxes,  containerHeight, setpercentage, percentage, containerWidth, iconstyles, icons, startingPosition }) {

    //STATES
    const [heigth, setheight] = useState(0)
    const [alignment, setAlignment] = useState(['start, start'])
    const [allIconsDestiny, setAllIconsDestiny] = useState([]);


    //FUNCTIONS
    
    //for max of an array
    const max = (arr) => {
        let temp = arr.map(elem => elem);
        temp.sort((a, b) => (a - b));
        return temp[temp.length - 1];
    }

    //to calculate the final position of each icon
    const destinyDecider = (tempconfiguration, containerYstart, allcords, boxHeight, boxwidth, standard_width, containerXstart, containerXend) => {
        tempconfiguration.forEach((row, rowindex) => {
            //count the excess space
            // let rowCords = [];
            let excessSpace = standard_width - row * boxwidth
            //now get the coordiantes of start of first icon and end of last icon
            let firsticonstart = containerXstart + excessSpace / 2;
            let lasticonend = containerXend - excessSpace / 2;
            //now get the destiny spots: boxwidth/2 + a x boxwidth
            for (let a = 0; a < row; a++) {
                let currentCoordinates = []
                //x coordinate
                currentCoordinates.push(firsticonstart + boxwidth / 2 + a * boxwidth)
                //y coordinate
                currentCoordinates.push(containerYstart + boxHeight / 2 + rowindex * boxHeight)
                allcords.push(currentCoordinates)

            }
            // allcords.push(rowCords)

        })
    }

    //to determine the arrangment of icons
    let onePosition = false
    const configHandler = (n, max, tempconfiguration) => {
        if (max <= 0 || n < 0) {
            return

        }
        if (max - n * 2 >= 0 && n !== 0) {
            tempconfiguration.unshift(n);
            tempconfiguration.push(n);
            onePosition = n == 1
            configHandler(n - 1, max - n * 2)
        } else {
            n > 1 ? configHandler(n - 1, max) : (onePosition ? tempconfiguration[0]++ : tempconfiguration.unshift(n))

        }
    }

    //to calculate the initial position of each icon, and its direction of movement
    const spawnPlaceDecider = (startingPosition, containerXstart, containerYstart, standard_width, standard_height) => {

      
        let coords = [];
        let alignment = []
        let directionx = 0;
        let directiony = 0;
        if (startingPosition === 'top-left') {
            coords = [containerXstart + 0, containerYstart + 0];
            alignment = ['start', 'start'];
            directionx = -1;
            directiony = -1
        } else if (startingPosition === 'top-center') {
            coords = [containerXstart + standard_width / 2, containerYstart + 0];
            alignment = ['start', 'center'];
            directiony = - 1
        } else if (startingPosition === 'top-right') {
            coords = [containerXstart + standard_width, containerYstart + 0];
            alignment = ['start', 'end'];
            directiony = -1;
            directionx = 1
        } else if (startingPosition === 'middle-left') {
            coords = [containerXstart + 0, containerYstart + standard_height / 2];
            alignment = ['center', 'start'];
            directionx = -1
        } else if (startingPosition === 'middle-center') {
            coords = [containerXstart + standard_width / 2, containerYstart + standard_height / 2];
            alignment = ['center', 'center'];
        } else if (startingPosition === 'middle-right') {
            coords = [containerXstart + standard_width, containerYstart + standard_height / 2];
            alignment = ['center', 'end'];
            directionx = 1
        } else if (startingPosition === 'bottom-left') {
            coords = [containerXstart + 0, containerYstart + standard_height];
            alignment = ['end', 'start'];
            directionx = -1;
            directiony = 1
        } else if (startingPosition === 'bottom-center') {
            coords = [containerXstart + standard_width / 2, containerYstart + standard_height];
            alignment = ['end', 'center'];
            directiony = 1
        } else if (startingPosition === 'bottom-right') {
            coords = [containerXstart + standard_width, containerYstart + standard_height];
            alignment = ['end', 'end'];
            directionx = 1;
            directiony = 1
        }
        return [coords, alignment, directionx, directiony]

    }

    //STYLES
    const stylings = {
        main: {
            width: containerWidth,
            borderRadius: 20,
            marginLeft: 1,
            height: heigth,
            display: 'grid',
            alignItems: alignment[0],
            justifyItems: alignment[1],
            backdropFilter: 'blur(4px)'
        },
        box:{
            position: 'absolute',
            transition: '0.1s',
            display: 'grid',
            justifyItems: 'center',
            alignItems: 'center'
        }
    }


    //THE BOUNCE EFFECT
    React.useEffect(() => {

        if (percentage == 1.1) {
            setTimeout(() => {
                setpercentage(0.9)
            }, 100);
        } else if (percentage == 0.9) {
            setTimeout(() => {
                setpercentage(1.05)
            }, 100);
        } else if (percentage == 1.05) {
            setTimeout(() => {
                setpercentage(0.95)
            }, 100);
        } else if (percentage == 0.95) {
            setTimeout(() => {
                setpercentage(1)
            }, 100);
        }
    }, [percentage])

    //THE MAIN MATHEMATICAL UNIT
    React.useEffect(() => {
        let tempconfiguration = configuration !== undefined ? configuration : [maxBoxes];

        //auto configuration handler
        if (!configuration && maxBoxes) {
            configHandler(maxBoxes - 1, icons.length - maxBoxes, tempconfiguration)
        }


        //determine the max numebr of boxes in a row
        let PotentiallyMaxBoxes = max(tempconfiguration);

        //now divide this by the container's width    
        let standard_width = document.querySelector('.thedock_container').clientWidth;
        let boxwidth = standard_width / PotentiallyMaxBoxes


        //height of box = width of box
        //use the aspect ratio
        let ratioXtoY = ar.split('/');
        let factorForY = ratioXtoY[1] / ratioXtoY[0]
        marginForText = showText ? marginForText : 0
        let boxHeight = factorForY * boxwidth + marginForText
        let standard_height = boxHeight * tempconfiguration.length


        //so each box in any row will have this clientWidth, now get the coords of the container
        let containerXstart = document.querySelector('.thedock_container').offsetLeft;
        let containerXend = containerXstart + standard_width;
        let containerYstart = document.querySelector('.thedock_container').offsetTop;
        let containerYend = containerYstart + standard_height

        //now get the destiny of each icon
        let allcords = [];
        destinyDecider(tempconfiguration, containerYstart, allcords, boxHeight, boxwidth, standard_width, containerXstart, containerXend)
        
        //now get the initial position of each icon
        const [coords, alignment, directionx, directiony] = spawnPlaceDecider(startingPosition, containerXstart, containerYstart, standard_width, standard_height)


        //initialCords of all the icons are available, apply vectors anf get final coords


        let allIconsOnDestiny = icons.map((iconSRC, index) => {
            //  PD = OD - OP, Im sorry but maths is hard to read ngl
            let OD = allcords[index];
            let OP = coords
            let PD = [OD[0] - OP[0], OD[1] - OP[1]];
            //now subtract the icon's own how


            PD[0] = Math.round(PD[0] + directionx * boxwidth / 2);
            PD[1] = Math.round(PD[1] + directiony * boxHeight / 2);




            //voila, now we know how much each point has to travel from P!
            return {
                Cmpnt: ({ transStyles, text }) => (
                <div className="box" style={{...transStyles, ...stylings.box, height: boxHeight, width: boxwidth}}>
                    <img className="thedock_icon" style={{ ...stylings.icon, aspectRatio: ar, width: boxwidth, maxWidth: iconWidth === 'auto' ? 'auto' : iconWidth - 0,  height: 'auto', ...iconstyles }} src={iconSRC} />
                    {showText ?  <p style={{...textstyles}}>{text}</p> : ''}
                </div>),

                destiny: PD,
                text: showText ? texts[index] : ''
            }
        })


        setAlignment(alignment)
        setAllIconsDestiny(allIconsOnDestiny)
        setheight(standard_height)


    }, [configuration, maxBoxes, containerWidth, icons, startingPosition, containerHeight]);



    return (
        <div  style={{ ...stylings.main, ...style }} className="thedock_container">
            {
                allIconsDestiny.map(({ Cmpnt, destiny, text }) => {
                    return (<Cmpnt
                        transStyles={
                            {
                                transform:
                                    `translate(${destiny[0] * percentage}px, ${destiny[1] * percentage}px)`
                            }
                        }
                        text={text}
                    />)
                })
            }
        </div>
    )
}
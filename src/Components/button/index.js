
import { forwardRef, useRef } from "react"



const Button = forwardRef((props,ref) => {
    const {handleClick,name,text,size,color,style,className} = props
    let buttonRef = useRef(null)
    buttonRef = ref ? ref : buttonRef
    // add hover state and animation?
    const  onClick = () =>{
        const clickAnimation = [
            [ 
              
                {
                    borderLeftColor: "white",
                    borderTopColor: "white",
                    borderBottomColor: "dimgrey",
                    borderRightColor: "dimgrey",
                    boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.75)"
                },
                {
                    borderLeftColor: "dimgrey",
                    borderTopColor: "dimgrey",
                    borderBottomColor: "white",
                    borderRightColor: "white",
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.75)"
                },
                {
                    borderLeftColor: "white",
                    borderTopColor: "white",
                    borderBottomColor: "dimgrey",
                    borderRightColor: "dimgrey",
                    boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.75)"
                }
            ],
            200
        ]
        buttonRef.current.animate(...clickAnimation,15)
        handleClick()
     }
     return(
     <div
        //  make focusable
        tabIndex={0}
        ref={buttonRef}
        className={className}
        style={{
            borderStyle: "solid",
            borderWidth: "4px",
            borderLeftColor: "white",
            borderTopColor: "white",
            borderBottomColor: "dimgrey",
            borderRightColor: "dimgrey",
            boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.75)",
            background: color,
            // remove size prop?
            // ...size,
            ...style,
        }}
        onClick={onClick}
    >
        <div
            className="inButton"
            style={{
                padding: "20px",
                textAlign:"center",
                fontFamily: `'Press Start 2P', cursive`,
                userSelect: "none",
            }}
        >
            {text}
        </div>
     </div>
     )
 })








export default Button
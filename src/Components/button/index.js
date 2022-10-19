
const Button = ({handleClick,name,text,size,color}) => {
   const  onClick = () =>{
        handleClick()
    }
    return(
    <button
        className="New Game"
        style={{
            background: color,
            ...size,
        }}
        onClick={onClick}
    >
        {text}
    </button>
    )
}

export default Button
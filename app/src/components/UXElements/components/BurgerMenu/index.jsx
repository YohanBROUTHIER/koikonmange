import './index.css'

const BurgerMenu = ({handleClick, color}) => {

    // background: var(--colorbg4);

    return(
        <>
            <label className="burgerHeader" >
                <input  onClick={handleClick} type="checkbox"/>
                <span style={color}></span>
                <span style={color}></span>
                <span style={color}></span>
            </label>  
        </>
    )
}

export default BurgerMenu
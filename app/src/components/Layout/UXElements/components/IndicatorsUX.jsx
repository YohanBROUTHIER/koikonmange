

const IndicatorsUX = ({handleChange, name}) => {
    return(
        <li>
            <input type="checkbox" onChange={handleChange}/>
            <label htmlFor="">{name}</label>
        </li>
    )
}

export default IndicatorsUX;
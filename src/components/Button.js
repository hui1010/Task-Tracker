import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {

    // const onClick = (e) =>{
    //     console.log(e.target)
    // }

    return <button onClick={onClick} style={{backgroundColor: color}} className='btn'>{text}</button>            
}

Button.defaultProps = {
    color: 'steelbule'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Button

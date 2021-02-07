import PropTypes from 'prop-types'
import Button from './Button.js'
import {useLocation} from 'react-router-dom'

const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation();//have access to location.pathname

    return (
        <header className='header'>
            <h1>{title} Task Tracker</h1>
            {location.pathname ==="/" && <Button color={showAdd ? 'red': 'green'} 
            text={showAdd ? 'Close': 'Add'} onClick= {onAdd}/>}
            {/* <Button color='red' text='Hi!!'/> */}
        </header>
    )
}

Header.defaultProps = {
    title: 'Hej hej hej'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

//<h1 style={{backgroundColor: 'red'}}>{title} Task Tracker</h1>
//OR
//<h1 style={headingStyle}>{title} Task Tracker</h1>
// const headingStyle = {
//     backgroundColor: 'orange'
// }

export default Header

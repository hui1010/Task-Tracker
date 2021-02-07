import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
            <Link to="/about">Aboutie</Link>
        </footer>
    )
}

export default Footer

import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                <Link to="/" className="logo">
                    GEEKSHOP
                </Link>
                
                <nav className="main-nav">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Главная
                    </NavLink>
                    <NavLink 
                        to="/categories" 
                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    >
                        Категории
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
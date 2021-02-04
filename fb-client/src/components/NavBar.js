import React, { useContext, useState } from 'react'
import './NavBar.css'
import { AuthContext } from '../contexts/auth'
import { FaAppStoreIos } from "react-icons/fa";
import { Link } from 'react-router-dom';


const NavBar = () => {
    const { user, logout } = useContext(AuthContext)
    console.log(user)
    const pathname = window.location.pathname;
    const path = (pathname === '/') ? 'home' : pathname.substr(1);
    const [activeMenu, setActiveMenu] = useState(path)

    const onMenuClick = (activeItem) => {
        setActiveMenu(activeItem);
    }

    return (
        <div className="navbar">
            <div className="navbar__left">
                <FaAppStoreIos size={35} color="white" />
                {user && user.user.username}
            </div>
            <div className="navbar__right">
                <div className={`navbar__menuitem ${activeMenu === 'home' ? "active" : ""}`} onClick={() => onMenuClick('home')}>
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar__auth">
                    {user && user.token && user.user && (<div className='navbar__menuitem' onClick={() => logout()}>
                        <Link to="/">Logout</Link>
                    </div>)}
                    {!user && (<>
                        <div className={`navbar__menuitem ${activeMenu === 'login' ? "active" : ""}`} onClick={() => onMenuClick('login')}>
                            <Link to="/login">Login</Link>
                        </div>
                        <button className="navbar__button" onClick={() => onMenuClick('')}><Link to="/register">Register</Link></button>

                    </>)}
                </div>
            </div>

        </div>
    )
}

export default NavBar

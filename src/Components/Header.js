import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Header.css'

const Header = () => {
    return (
        <div className="Header-section">
            <Link className="back-button" to="/home-page" >Back</Link>
            <h2>Career Day</h2>
            <div>person</div>
        </div>
    )
}

export default Header
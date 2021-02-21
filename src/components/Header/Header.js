import React from 'react';
import './Header.sass';
import columns from '../Columns/cols.js';

function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="header__left">
                    <select className="header__left-colums">
                        {columns.map(item => {
                            return item.cells.map((cell, index) => {
                                return (
                                    <option key={index} value={`${cell.symbol.toUpperCase()}${cell.number}`}>
                                        {`${cell.symbol.toUpperCase()}${cell.number}`}
                                    </option>
                                )
                            })
                        })}
                    </select>
                </div>

                <div className="header-more"></div>

                <div className="header__right">
                    <div className="header__right-settings">
                        <button className="header__right-settings-cancel"></button>
                        <button className="header__right-settings-done"></button>
                        <button className="header__right-settings-formul"></button>
                    </div>

                    <input type="text" className="header__right-value" />
                </div>
            </div>
        </header>
    )
}

export default Header;
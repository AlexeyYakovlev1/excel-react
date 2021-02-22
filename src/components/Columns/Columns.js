import React from 'react';
import './Columns.sass';
import columns, {alphabet} from './cols.js';

function Columns() {
    function clickActive(event) {
        event.target.className += " active-cell";

        const activeCell = document.querySelectorAll('.active-cell');
        const columnsRightHeaderListItem = document.querySelectorAll('.columns__right-header-list-item');
        const columnsRowListItem = document.querySelectorAll('.columns__row-list-item');
        const headerLeftColums = document.querySelector('.header__left-colums');

        if (event.target.className !== activeCell[0]) {
            activeCell[0].className = activeCell[0].className.replace(' active-cell', '');
        }

        activeCell.forEach(active => {
            const symbol = active.dataset.symbol;
            const row = active.dataset.row;
            headerLeftColums.value = `${symbol.toUpperCase()}${row}`
            
            columnsRightHeaderListItem.forEach(item => {
                if (item.dataset.symbol.toUpperCase() === symbol) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            columnsRowListItem.forEach(item => {
                if (item.dataset.row === row) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })
        });
    }

    return (
        <div className="columns">
            <div className="container">
                <div className="columns__row">
                    <ul className="columns__row-list">
                        {alphabet.map((_, index) => {
                            return (
                                <li
                                    key={index}
                                    className="columns__row-list-item"
                                    data-row={index+1}
                                >
                                    {index+1}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                    <div className="columns__right">
                        <div className="columns__right-header">
                            {columns.map((item, index) => {
                                return (
                                    <ul className="columns__right-header-list" key={index}>
                                        <li
                                            className="columns__right-header-list-item"
                                            data-symbol={item.symbol}
                                        >
                                            {item.symbol}
                                        </li>

                                        {item.cells.map((cell, idx) => {
                                            return (
                                                <input
                                                    key={idx}
                                                    onClick={(event) => clickActive(event)}
                                                    className="columns__right-cells-list-item"
                                                    data-cell={`${cell.symbol.toUpperCase()}${cell.number}`}
                                                    data-row={`${cell.number}`}
                                                    data-symbol={`${cell.symbol.toUpperCase()}`}
                                                />
                                            )
                                        })}
                                    </ul>
                                )
                            })}
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Columns;
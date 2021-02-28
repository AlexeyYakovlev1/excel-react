import React from 'react';
import './styles/Header.sass';
import './styles/Columns.sass';
import columns, {alphabet} from './cols.js';

function App() {
    const selectRef = React.useRef();
    const formulaRef = React.useRef();
    const [formula, setFormula] = React.useState('');
    
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

    function handlerSubmit(event) {
        event.preventDefault();

        if (formulaRef.current.value) {
            const activeCell = selectRef.current.value;
            const columnsRightCellsListItem = document.querySelectorAll('.columns__right-cells-list-item');

            columnsRightCellsListItem.forEach(item => {
                if (item.dataset.cell === activeCell) {
                    if (/=[а-я]{3,10}\([a-z]{1}\d+[\;|\,][a-z]{1}\d+\)/gi.test(formula)) {
                        const findCells = formula.match(/[a-z]{1}\d+/gi);
                        const formulaInput = formula.match(/[a-я]{3,10}/);

                        switch(formulaInput[0]) {
                            case 'сумм':
                                try {
                                    let sum = 0;

                                    findCells.map((cell) => {
                                        columnsRightCellsListItem.forEach((cellItem) => {
                                            if (cellItem.dataset.cell.toLowerCase() === cell) {
                                                sum += +cellItem.value;
                                                item.value = sum;
                                            }
                                        })
                                    })
                                } catch (e) {
                                    item.value = e.message;
                                }

                                break;
                            default:
                                return item.value = '#ИМЯ?';
                        }
                    } else {
                        item.value = '#ИМЯ?';
                    }
                }
            })
        }
    }

    return (
        <div className="app">
            <header className="header">
                <div className="container">
                    <div className="header__left">
                        <select className="header__left-colums" ref={selectRef}> 
                            {columns.map(item => {
                                return item.cells.map((cell, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={`${cell.symbol.toUpperCase()}${cell.number}`}
                                        >
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
                            <button className="header__right-settings-formul" onClick={() => formulaRef.current.focus()}></button>
                        </div>

                        <form onSubmit={(event) => handlerSubmit(event)}>
                            <input
                                type="text"
                                className="header__right-value"
                                ref={formulaRef}
                                value={formula}
                                onChange={event => setFormula(event.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </header>

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
                                                        data-row={`${cell.number}`}
                                                        data-symbol={`${cell.symbol.toUpperCase()}`}
                                                        data-cell={`${cell.symbol.toUpperCase()}${cell.number}`}
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
        </div>
    )
}

export default App;
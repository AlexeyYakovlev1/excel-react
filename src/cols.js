const columns = [];
export const alphabet = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'
];

for (let i = 0; i < alphabet.length; i++) {
    const column = {
        symbol: alphabet[i],
        number: i+1,
        cells: []
    }

    for (let j = 0; j < alphabet.length; j++) {
        const cell = {
            symbol: alphabet[i],
            number: j+1
        }

        column.cells.push(cell);
    }

    columns.push(column);
}

export default columns;
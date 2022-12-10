import Sudoku from './Sudoku';
import SudokuSquare from './SudokuSquare';

const s1: Sudoku = [
    [0, 0, 0, 0, 1, 2, 0, 3, 4],
    [0, 0, 0, 0, 3, 4, 5, 0, 6],
    [0, 0, 0, 5, 6, 7, 1, 8, 2],
    [0, 0, 1, 0, 0, 8, 0, 2, 0],
    [0, 5, 8, 6, 0, 0, 0, 0, 7],
    [2, 0, 6, 0, 0, 1, 0, 5, 0],
    [0, 0, 3, 0, 8, 0, 2, 0, 7],
    [7, 0, 5, 0, 6, 0, 0, 8, 3],
    [0, 2, 8, 7, 0, 0, 6, 1, 5],
];

function result(sudoku: Sudoku): Sudoku | null {

    if (isInvalid(sudoku)) {
        sudoku.map((s: SudokuSquare, index: number) => {
            let possibilities = findPossibilities(s);

            s.forEach((cell: number, i: number) => {
                if (cell === 0) {
                    let row = getRow(index, i, sudoku);

                    let column = getColumn(index, i, sudoku);

                    let excludes = [...column, ...row];

                    let cellPossibilities = subtractPossibilities(possibilities, excludes);

                    cellPossibilities.forEach((n: number, index: number) => {
                        const copiedSudoku = sudoku;
                        copiedSudoku[index][i] = n;

                        result(copiedSudoku);
                    });
                }
            });
        });
    }
    else {
        console.log(sudoku);
    }
    return null;
}

function findPossibilities(square: SudokuSquare): number[] {
    const base = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let possibilities: number[] = [];

    base.map((n: number) => {
        if (square.indexOf(n) === -1) {
            possibilities.push(n);
        }
    });

    return possibilities;
}

function subtractPossibilities(possibilities: number[], excludes: number[]): number[] {

    let finals: number[] = [];

    possibilities.forEach((p: number) => {
        if (!excludes.includes(p)) {
            finals.push(p);
        }
    });

    return finals;
}

function getRow(indexSudoku: number, i: number, sudoku: Sudoku): SudokuSquare | number[] {
    let row: number[] = [];
    let squares: SudokuSquare[] = [];
    let indexes: number[] = [];

    if (indexSudoku >= 0 && indexSudoku <= 2) {
        indexes.push(0, 1, 2);
    } else if (indexSudoku >= 3 && indexSudoku <= 5) {
        indexes.push(3, 4, 5);
    } else if (indexSudoku >= 6 && indexSudoku <= 8) {
        indexes.push(6, 7, 8);
    }

    squares.push(sudoku[indexes[0]], sudoku[indexes[1]], sudoku[indexes[2]]);
    squares.map((s: SudokuSquare) => {
        row.push(...getRowNumbers(i, s));
    });

    return row;
}

function getRowNumbers(i: number, square: SudokuSquare): number[] {
    let numbers: number[] = [];
    let indexes: number[] = [];

    if (i >= 0 && i <= 2) {
        indexes.push(0, 1, 2);
    } else if (i >= 3 && i <= 5) {
        indexes.push(3, 4, 5);
    } else if (i >= 6 && i <= 8) {
        indexes.push(6, 7, 8);
    }

    square.forEach((n: number, index: number) => {
        if (index === indexes[0] || index === indexes[1] || index === indexes[2]) {
            numbers.push(n);
        }
    });

    return numbers;
}

function getColumn(indexSudoku: number, i: number, sudoku: Sudoku): SudokuSquare | number[] {
    let column: number[] = [];
    let squares: SudokuSquare[] = [];
    let indexes: number[] = [];

    if (indexSudoku === 0 || indexSudoku === 3 || indexSudoku === 6) {
        indexes.push(0, 3, 6);
    } else if (indexSudoku === 1 || indexSudoku === 4 || indexSudoku === 7) {
        indexes.push(1, 4, 7);
    } else if (indexSudoku === 2 || indexSudoku === 5 || indexSudoku === 8) {
        indexes.push(2, 5, 8);
    }

    squares.push(sudoku[indexes[0]], sudoku[indexes[1]], sudoku[indexes[2]]);
    squares.map((s: SudokuSquare) => {
        column.push(...getColumnNumbers(i, s));
    });

    return column;
}

function getColumnNumbers(i: number, square: SudokuSquare): number[] {
    let numbers: number[] = [];
    let indexes: number[] = [];

    if (i === 0 || i === 3 || i === 6) {
        indexes.push(0, 3, 6);
    } else if (i === 1 || i === 4 || i === 7) {
        indexes.push(1, 4, 7);
    } else if (i === 2 || i === 5 || i === 8) {
        indexes.push(2, 5, 8);
    }

    square.forEach((n: number, index: number) => {
        if (index === indexes[0] || index === indexes[1] || index === indexes[2]) {
            numbers.push(n);
        }
    });

    return numbers;
}

function isInvalid(sudoku: Sudoku): boolean {
   sudoku.reduce((i: number, square: SudokuSquare) => {
       return
   },.0)
}

result(s1);

use std::fmt;

struct Position {
    column: i32,
    row: i32,
}

struct Cell {
    position: Position,
}

impl fmt::Display for Cell {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "cell<row={}, column{}>", self.position.row, self.position.column)
    }
}

struct Grid {
    columns: i32,
    rows: i32,
    cells: Vec<Cell>,
}

impl Grid {
    fn new(rows: i32, columns: i32) -> Grid {
        Grid {
            rows,
            columns,
            cells: create_cells(rows, columns),
        }
    }

    fn size(&self) -> i32 {
        self.rows * self.columns
    }

    fn get_cell(&self, row: i32, column: i32) -> Option<&Cell> {
        if row < 0 || row > self.rows || column < 0 || column > self.columns {
            return None;
        }

        let index = position_to_index(row, column, self.columns) as usize;

        self.cells.get(index)
    }
}

fn create_cells(rows: i32, columns: i32) -> Vec<Cell> {
    let total = rows * columns;

    (0..total).map(|index| {
        Cell {
            position: index_to_position(index, columns),
        }
    }).collect()
}

fn index_to_position(index: i32, width: i32) -> Position {
    Position {
        column: index % width,
        row: index / width,
    }
}

fn position_to_index(row: i32, column: i32, width: i32) -> i32 {
    column + width * row
}

fn main() {
    let g = Grid::new(4, 4);

    println!("Grid size {}", g.size());

    let cell =  g.get_cell(2, 2);

    let cell = match cell {
        Some(c) => c,
        None => panic!("Not found")
    };

    println!("Found cell {}", cell);
}

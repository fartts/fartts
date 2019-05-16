use std::fmt;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Live = 1,
}

pub struct Universe {
    pub width: u32,
    pub height: u32,
    pub cells: Vec<Cell>,
}

impl Universe {
    pub fn new(width: u32, height: u32) -> Universe {
        let cells = (0..width * height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Live
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn update(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let i = self.get_index(row, col);
                let cell = self.cells[i];
                let live = self.live_neighbors(row, col);

                let next_cell = match (cell, live) {
                    (Cell::Live, x) if x < 2 => Cell::Dead,
                    (Cell::Live, 2) | (Cell::Live, 3) => Cell::Live,
                    (Cell::Live, x) if x > 3 => Cell::Dead,
                    (Cell::Dead, 3) => Cell::Live,
                    (otherwise, _) => otherwise,
                };

                next[i] = next_cell;
            }
        }

        self.cells = next;
    }

    pub fn render(&self, context: &CanvasRenderingContext2d) {
        let size = 5;
        let dead = JsValue::from_str("orange");
        let live = JsValue::from_str("yellow");

        for row in 0..self.height {
            for col in 0..self.width {
                let i = self.get_index(row, col);

                context.set_fill_style(if self.cells[i] == Cell::Dead {
                    &dead
                } else {
                    &live
                });

                context.fill_rect(
                    (col * (size + 1) + 1).into(),
                    (row * (size + 1) + 1).into(),
                    size.into(),
                    size.into(),
                );
            }
        }
    }

    pub fn set_width(&mut self, width: u32) {
        self.width = width;
        self.cells = (0..width * self.height).map(|_| Cell::Dead).collect();
    }

    pub fn set_height(&mut self, height: u32) {
        self.height = height;
        self.cells = (0..self.width * height).map(|_| Cell::Dead).collect();
    }

    pub fn get_cells(&self) -> &[Cell] {
        &self.cells
    }

    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, col) in cells.iter().cloned() {
            let i = self.get_index(row, col);
            self.cells[i] = Cell::Live;
        }
    }

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.width + col) as usize
    }

    fn live_neighbors(&self, row: u32, col: u32) -> u8 {
        let mut neighbors = 0;

        for delta_row in [self.height - 1, 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (col + delta_col) % self.width;
                let i = self.get_index(neighbor_row, neighbor_col);

                neighbors += self.cells[i] as u8;
            }
        }

        neighbors
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}

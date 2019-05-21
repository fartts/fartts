//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate game_of_life;
extern crate wasm_bindgen_test;

use game_of_life::Universe;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(1 + 1, 2);
}

#[cfg(test)]
pub fn input_spaceship() -> Universe {
    let mut uni = Universe::new(6, 6);
    uni.set_cells(&[(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]);
    uni
}

#[cfg(test)]
pub fn expect_spaceship() -> Universe {
    let mut uni = Universe::new(6, 6);
    uni.set_cells(&[(2, 1), (2, 3), (3, 2), (3, 3), (4, 2)]);
    uni
}

#[wasm_bindgen_test]
pub fn test_tick() {
    let mut input = input_spaceship();
    let expected = expect_spaceship();

    input.update();
    assert_eq!(&input.get_cells(), &expected.get_cells());
}

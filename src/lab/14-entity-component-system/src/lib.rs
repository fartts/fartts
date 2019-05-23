extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use utils::set_panic_hook;
use wasm_bindgen::prelude::*;
use web_sys::console;

// When the wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn run() {
    // If the `console_error_panic_hook` feature is enabled this will set a
    // panic hook, otherwise it will do nothing.
    set_panic_hook();

    console::log_1(&JsValue::from_str("run"));
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

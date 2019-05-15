extern crate wasm_bindgen;
extern crate web_sys;

mod util;
mod life;

use life::Universe;
use util::set_panic_hook;
use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn main() {
    set_panic_hook();

    let mut uni = Universe::new();

    console::log_1(&JsValue::from_str(&uni.render()));
    uni.tick();
    console::log_1(&JsValue::from_str(&uni.render()));
    uni.tick();
    console::log_1(&JsValue::from_str(&uni.render()));


}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

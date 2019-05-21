module.exports = () => `\
extern crate cfg_if;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;
use web_sys::console;

cfg_if! {
    // When the \`wee_alloc\` feature is enabled, use \`wee_alloc\` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn main() {
    // If the \`console_error_panic_hook\` feature is enabled this will set a
    // panic hook, otherwise it will do nothing.
    utils::set_panic_hook();

    console::log_1(&JsValue::from_str("main"));
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
`;

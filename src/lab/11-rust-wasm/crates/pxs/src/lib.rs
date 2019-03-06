extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d};

#[wasm_bindgen]
pub fn draw(ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
  ctx.set_fill_style(&JsValue::from_str("red"));
  ctx.fill_rect(0.0, 0.0, w.into(), h.into());
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

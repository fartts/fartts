#[macro_use]
extern crate lazy_static;

extern crate cfg_if;
extern crate mut_static;
extern crate wasm_bindgen;
extern crate web_sys;

mod utils;

use cfg_if::cfg_if;
use mut_static::MutStatic;
use std::f64::consts::PI;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

// let mut rs: 'static f64 = 0.0;
pub struct State {
    pub t: f32,
}

impl State {
    pub fn new() -> State {
        State { t: 0.0 }
    }
}

lazy_static! {
    pub static ref STATE: MutStatic<State> = { MutStatic::from(State::new()) };
}

#[wasm_bindgen]
pub fn update(t: f32) {
    let mut state = STATE.write().unwrap();
    state.t = t / 500.0;
}

#[wasm_bindgen]
pub fn draw(ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let state = STATE.read().unwrap();

    let s = (f64::from(state.t.sin()) + 1.0) / 2.0;
    let tw = f64::from(w) / 6.0;
    let th = f64::from(h) / 6.0;
    let r = tw.min(th) + tw.min(th) * s;

    ctx.set_fill_style(&JsValue::from_str("red"));
    ctx.fill_rect(0.0, 0.0, w.into(), h.into());

    ctx.set_fill_style(&JsValue::from_str("white"));
    ctx.begin_path();
    ctx.arc(f64::from(w) / 2.0, f64::from(h) / 2.0, r, 0.0, PI * 2.0)
        .unwrap();
    ctx.fill();
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

#[macro_use]
extern crate lazy_static;

extern crate cfg_if;
extern crate mut_static;
extern crate rand;
extern crate wasm_bindgen;
extern crate web_sys;

mod state;
mod utils;

use cfg_if::cfg_if;
use mut_static::MutStatic;
use std::f64::consts::PI;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

use state::{State, Vec2};

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

lazy_static! {
    pub static ref STATE: MutStatic<State> = { MutStatic::from(State::new()) };
}

#[wasm_bindgen]
pub fn update(t: f64) {
    let mut state = STATE.write().unwrap();
    state.t = t;

    for p in state.p.iter_mut() {
        p.update();
    }
}

#[wasm_bindgen]
pub fn draw(ctx: &CanvasRenderingContext2d, w: u32, h: u32) {
    let state = STATE.read().unwrap();

    let hw = f64::from(w) / 2.0;
    let hh = f64::from(h) / 2.0;
    let s = (f64::from((state.t / 500.0).sin()) + 1.0) / 2.0;
    let sw = f64::from(w) / 6.0;
    let sh = f64::from(h) / 6.0;
    let r = sw.min(sh) + sw.min(sh) * s;

    ctx.set_fill_style(&JsValue::from_str("black"));
    ctx.fill_rect(0.0, 0.0, w.into(), h.into());

    ctx.set_fill_style(&JsValue::from_str("white"));
    ctx.begin_path();
    ctx.arc(hw, hh, r, 0.0, PI * 2.0).unwrap();
    ctx.fill();

    for p in state.p.iter().filter(|p| p.curr_pos.y < hh) {
        let curr_vel = Vec2::new(p.curr_pos.x - p.prev_pos.x, p.curr_pos.y - p.prev_pos.y);
        let a = curr_vel.y.atan2(curr_vel.x);

        let aw = 75.0;
        let ah = 15.0;
        let haw = aw / 2.0;
        let hah = ah / 2.0;

        let hsl = format!("hsla({}, 80%, 50%, 35%)", (180.0 + a * 180.0 / PI).floor());
        // console::log_1(&JsValue::from_str(&hsl));

        ctx.set_fill_style(&JsValue::from_str(&hsl));

        // ctx.begin_path();
        // ctx.arc(hw + p.curr_pos.x, hh + p.curr_pos.y, 5.0, 0.0, PI * 2.0)
        //     .unwrap();
        // ctx.fill();

        ctx.save();
        ctx.translate(hw + p.curr_pos.x, hh + p.curr_pos.y).unwrap();
        ctx.rotate(a).unwrap();
        ctx.fill_rect(-haw, -hah, aw, ah);
        ctx.restore();
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

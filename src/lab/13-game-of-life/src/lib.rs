extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod dom;
mod life;
mod util;

use dom::{canvas, container, ctx, dpr};
pub use life::{Cell, Universe};
use util::set_panic_hook;
use wasm_bindgen::prelude::*;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement, HtmlElement};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

fn step(from: i32, by: i32) -> i32 {
    match from % by {
        0 => from,
        _ => from + (by - (from % by)),
    }
}

#[wasm_bindgen]
pub struct Sim {
    uni: Universe,
    cell_size: i32,
    dpr: f64,

    container: HtmlElement,
    canvas: HtmlCanvasElement,
    ctx: CanvasRenderingContext2d,
}

#[wasm_bindgen]
impl Sim {
    pub fn new() -> Result<Sim, JsValue> {
        set_panic_hook();

        let cell_size = 10;
        let dpr = dpr();

        let container = container()?;
        let canvas = canvas()?;
        let ctx = ctx(&canvas)?;

        let uni = Universe::new(30, 15);
        let mut sim = Sim {
            uni,
            cell_size,
            dpr,

            container,
            canvas,
            ctx,
        };

        sim.resize()?;

        Ok(sim)
    }

    pub fn resize(&mut self) -> Result<(), JsValue> {
        let container_width = self.container.client_width();
        let container_height = self.container.client_height();

        // console::log_1(&JsValue::from_str(&format!("dpr: {}", self.dpr)));
        // console::log_1(&JsValue::from_str(&format!(
        //     "container_width: {}",
        //     container_width
        // )));
        // console::log_1(&JsValue::from_str(&format!(
        //     "container_height: {}",
        //     container_height
        // )));

        let scaled_width = step(container_width.into(), self.cell_size);
        let scaled_height = step(container_height.into(), self.cell_size);

        // console::log_1(&JsValue::from_str(&format!(
        //     "scaled_width: {}",
        //     scaled_width
        // )));
        // console::log_1(&JsValue::from_str(&format!(
        //     "scaled_height: {}",
        //     scaled_height
        // )));

        let uni_width = step(
            (scaled_width * self.dpr as i32) / self.cell_size,
            self.cell_size,
        );
        let uni_height = step(
            (scaled_height * self.dpr as i32) / self.cell_size,
            self.cell_size,
        );

        self.canvas.set_width(uni_width as u32);
        self.canvas.set_height(uni_height as u32);

        // console::log_1(&JsValue::from_str(&format!(
        //     "canvas.width: {}",
        //     self.canvas.width()
        // )));
        // console::log_1(&JsValue::from_str(&format!(
        //     "canvas.height: {}",
        //     self.canvas.height()
        // )));

        let width_ratio = container_width as f64 / self.canvas.width() as f64;
        let height_ratio = container_height as f64 / self.canvas.height() as f64;

        self.canvas.style().set_property(
            "transform",
            &format!(
                "scale({})",
                if width_ratio > height_ratio {
                    width_ratio
                } else {
                    height_ratio
                }
            ),
        )?;

        self.ctx.set_fill_style(&JsValue::from_str("red"));
        self.ctx.fill_rect(
            0.0,
            0.0,
            self.canvas.width().into(),
            self.canvas.height().into(),
        );

        self.uni
            .set_width(self.canvas.width() / (self.cell_size as u32));
        self.uni
            .set_height(self.canvas.height() / (self.cell_size as u32));
        self.uni.cells = (0..self.uni.width * self.uni.height)
            .map(|i| {
                if i % 2 == 0 || i % 7 == 0 {
                    Cell::Live
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Ok(())
    }

    pub fn update(&mut self, _current_time: f64, _delta_time: f64) {
        self.uni.update();
    }

    pub fn render(&mut self, _frame_ratio: f64) {
        self.uni.render(&self.ctx, self.cell_size as u32);
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

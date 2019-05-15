extern crate wasm_bindgen;
extern crate web_sys;

mod life;
mod util;

use life::{Cell, Universe};
use std::cell::RefCell;
use std::rc::Rc;
use util::set_panic_hook;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{console, window, CanvasRenderingContext2d, HtmlCanvasElement};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn main() -> Result<(), JsValue> {
    set_panic_hook();

    let win = window().expect("should have a window");
    let doc = win.document().expect("should have a document");

    let canvas: HtmlCanvasElement = doc
        .query_selector("canvas")?
        .unwrap()
        .dyn_into::<HtmlCanvasElement>()
        .map_err(|_| ())
        .unwrap();

    let context: CanvasRenderingContext2d = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
        .unwrap();

    context.set_fill_style(&JsValue::from_str("red"));
    context.fill_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());

    let mut uni = Universe::new();

    console::log_1(&JsValue::from_str(&uni.render()));
    uni.tick();
    console::log_1(&JsValue::from_str(&uni.render()));
    uni.tick();
    console::log_1(&JsValue::from_str(&uni.render()));
    uni.tick();

    let size = 5;
    let dead = JsValue::from_str("orange");
    let live = JsValue::from_str("yellow");

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    win.request_animation_frame(
        (g.borrow().as_ref().unwrap() as &Closure<FnMut()>)
            .as_ref()
            .unchecked_ref(),
    );

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        win.request_animation_frame(
            (f.borrow().as_ref().unwrap() as &Closure<FnMut()>)
                .as_ref()
                .unchecked_ref(),
        );

        uni.tick();
        for row in 0..uni.height {
            for col in 0..uni.width {
                let i = uni.get_index(row, col);

                context.set_fill_style(if uni.cells[i] == Cell::Dead {
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
    }) as Box<FnMut()>));

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod life;
mod util;

use js_sys::Object;
use life::{Cell, Universe};
use std::cell::RefCell;
use std::rc::Rc;
use util::set_panic_hook;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, CanvasRenderingContext2d, Document, Element, HtmlCanvasElement, Window};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

fn win() -> Window {
    window().expect("should have a window")
}

fn doc() -> Document {
    win().document().expect("should have a document")
}

fn raf(f: &Closure<FnMut()>) {
    win()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register requestAnimationFrame");
}

fn canvas() -> Result<HtmlCanvasElement, Element> {
    doc()
        .query_selector("canvas")?
        .unwrap()
        .dyn_into::<HtmlCanvasElement>()
}

fn context() -> Result<CanvasRenderingContext2d, Object> {
    canvas()
        .map_err(|_| ())
        .unwrap()
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
}

#[wasm_bindgen]
pub fn main() -> Result<(), JsValue> {
    set_panic_hook();

    let canvas = canvas().map_err(|_| ()).unwrap();
    let context = context().unwrap();

    context.set_fill_style(&JsValue::from_str("red"));
    context.fill_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());

    let mut uni = Universe::new();

    let size = 5;
    let dead = JsValue::from_str("orange");
    let live = JsValue::from_str("yellow");

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        raf(f.borrow().as_ref().unwrap());

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

    raf(g.borrow().as_ref().unwrap());

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

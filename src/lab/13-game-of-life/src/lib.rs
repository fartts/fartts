extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod dom;
mod life;
mod util;

use dom::{caf, canvas, container, ctx, dpr, raf};
pub use life::Universe;
use std::cell::RefCell;
use std::rc::Rc;
use util::set_panic_hook;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{console, MouseEvent};

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
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();

    let cell_size = 5;

    let container = container()?;
    let canvas = canvas()?;
    let context = ctx(&canvas)?;

    let dpr = dpr();
    let container_width = container.client_width();
    let container_height = container.client_height();

    console::log_1(&JsValue::from_str(&format!("dpr: {}", dpr)));
    console::log_1(&JsValue::from_str(&format!(
        "container_width: {}",
        container_width
    )));
    console::log_1(&JsValue::from_str(&format!(
        "container_height: {}",
        container_height
    )));

    let scaled_width = step(container_width.into(), cell_size);
    let scaled_height = step(container_height.into(), cell_size);

    console::log_1(&JsValue::from_str(&format!(
        "scaled_width: {}",
        scaled_width
    )));
    console::log_1(&JsValue::from_str(&format!(
        "scaled_height: {}",
        scaled_height
    )));

    canvas.set_width(((scaled_width * dpr as i32) / cell_size) as u32);
    canvas.set_height(((scaled_height * dpr as i32) / cell_size) as u32);

    let mut uni = Universe::new(
        canvas.width() / (cell_size as u32),
        canvas.height() / (cell_size as u32),
    );

    let width_ratio = container_width as f64 / canvas.width() as f64;
    let height_ratio = container_height as f64 / canvas.height() as f64;

    canvas.style().set_property(
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

    context.set_fill_style(&JsValue::from_str("red"));
    context.fill_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());

    let mut i: i32 = 0;
    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        i = raf(f.borrow().as_ref().unwrap());
        uni.update();
        uni.render(&context, cell_size as u32);
    }) as Box<FnMut()>));

    // i = raf(g.borrow().as_ref().unwrap());

    {
        let closure = Closure::wrap(Box::new(move |_event: MouseEvent| {
            console::log_1(&JsValue::from_str(&format!("i: {}", i)));

            if i == 0 {
                i = raf(g.borrow().as_ref().unwrap());
            } else {
                caf(i);
                i = 0;
            }
        }) as Box<dyn FnMut(_)>);

        canvas.add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())?;
        closure.forget();
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

mod dom;
mod life;
mod util;

use dom::{canvas, ctx, raf};
pub use life::Universe;
use std::cell::RefCell;
use std::rc::Rc;
use util::set_panic_hook;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();

    let canvas = canvas()?;
    let context = ctx(&canvas)?;

    let mut uni = Universe::new((canvas.width() / 6).into(), (canvas.height() / 6).into());

    canvas.set_width(canvas.width() + 1);
    canvas.set_height(canvas.height() + 1);

    context.set_fill_style(&JsValue::from_str("red"));
    context.fill_rect(0.0, 0.0, canvas.width().into(), canvas.height().into());

    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        raf(f.borrow().as_ref().unwrap());
        uni.update();
        uni.render(&context);
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

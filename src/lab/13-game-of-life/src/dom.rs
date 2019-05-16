use js_sys::Object;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, CanvasRenderingContext2d, Document, Element, HtmlCanvasElement, Window};

fn win() -> Window {
    window().expect("window to exist")
}

fn doc() -> Document {
    win().document().expect("window.document to exist")
}

pub fn raf(f: &Closure<FnMut()>) {
    win()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("window.requestAnimationFrame to exist");
}

pub fn canvas() -> Result<HtmlCanvasElement, Element> {
    doc()
        .query_selector("canvas")?
        .unwrap()
        .dyn_into::<HtmlCanvasElement>()
}

pub fn ctx(canvas: &HtmlCanvasElement) -> Result<CanvasRenderingContext2d, Object> {
    canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
}

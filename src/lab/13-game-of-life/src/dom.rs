use js_sys::Object;
use wasm_bindgen::JsCast;
use web_sys::{
    window, CanvasRenderingContext2d, Document, Element, HtmlCanvasElement, HtmlElement, Window,
};

pub fn win() -> Window {
    window().expect("window to exist")
}

pub fn dpr() -> f64 {
    win().device_pixel_ratio()
}

pub fn doc() -> Document {
    win().document().expect("window.document to exist")
}

pub fn container() -> Result<HtmlElement, Element> {
    doc()
        .query_selector("main")?
        .unwrap()
        .dyn_into::<HtmlElement>()
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

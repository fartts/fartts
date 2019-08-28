module.exports = ({ labName }) => `\
[package]
name = "${labName}"
version = "0.1.0"
authors = ["Matt Hayes <matt@mysterycommand.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]

[features]
default = ["console_error_panic_hook", "wee_alloc"]

[dependencies]
console_error_panic_hook = { version = "0.1.6", optional = true }
js-sys = "0.3.27"
wasm-bindgen = "0.2.50"
wee_alloc = { version = "0.4.5", optional = true }

[dependencies.web-sys]
version = "0.3.27"
features = [
  "console",
]

[dev-dependencies]
wasm-bindgen-test = "0.2.50"
`;

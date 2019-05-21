module.exports = ({ name }) => `\
[package]
name = "${name}"
version = "0.1.0"
authors = ["Matt Hayes <matt@mysterycommand.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib"]

[features]
default = ["console_error_panic_hook", "wee_alloc"]

[dependencies]
cfg-if = "0.1.7"
console_error_panic_hook = { version = "0.1.6", optional = true }
wasm-bindgen = "0.2.43"
web-sys = { version = "0.3.20", features = [ "console" ] }
wee_alloc = { version = "0.4.4", optional = true }

[dev-dependencies]
wasm-bindgen-test = "0.2.43"
`;

// When the `console_error_panic_hook` feature is enabled, we can call the
// `set_panic_hook` function to get better error messages if we ever panic.
pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

use suborbital::runnable::*;
use suborbital::http; // 👋
use suborbital::log; // 👋
use std::str;

/*
./demo ping/ping.wasm http://localhost:9090
*/

struct Ping{}

impl Runnable for Ping {
    fn run(&self, input: Vec<u8>) -> Result<Vec<u8>, RunErr> {
        let in_string = String::from_utf8(input).unwrap();

        // "http://localhost:9090"
        let query_result = match http::get(&in_string, None) { // 👋
            Ok(data) => data,
            Err(e) => e.message.as_bytes().to_vec()
        };

        let message = match str::from_utf8(&query_result) {
            Ok(v) => v,
            Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
        };

        log::info(&message); // 👋

        Ok(String::from(format!("message: {}", message)).as_bytes().to_vec())
    }
}


// initialize the runner, do not edit below //
static RUNNABLE: &Ping = &Ping{};

#[no_mangle]
pub extern fn _start() {
    use_runnable(RUNNABLE);
}

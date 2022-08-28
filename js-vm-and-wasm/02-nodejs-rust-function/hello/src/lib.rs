use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Human {
    pub firstName: String,
    pub lastName: String,
}

#[derive(Serialize, Deserialize)]
pub struct Answer {
    pub text: String,
    pub author: String,
}

#[wasm_bindgen]
pub fn hello(value: &JsValue) -> JsValue {
    // deserialize value (parameter) to human
    let human: Human = value.into_serde().unwrap();

    // serialize answer to JsValue
    let answer = Answer {
        text: String::from(format!("🍊 hello {} {}", human.firstName, human.lastName)),
        author: String::from("@k33g_org"),
    };

    return JsValue::from_serde(&answer).unwrap()
}

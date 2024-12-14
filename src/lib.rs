mod utils;

use photon_rs::{filters, PhotonImage};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ImageProcessor {
    original_image: PhotonImage,
}

#[wasm_bindgen]
impl ImageProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new(data: Vec<u8>, width: u32, height: u32) -> Self {
        let original_image = PhotonImage::new(data, width, height);
        ImageProcessor { original_image }
    }

    #[wasm_bindgen]
    pub fn apply_filter(&self, filter_name: &str) -> Vec<u8> {
        // Create a clone of the original image for this filter operation
        let mut img = self.original_image.clone();

        match filter_name {
            "cali" => filters::cali(&mut img),
            "dramatic" => filters::dramatic(&mut img),
            "duotone_horizon" => filters::duotone_horizon(&mut img),
            "duotone_lilac" => filters::duotone_lilac(&mut img),
            "duotone_ochre" => filters::duotone_ochre(&mut img),
            "duotone_violette" => filters::duotone_violette(&mut img),
            "firenze" => filters::firenze(&mut img),
            "golden" => filters::golden(&mut img),
            "lix" => filters::lix(&mut img),
            "lofi" => filters::lofi(&mut img),
            "neue" => filters::neue(&mut img),
            "obsidian" => filters::obsidian(&mut img),
            "pastel_pink" => filters::pastel_pink(&mut img),
            "ryo" => filters::ryo(&mut img),
            _ => (),
        }

        img.get_raw_pixels()
    }
}

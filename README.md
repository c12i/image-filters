# image-filters

## Initial Setup

1. Build the WASM module:

```bash
<<<<<<< HEAD
=======
cd image-filters
>>>>>>> solution
wasm-pack build --target web --release
```

2. Install UI dependencies:

```bash
cd ui
yarn install
```

3. Start development server:

```bash
yarn dev
```

## Updating WASM Module

After making changes to the Rust code, follow these steps to update:

1. Rebuild the WASM module:

```bash
cd .. # if you were in the ui dir
wasm-pack build --target web --release
```

2. Reset UI dependencies:

```bash
cd ui
rm -rf node_modules
yarn install
```

3. Restart the development server:

```bash
yarn dev
```

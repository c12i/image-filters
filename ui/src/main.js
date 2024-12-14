import init, { greet } from "image-filters";

init()
  .then(() => {
    greet();
  })
  .catch(console.error);

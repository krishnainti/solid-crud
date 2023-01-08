import { createSignal } from "solid-js";

const [packages, setPackages] = createSignal([
  { name: "name", description: "description", id: 1 },
]);

export { packages, setPackages };

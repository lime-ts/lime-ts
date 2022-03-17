import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
    root: ".",
    assetsDir: "res",
    publicDir: "dist",
    plugins: [checker({ typescript: true })],
});

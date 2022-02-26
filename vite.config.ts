import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    root: process.cwd() + "/client",
    build: {
        outDir: "build",
    },
    plugins: [react()],
    esbuild: {
        jsxInject: `import React from 'react'`,
    },
    server: {
        port: 3000,
        proxy: {
            "/socket.io": {
                target: "ws://localhost:3001",
                ws: true,
            },
        },
    },
});

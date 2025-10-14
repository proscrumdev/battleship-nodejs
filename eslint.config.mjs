import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: { 
        ...globals.node, 
        ...globals.jest 
      } 
    }, 
    rules: {
      "no-undef": "off",
      "no-constant-condition": "off", 
    }
  },
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs" 
    } 
  },
]);

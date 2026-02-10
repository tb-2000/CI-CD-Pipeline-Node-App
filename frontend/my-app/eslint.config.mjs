import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,

  // React + JSX Unterstützung (wichtig!)
  pluginReact.configs.flat.recommended,      // oder .configs.flat["jsx-runtime"] wenn du den neuen JSX Transform nutzt
  pluginReact.configs.flat["jsx-runtime"],   // ← oft besser bei Vite / React 17+, vermeidet "React not defined"

  // Optional aber sehr empfohlen: React Hooks Regeln
  pluginReactHooks.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // falls du node-spezifische Dinge nutzt
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // ← das aktiviert JSX-Parsing explizit
      },
    },
    settings: {
      react: {
        version: "detect", // oder "18.0" / "17.0" – "detect" ist meist am sichersten
      },
    },
    rules: {
      "no-console": "off",
      "no-undef": "error",
      // Optional: typische React-Regeln anpassen
      "react/jsx-uses-react": "off",     // nicht nötig bei neuen JSX-Transform
      "react/react-in-jsx-scope": "off", // nicht nötig bei neuen JSX-Transform
      "react/prop-types": "off",         // wenn du kein PropTypes nutzt
      // "react-hooks/rules-of-hooks": "error",
      // "react-hooks/exhaustive-deps": "warn",
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", "build/**", ".vite/**"],
  },
];
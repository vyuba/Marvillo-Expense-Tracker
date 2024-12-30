<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->

# Marvillo Expense Tracker

**Marvillo Expense Tracker** is a web application built using **React**, **React Router**, **Tailwind CSS**, **Lucide Dev** for icons, and **Appwrite** for backend services.

## Purpose

The primary goal of this web app is to help users **track their expenses and income** efficiently. It is currently a work in progress, with several features planned for future updates.

## Current Features

- **Sign up and Login**:
  - Google account integration for easy sign-up and login.
  - Manual sign-up and login for users who prefer not to use Google.
- **Expense and Income Tracking**:

  - A form to input both income and expense data.
  - Data is displayed in a user-friendly table format for easy tracking.

- **Bank Integration**:
  - Users can input bank details.
  - Display bank information in the app for easier management.

## Upcoming Features

- Enhanced bank integration.
- Advanced reporting and data visualization tools.
- User profiles and customizable settings.

## Technologies Used

- **React** for building the user interface.
- **React Router** for navigation between pages.
- **Tailwind CSS** for fast and responsive styling.
- **Lucide Dev** for UI icons.
- **Appwrite** for backend services including authentication and database management.

## Installation

To run the project locally:

1. Clone this repository:
   ```bash
   git clone git@github.com:vyuba/Marvillo-Expense-Tracker.git
   ```

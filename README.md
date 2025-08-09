# CoHu Frontend Application

This application is built using React + TypeScript + Vite.

## Run the project

To work locally with this project, simply:

Install dependencies:
```
npm install
```

Run the development server:
```
npm run dev
```

## Localization

To update the localization, modify `en` and `fr` files in `/src/locales`.

To add a new locale:
- Copy `en.ts` into `sp.ts`
- Rename the exported variable `en` -> `sp` (for example)
- Update the `i18n.ts` file to import `sp` and add it to the resources object (same as `en`)
- Update the `LocaleSwitch.tsx` component by adding `sp` to the SUPPORTED_LOCALES, and update the flag map with the right country code (to find the code, check https://github.com/smucode/react-world-flags)
import { DefaultTheme } from "styled-components/dist/types";

// https://vite.dev/guide/features.html#glob-import - how we import our default themes

const defaultThemes = import.meta.glob('./DefaultThemes/*.json');
for (const path in defaultThemes) {
    defaultThemes[path]().then((theme) => {
        console.log(path, theme)
    })
}
// const themeBuilder = (): DefaultTheme => {
//
// }

// we then want to create a themeBuilder function that returns for us a DefaultTheme types
// We can then load that into the app settings where a theme is represented by the type 
// Record<name<string>, DefaultTheme> . 
//
// We can then access that on the ThemeProvider componentent and we can select in the 
// Theme Selector from all of the options of available themes.
//
// We need to scope out how to dynamically install new fonts from something like google fonts 
// and we also need to be able to check certain fields as we build the default theme. We can 
// check that the color fields begin with a `#` and are hexidecimal, validate that certain 
// sizing is a number appended by a valid unit (i.e. px, rem, em, etc.)

const Scribe: DefaultTheme = {
    colors: {
        main: "#522e2c",
        secondary: "#ebcba2",
        background: "",
        text: "",
        border: ""
    },
    borderRadius: "",
    spacing: {
        small: "",
        medium: "",
        large: ""
    },
    typogrophy: {
        headerFont: "",
        bodyFont: "",
        uniqueFont: "",
        fontsize: {
            small: "",
            medium: "",
            large: ""
        },
        fontWeight: {
            regular: 0,
            bold: 0
        }
    },
    name: "scribe"
}

export { Scribe };

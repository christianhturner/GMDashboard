import 'styled-components';

/*
 * An example theme would look as such:
 *
 * import { DefaultTheme } from "styled-components/dist/types";
 *
 * const Scribe: DefaultTheme = {
 *   colors: {
 *       main: "",
 *       secondary: "",
 *       background: "",
 *       text: "",
 *       border: ""
 *   },
 *   borderRadius: "",
 *   spacing: {
 *       small: "",
 *       medium: "",
 *       large: ""
 *   },
 *   typogrophy: {
 *       fontsize: {
 *           small: "",
 *           medium: "",
 *           large: ""
 *       },
 *       fontWeight: {
 *           regular: 0,
 *           bold: 0
 *       }
 *   },
 *   name: "scribe"
 * }
 *
 * export { Scribe };
 *
 * We need to implement a theme switcher that would colect all of the `Themes` and 
 * would use the name as the key, and the theme itself as the value for allowing
 * dynamic theme switching
 */
declare module 'styled-components' {
    interface ColorPalette {
        main: string;
        secondary: string;
        background: string;
        text: string;
        border: string;
        // additional color templates go here
    }
    interface BaseStyles {
        borderRadius: string;
        spacing: {
            small: string;
            medium: string;
            large: string;
        };
        typogrophy: {
            headerFont: string;
            bodyFont: string;
            uniqueFont: string;
            fontsize: {
                small: string;
                medium: string;
                large: string;
            };
            fontWeight: {
                regular: number;
                bold: number;
            };
        };
    }


    export interface DefaultTheme extends BaseStyles {
        colors: ColorPalette;
        name: string
    }
}

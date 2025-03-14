import { Inter } from "next/font/google";

export const PROJECT_NAME = 'E-duka';

export const PRIMARY_COLOR = {
    main: "#ff6f00",
    100: "#ffd4b3",
    200: "#ffb780",
    300: "#ff9a4d",
    400: "#ff7d1a",
    500: "#e66400",
    600: "#b34e00",
    700: "#803800",
    800: "#4c2100",
    900: "#190b00",
}

export const SECONDARY_COLOR = {
    main: "#1565c0",
    100: "#b9d1ec",
    200: "#8ab2e0",
    300: "#5b93d3",
    400: "#2c74c6",
    500: "#135bad",
    600: "#0f4786",
    700: "#0b3360",
    800: "#061e3a",
    900: "#020a13",
}

export const CSS_FONT_FAMILY = '"Inter", sans-serif';

export const FONT_FAMILY = Inter({
    style: 'normal',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    display: 'swap'
});
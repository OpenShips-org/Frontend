import { StyleItem } from "map-gl-style-switcher/react-map-gl"

export const mapStyles: StyleItem[] = [
    {
        id: "versatiles_colorful",
        name: "Colorful",
        styleUrl: "/map/styles/versatiles-colorful.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
    },
    {
        id: "versatiles_graybeard",
        name: "Light",
        styleUrl: "/map/styles/versatiles_graybeard.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
    },
    {
        id: "versatiles_graybeard_inverted",
        name: "Dark",
        styleUrl: "/map/styles/versatiles_graybeard_inverted.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
    },
    {
        id: "versatiles_satellite",
        name: "Satellite (Experimental)",
        styleUrl: "/map/styles/versatiles_satellite.json",
        image: "https://raw.githubusercontent.com/muimsd/map-gl-style-switcher/refs/heads/main/public/voyager.png",
    }
]
export function getColorForVesselType(type: number) {
    
    if (type == 0) return "#383838" // not available
    if (type >= 20 && type <= 29) return "#33a693" // WIG
    if (type == 31 || type == 32) return "#d66c3e" // towing
    if (type >= 40 && type <= 49) return "#d62480" // high speed craft
    if (type >= 60 && type <= 69) return "#5fc94f" // passenger
    if (type >= 70 && type <= 79) return "#e3a92d" // cargo
    if (type >= 80 && type <= 89) return "#426ff5" // tanker

    return "#383838" // other
}

export function svgToDataUrl(svg: string): string {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
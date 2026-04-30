import { useControl } from "react-map-gl/maplibre"
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DeckGLOverlay(props: any) {
    const overlay = useControl(() => new DeckOverlay(props))
    overlay.setProps(props)
    return null
}

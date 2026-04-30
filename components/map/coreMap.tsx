/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DeckGLOverlay } from "@/lib/deckglUtils"
import { useMemo } from "react"
import { Map } from "react-map-gl/maplibre"
import type { ViewState } from "react-map-gl/maplibre"
import type { DeckProps } from "@deck.gl/core"

const INITIAL_VIEW_STATE: ViewState = {
    longitude: 0,
    latitude: 0,
    zoom: 1,
    pitch: 0,
    bearing: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
}

export type CoreMapConfig = {
    layers?: any[]
    style?: string
    viewState?: ViewState
    mapChildren?: React.ReactNode
    deckProps?: DeckProps
}

export default function CoreMap(config: CoreMapConfig) {
    const {
        layers = [],
        style = "/map/styles/versatiles-colorful.json",
        viewState = INITIAL_VIEW_STATE,
        mapChildren,
        deckProps,
    } = config

    const memorizedLayers = useMemo(() => layers, [layers])

    return (
        <Map
            reuseMaps
            projection="mercator"
            initialViewState={viewState}
            mapStyle={style}
            dragRotate={false}
            maxPitch={0}
        >
            <DeckGLOverlay
                layers={memorizedLayers}
                interleaved
                {...deckProps}
            />
            {mapChildren}
        </Map>
    )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DeckGLOverlay } from "@/lib/deckglUtils";
import { forwardRef, useMemo, useRef, useCallback } from "react";
import { Map } from "react-map-gl/maplibre";
import type { MapRef, ViewState } from "react-map-gl/maplibre";
import type { DeckProps } from "@deck.gl/core";

const INITIAL_VIEW_STATE: ViewState = {
    longitude: 0,
    latitude: 0,
    zoom: 1,
    pitch: 0,
    bearing: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

export type CoreMapConfig = {
    layers?: any[];
    style?: string;
    initialViewState?: ViewState;
    mapChildren?: React.ReactNode;
    children?: React.ReactNode;
    deckProps?: DeckProps;
    onMove?: React.ComponentProps<typeof Map>["onMove"];
    onMoveEnd?: React.ComponentProps<typeof Map>["onMoveEnd"];
    onLoad?: React.ComponentProps<typeof Map>["onLoad"];
};

export type CoreMapRef = MapRef;

const CoreMap = forwardRef<CoreMapRef, CoreMapConfig>(
    function CoreMap(config, ref) {
        const {
            layers = [],
            style = "/map/styles/versatiles_colorful.json",
            initialViewState = INITIAL_VIEW_STATE,
            mapChildren,
            children,
            deckProps,
            onMove,
            onMoveEnd,
            onLoad,
        } = config;

        const memorizedLayers = useMemo(() => layers, [layers]);

        const innerRef = useRef<CoreMapRef | null>(null);

        const setMapRef = useCallback(
            (instance: CoreMapRef | null) => {
                innerRef.current = instance;
                if (typeof ref === "function") ref(instance);
                else if (ref)
                    (ref as React.RefObject<CoreMapRef | null>).current =
                        instance;

                try {
                    const map = instance?.getMap?.();
                    if (map?.touchZoomRotate?.disableRotation) {
                        map.touchZoomRotate.disableRotation();
                    }
                } catch {}
            },
            [ref]
        );

        return (
            <Map
                ref={setMapRef}
                reuseMaps
                projection="mercator"
                initialViewState={initialViewState}
                mapStyle={style}
                dragRotate={false}
                maxPitch={0}
                touchPitch={false}
                keyboard={false}
                onMove={onMove}
                onMoveEnd={onMoveEnd}
                onLoad={onLoad}
            >
                <DeckGLOverlay
                    layers={memorizedLayers}
                    interleaved
                    {...deckProps}
                />
                {mapChildren ?? children}
            </Map>
        );
    }
);

export default CoreMap;

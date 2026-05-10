"use client";

import { useRef, useEffect, useState, use } from "react";
import { MapGLStyleSwitcher } from "map-gl-style-switcher/react-map-gl";
import CoreMap, { type CoreMapRef } from "./coreMap";
import { ScaleControl, NavigationControl } from "react-map-gl/maplibre";
import {
    useVesselData,
    usePortData,
    useBasestationData,
    useTrackedVesselData,
} from "@/hooks/useMapData";
import {
    useVesselLayers,
    usePortLayer,
    useBasestationLayer,
} from "@/hooks/useDecklglLayers";
import { mapStyles } from "@/lib/mapStyles";
import { useSettings } from "@/store/settings";
import debounce from "lodash/debounce";
import type { VesselPositionWithType } from "@/types/aisTypes";
import { PickingInfo } from "@deck.gl/core";
import { formatTimeAgo } from "@/lib/timeUtils";
import { useSearchParams } from "next/navigation";

const tooltipStyle: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    zIndex: 1000,
};

export default function MainMap() {
    const mapRef = useRef<CoreMapRef | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    const [bounds, setBounds] = useState<{
        minLat: number;
        maxLat: number;
        minLng: number;
        maxLng: number;
    } | null>(null);
    const [zoom, setZoom] = useState(0);

    const [hoveredVessel, setHoveredVessel] =
        useState<PickingInfo<VesselPositionWithType> | null>(null);

    useEffect(() => {
        if (!isMapReady || !mapRef.current) return;

        const map = mapRef.current;

        const updateBounds = debounce(() => {
            const b = map.getBounds();

            setBounds({
                minLat: b.getSouth(),
                maxLat: b.getNorth(),
                minLng: b.getWest(),
                maxLng: b.getEast(),
            });
            setZoom(map.getZoom());
        }, 250);

        map.on("moveend", updateBounds);

        updateBounds();

        return () => {
            map.off("moveend", updateBounds);
            updateBounds.cancel();
        };
    }, [isMapReady]);

    const { data: vesselData } = useVesselData(
        isMapReady && !!bounds,
        bounds ?? {
            minLat: 0,
            maxLat: 0,
            minLng: 0,
            maxLng: 0,
        },
        []
    );

    const { data: portData } = usePortData(
        isMapReady && !!bounds,
        bounds ?? {
            minLat: 0,
            maxLat: 0,
            minLng: 0,
            maxLng: 0,
        },
        zoom
    );

    /* 
    const { data: basestationData } = useBasestationData(
        isMapReady && !!bounds,
        bounds ?? {
            minLat: 0,
            maxLat: 0,
            minLng: 0,
            maxLng: 0,
        },
        zoom
    );
    */

    const mapStyle = useSettings((state) => state.mapStyle);
    const setMapStyle = useSettings((state) => state.setMapStyle);
    const activeStyleId = mapStyles.find((s) => s.styleUrl === mapStyle)?.id;

    const handleStyleChange = (styleUrl: string) => {
        const style = mapStyles.find((s) => s.styleUrl === styleUrl);
        if (!style) return;

        setMapStyle(styleUrl);
    };

    const trackedVesselMMSI = useSearchParams().get("mmsi");
    let [coordinatesForMMSI, setCoordinatesForMMSI] = useState<
        [number, number] | null
    >(null);
    const { data: trackedVesselData } = useTrackedVesselData(
        trackedVesselMMSI ? Number(trackedVesselMMSI) : null
    );

    useEffect(() => {
        if (trackedVesselData) {
            setCoordinatesForMMSI([
                trackedVesselData.longitude,
                trackedVesselData.latitude,
            ]);
        }
    }, [trackedVesselData]);

    const storedviewState = useSettings((s) => s.viewState);
    const setViewState = useSettings((s) => s.setViewState);
    const handleMoveEnd: React.ComponentProps<typeof CoreMap>["onMoveEnd"] = (
        event
    ) => {
        setViewState(event.viewState);
    };

    const viewState = coordinatesForMMSI
        ? {
              longitude: coordinatesForMMSI[0],
              latitude: coordinatesForMMSI[1],
              zoom: 12,
          }
        : storedviewState;

    useEffect(() => {
        if (coordinatesForMMSI) {
            setViewState({
                longitude: coordinatesForMMSI[0],
                latitude: coordinatesForMMSI[1],
                zoom: 12,
            });
        }
    }, [trackedVesselMMSI]);

    // eslint-disable-next-line
    const handleLoad = (e: any) => {
        setIsMapReady(true);

        const map = e.target;

        map.flyTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            essential: true,
            speed: 3,
            curve: 1.5,
        });
    };

    const unit = useSettings((s) => s.unit);

    const layers = [
        ...usePortLayer(portData),
        // ...useBasestationLayer(basestationData), // Experimental, needs more work (or better data, idk)
        ...useVesselLayers(vesselData, hoveredVessel, setHoveredVessel),
    ];

    return (
        <div className="h-full min-h-0 w-full">
            <CoreMap
                ref={mapRef}
                style={mapStyle}
                initialViewState={{
                    ...viewState,
                    bearing: 0,
                    pitch: 0,
                    padding: { top: 0, bottom: 0, left: 0, right: 0 },
                }}
                onMoveEnd={handleMoveEnd}
                onLoad={handleLoad}
                layers={layers}
                deckProps={{
                    getCursor: ({ isHovering }: { isHovering: boolean }) =>
                        isHovering ? "pointer" : "grab",
                    pickingRadius: 10,
                }}
            >
                {hoveredVessel?.object && (
                    <div
                        style={{
                            left: hoveredVessel.x + 20,
                            top: hoveredVessel.y,
                        }}
                        className="pointer-events-none absolute z-10 rounded bg-white p-1.5 text-xs text-black dark:bg-gray-800 dark:text-white"
                    >
                        <div>
                            <strong>{hoveredVessel.object.vesselName}</strong>
                        </div>
                        <div>MMSI: {hoveredVessel.object.mmsi}</div>
                        <div>
                            {hoveredVessel.object.timestamp
                                ? formatTimeAgo(
                                      new Date(hoveredVessel.object.timestamp)
                                  )
                                : "No timestamp :("}
                        </div>
                    </div>
                )}

                <MapGLStyleSwitcher
                    styles={mapStyles}
                    activeStyleId={activeStyleId}
                    theme="auto"
                    showLabels={true}
                    showImages={true}
                    position="top-left"
                    onBeforeStyleChange={(from, to) => {
                        console.log(
                            `Switching from ${from.name} to ${to.name}`
                        );
                    }}
                    onStyleChange={handleStyleChange}
                />
                <ScaleControl
                    position="bottom-right"
                    unit={unit}
                    maxWidth={200}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "4px",
                        borderRadius: "4px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                    }}
                />
                <NavigationControl
                    position="bottom-right"
                    showCompass={false}
                    style={{
                        marginBottom: "30px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "4px",
                        borderRadius: "4px",
                    }}
                />
            </CoreMap>
        </div>
    );
}

import { useMemo } from "react";
import { IconLayer, ScatterplotLayer, TextLayer } from "@deck.gl/layers";
import { VesselPositionWithType, BaseStationPosition } from "@/types/aisTypes";
import { GenerateVesselIcon } from "@/components/svgs/vesselIcon";
import { svgToDataUrl } from "@/lib/iconUtils";
import { PortPosition } from "@/types/portTypes";
import { GeneratePortIcon } from "@/components/svgs/portIcon";
import { Layer } from "@deck.gl/core";
import { GenerateAisBasestationIcon } from "@/components/svgs/aisBasestations";

const vesselIconCache = new Map<number, string>();

const showVesselTimstamps = false;

function getCachedVesselIcon(aisType: number) {
    const cachedIcon = vesselIconCache.get(aisType);

    if (cachedIcon) return cachedIcon;

    const generatedIcon = svgToDataUrl(GenerateVesselIcon(String(aisType)));
    vesselIconCache.set(aisType, generatedIcon);

    return generatedIcon;
}

export function useVesselLayers(
    vessels: VesselPositionWithType[] | null,
    hoveredVessel: VesselPositionWithType | null,
    setHoveredVessel: (vessel: VesselPositionWithType | null) => void
) {
    return useMemo(() => {
        if (!vessels) return [];

        const visibleVessels = vessels.filter(
            (vessel) => vessel.longitude != null && vessel.latitude != null
        );

        const hoveredVesselData =
            hoveredVessel &&
            hoveredVessel.longitude != null &&
            hoveredVessel.latitude != null
                ? [hoveredVessel]
                : [];

        const layers: Layer[] = [
            new ScatterplotLayer({
                id: "hovered-vessel-highlight",
                data: hoveredVesselData,
                pickable: false,
                getPosition: (d) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getRadius: 20,
                radiusUnits: "pixels",
                getLineColor: [0, 140, 255, 180],
                lineWidthMinPixels: 2,
                stroked: true,
                filled: false,
            }),
            new IconLayer({
                id: "vessels",
                data: visibleVessels,
                pickable: true,
                getPosition: (d: VesselPositionWithType) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getIcon: (d: VesselPositionWithType) => ({
                    url: getCachedVesselIcon(d.aisType ?? 0),
                    width: 400,
                    height: 400,
                }),
                getAngle: (d: VesselPositionWithType) => {
                    if (d.heading == 511 || d.heading == null) return 0;

                    // I have no idea why but this seems to work
                    return (0 - d.heading + 360) % 360;
                },
                getSize: 30,

                updateTriggers: {
                    getIcon: vessels,
                },
                onHover(pickingInfo) {
                    setHoveredVessel(pickingInfo.object ?? null);
                },
                onClick(pickingInfo) {
                    if (pickingInfo.object) {
                        const mmsi = pickingInfo.object.mmsi;
                        if (mmsi) {
                            window.open(`/vessels/${mmsi}`, "_blank");
                        }
                    }
                },
                getColor: (d: VesselPositionWithType) => {   
                    if (d.timestamp) {
                        const ageInSeconds =
                            (Date.now() - new Date(d.timestamp).getTime()) /
                            1000;
                        if (ageInSeconds < 60) {
                            return [0, 0, 0, 255];
                        } else if (ageInSeconds < 120) {
                            return [0, 0, 0, 200];
                        } else if (ageInSeconds < 300) {
                            return [0, 0, 0, 150];
                        } else if (ageInSeconds < 600) {
                            return [0, 0, 0, 100];
                        } else {
                            return [0, 0, 0, 50];
                        }
                    }

                    return [0, 0, 0, 255];
                },
            }),
            new TextLayer({
                id: "vessel-labels",
                data: visibleVessels,
                pickable: false,
                getPosition: (d: VesselPositionWithType) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getText: (d: VesselPositionWithType) => d.vesselName || "",
                getSize: 12,
                getColor: [0, 0, 0],
                getAngle: () => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
            }),
        ];

        if (showVesselTimstamps) {
            layers.push(
                new TextLayer({
                    id: "vessel-timestamps",
                    data: visibleVessels,
                    pickable: false,
                    getPosition: (d: VesselPositionWithType) => [
                        d.longitude as number,
                        d.latitude as number,
                    ],
                    getText: (d) =>
                        d.timestamp
                            ? new Date(d.timestamp).toLocaleDateString() +
                              " " +
                              new Date(d.timestamp).toLocaleTimeString()
                            : "",
                    getSize: 10,
                    getColor: [255, 0, 0],
                    getAngle: 0,
                    getAlignmentBaseline: "top",
                    getPixelOffset: [0, 20],
                })
            );
        }

        return layers;
    }, [vessels, hoveredVessel, setHoveredVessel]);
}

export function usePortLayer(ports: PortPosition[] | null) {
    return useMemo(() => {
        if (!ports) return [];

        const visiblePorts = ports.filter(
            (port) => port.longitude != null && port.latitude != null
        );

        return [
            new IconLayer({
                id: "ports",
                data: visiblePorts,
                pickable: true,
                getPosition: (d) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getIcon: () => ({
                    url: svgToDataUrl(GeneratePortIcon()),
                    width: 400,
                    height: 400,
                }),
                getSize: 30,
                zoomScale: 0.5,
            }),
            new TextLayer({
                id: "port-labels",
                data: visiblePorts,
                pickable: false,
                getPosition: (d) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getText: (d) => d.main_port_name || "",
                getSize: 12,
                getColor: [0, 0, 0],
                getAngle: () => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
            }),
        ];
    }, [ports]);
}

export function useBasestationLayer(
    basestations: BaseStationPosition[] | null
) {
    return useMemo(() => {
        if (!basestations) return [];

        const visibleBasestations = basestations.filter(
            (bs) => bs.longitude != null && bs.latitude != null
        );

        return [
            new IconLayer({
                id: "ais-basestations",
                data: visibleBasestations,
                pickable: false,
                getPosition: (d) => [
                    d.longitude as number,
                    d.latitude as number,
                ],
                getIcon: (d) => ({
                    url: svgToDataUrl(
                        GenerateAisBasestationIcon(d.longRangeEnabled ?? false)
                    ),
                    width: 400,
                    height: 400,
                }),
                getSize: 30,
                zoomScale: 0.5,
            }),
        ];
    }, [basestations]);
}

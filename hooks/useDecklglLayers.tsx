import { useMemo } from "react";
import { IconLayer, TextLayer } from "@deck.gl/layers";
import { VesselPositionWithType } from "@/types/aisTypes";
import { GenerateVesselIcon } from "@/components/svgs/vesselIcon";
import { svgToDataUrl } from "@/lib/iconUtils";
import { PortPosition } from "@/types/portTypes";
import { GeneratePortIcon } from "@/components/svgs/portIcon";

const vesselIconCache = new Map<number, string>();

function getCachedVesselIcon(aisType: number) {
    const cachedIcon = vesselIconCache.get(aisType);

    if (cachedIcon) return cachedIcon;

    const generatedIcon = svgToDataUrl(GenerateVesselIcon(String(aisType)));
    vesselIconCache.set(aisType, generatedIcon);

    return generatedIcon;
}

export function useVesselLayers(vessels: VesselPositionWithType[] | null) {
    return useMemo(() => {
        if (!vessels) return [];

        const visibleVessels = vessels.filter(
            (vessel) => vessel.longitude != null && vessel.latitude != null
        );
        
        return [
            new IconLayer({
                id: "vessels",
                data: visibleVessels,
                pickable: true,
                getPosition: (d) => [d.longitude as number, d.latitude as number],
                getIcon: (d) => ({
                    url: getCachedVesselIcon(d.aisType ?? 0),
                    width: 400,
                    height: 400,
                }),
                getAngle: (d) => {
                    if (d.heading == 511) return 0; // invalid heading, default to 0
                    return d.heading - 225
                },
                getSize: 30,

                updateTriggers: {
                    getIcon: vessels
                },
            }),
            new TextLayer({
                id: "vessel-labels",
                data: visibleVessels,
                pickable: false,
                getPosition: (d) => [d.longitude as number, d.latitude as number],
                getText: (d) => d.vesselName || "",
                getSize: 12,
                getColor: [0, 0, 0],
                getAngle: (d) => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
            }),

            // DEBUG LAYER (timestamps with date)
            new TextLayer({
                id: "vessel-timestamps",
                data: visibleVessels,
                pickable: false,
                getPosition: (d) => [d.longitude as number, d.latitude as number],
                getText: (d) => d.timestamp ? new Date(d.timestamp).toLocaleDateString() + " " + new Date(d.timestamp).toLocaleTimeString() : "",
                getSize: 10,
                getColor: [255, 0, 0],
                getAngle: (d) => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -40],
                visible: false, // set to true to enable timestamp labels
            })
        ]
    }, [vessels]);
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
                getPosition: (d) => [d.longitude as number, d.latitude as number],
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
                getPosition: (d) => [d.longitude as number, d.latitude as number],
                getText: (d) => d.main_port_name || "",
                getSize: 12,
                getColor: [0, 0, 0],
                getAngle: (d) => 0,
                getAlignmentBaseline: "bottom",
                getPixelOffset: [0, -20],
            })
        ]
    }, [ports]);
}
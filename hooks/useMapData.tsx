import { useQuery } from "@tanstack/react-query"
import { apiBaseUrl, vesselLimit } from "@/lib/config"

export function useVesselData(
    enabled: boolean,
    bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
    aisTypes: number[]
) {
    return useQuery({
        queryKey: [
            "mapData",
            bounds.minLat.toFixed(4),
            bounds.maxLat.toFixed(4),
            bounds.minLng.toFixed(4),
            bounds.maxLng.toFixed(4),
            aisTypes,
        ],
        queryFn: async () => {
            const params = new URLSearchParams()

            params.set("minLat", bounds.minLat.toString())
            params.set("maxLat", bounds.maxLat.toString())
            params.set("minLon", bounds.minLng.toString())
            params.set("maxLon", bounds.maxLng.toString())
            params.set("limit", vesselLimit.toString())

            aisTypes.forEach((t) => params.append("filterAisTypes", String(t)))

            const res = await fetch(
                `${apiBaseUrl}/external/vessels/position/box?${params}`
            )

            if (!res.ok) throw new Error("Failed to fetch map data")

            return res.json()
        },
        enabled:
            enabled &&
            bounds.minLat != null &&
            bounds.maxLat != null &&
            bounds.minLng != null &&
            bounds.maxLng != null,
        staleTime: 30_000,
        refetchOnWindowFocus: false,
    })
}

export function usePortData(enabled: boolean, bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }) {
    return useQuery({
        queryKey: [
            "portData",
            bounds.minLat.toFixed(4),
            bounds.maxLat.toFixed(4),
            bounds.minLng.toFixed(4),
            bounds.maxLng.toFixed(4),
        ],
        queryFn: async () => {
            const params = new URLSearchParams()

            params.set("minLat", bounds.minLat.toString())
            params.set("maxLat", bounds.maxLat.toString())
            params.set("minLon", bounds.minLng.toString())
            params.set("maxLon", bounds.maxLng.toString())

            const res = await fetch(
                `${apiBaseUrl}/external/ports/box?${params}`
            )

            if (!res.ok) throw new Error("Failed to fetch port data")

            return res.json()
        },
        enabled:
            enabled &&
            bounds.minLat != null &&
            bounds.maxLat != null &&
            bounds.minLng != null &&
            bounds.maxLng != null,
        staleTime: 60_000,
        refetchOnWindowFocus: false,
    })
}

import { useQuery, keepPreviousData } from "@tanstack/react-query"
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
        staleTime: 1000 * 30,
        refetchInterval: 1000 * 30,
        refetchOnWindowFocus: true,
        placeholderData: keepPreviousData,
    })
}

export function usePortData(enabled: boolean, bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }, zoom: number) {
    return useQuery({
        queryKey: [
            "portData",
            bounds.minLat.toFixed(4),
            bounds.maxLat.toFixed(4),
            bounds.minLng.toFixed(4),
            bounds.maxLng.toFixed(4),
            zoom,
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
            zoom >= 8 &&
            bounds.minLat != null &&
            bounds.maxLat != null &&
            bounds.minLng != null &&
            bounds.maxLng != null,
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        placeholderData: zoom >= 8 ? keepPreviousData : undefined,
    })
}

export function useBasestationData(enabled: boolean, bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }, zoom: number) {
    return useQuery({
        queryKey: [
            "basestationData",
            bounds.minLat.toFixed(4),
            bounds.maxLat.toFixed(4),
            bounds.minLng.toFixed(4),
            bounds.maxLng.toFixed(4),
            zoom,
        ],
        queryFn: async () => {
            const params = new URLSearchParams()

            params.set("minLat", bounds.minLat.toString())
            params.set("maxLat", bounds.maxLat.toString())
            params.set("minLon", bounds.minLng.toString())
            params.set("maxLon", bounds.maxLng.toString())

            const res = await fetch(
                `${apiBaseUrl}/external/base-stations/box?${params}`
            )

            if (!res.ok) throw new Error("Failed to fetch basestation data")

            return res.json()
        },
        enabled:
            enabled &&
            zoom >= 8 &&
            bounds.minLat != null &&
            bounds.maxLat != null &&
            bounds.minLng != null &&
            bounds.maxLng != null,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        placeholderData: zoom >= 8 ? keepPreviousData : undefined,
    })
}
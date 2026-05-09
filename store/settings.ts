import { create } from "zustand";
import { persist } from "zustand/middleware";

type Settings = {
    mapStyle: string;
    setMapStyle: (style: string) => void;

    unit: "metric" | "imperial" | "nautical";
    setUnit: (unit: "metric" | "imperial" | "nautical") => void;

    viewState: ViewState;
    setViewState: (v: Partial<ViewState>) => void;

    showVesselNames: boolean;
    setShowVesselNames: (show: boolean) => void;
};

type ViewState = {
    longitude: number;
    latitude: number;
    zoom: number;
};

export const useSettings = create<Settings>()(
    persist(
        (set, get) => ({
            mapStyle: "/map/styles/versatiles_colorful.json",
            setMapStyle: (style: string) =>
                set({
                    mapStyle: style,
                }),

            unit: "nautical",
            setUnit: (unit: "metric" | "imperial" | "nautical") =>
                set({
                    unit,
                }),

            viewState: {
                longitude: 0,
                latitude: 0,
                zoom: 3,
            },
            setViewState: (v) =>
                set({
                    viewState: {
                        ...get().viewState,
                        ...v,
                    },
                }),

            showVesselNames: true,
            setShowVesselNames: (show) =>
                set({
                    showVesselNames: show,
                }),
        }),
        {
            name: "settings",
        }
    )
);

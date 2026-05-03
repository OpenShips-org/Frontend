export type VesselPosition = {
    mmsi: string
    vesselName: string | null
    navigationalStatus: number | null
    rateOfTurn: number | null
    speedOverGround: number | null
    courseOverGround: number | null
    heading: number | null
    longitude: number | null
    latitude: number | null
    specialManoeuvre: number | null
    communicationState: number | null
    timestamp: string | null
}

export type VesselPositionWithType = VesselPosition & {
    aisType: number | null
}

export type BaseStationPosition = {
    mmsi: string
    longitude: number | null
    latitude: number | null
    longRangeEnabled: boolean | null
    communicationState: number | null
    timestamp: string | null
}
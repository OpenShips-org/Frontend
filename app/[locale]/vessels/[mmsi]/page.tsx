import { getTranslations } from "next-intl/server"
import { Metadata } from "next"
import { apiBaseUrl } from "@/lib/config"
import { VesselPositionWithType } from "@/types/aisTypes"
import NavBar from "@/components/navbar/navbar"

export async function generateMetadata({ params }: { params: Promise<{ mmsi: string }> }): Promise<Metadata> {
    const { mmsi } = await params
    const t = await getTranslations("VesselDetailsPage")

    const res = await fetch(`${apiBaseUrl}/external/vessels/static/${mmsi}?scrapedData=false`, {
        cache: "no-store",
    })

    if (!res.ok) {
        return {
            title: t("window_title", { name: ""}),
            description: t("window_title", { name: mmsi }),
            icons: "/icons/openships_icon.svg",
        }
    }

    const vesselData = await res.json()
    const name: string = vesselData.vesselName || mmsi

    return {
        title: t("window_title", { name: name.trim(), mmsi }),
        description: t("window_title", { name: name.trim(), mmsi }),
        icons: "/icons/openships_icon.svg",
    }
}

export default async function Page({ params }: { params: Promise<{ mmsi: string }> }) {
    const { mmsi } = await params
    const t = await getTranslations("VesselDetailsPage")

    const res = await fetch(`${apiBaseUrl}/external/vessels/static/${mmsi}?scrapedData=true`, {
        cache: "no-store",
    })

    if (!res.ok) {
        return <h1>{t("vessel_not_found")}</h1>
    }

    const vesselData: VesselPositionWithType = await res.json()

    return (
        <div>
            <div className="h-screen w-screen overflow-hidden flex flex-col justify-start items-center">
                <NavBar />
                <h1 className="text-3xl font-bold p-4">{vesselData.vesselName || mmsi}</h1>
            </div> 
        </div>
    )
}
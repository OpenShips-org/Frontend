import { getTranslations } from "next-intl/server"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ mmsi: string }> }): Promise<Metadata> {
    const { mmsi } = await params
    const t = await getTranslations("VesselPage")
    return {
        title: t("window_title"),
        description: `${t("window_title")} - MMSI: ${mmsi}`,
        icons: "/icons/openships_icon.svg",
    }
}

export default async function Page({ params }: { params: Promise<{ mmsi: string }> }) {
    const { mmsi } = await params
    const t = await getTranslations("VesselPage")

    return <h1>{t("title", { mmsi })}</h1>
}
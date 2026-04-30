import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: Promise<{ mmsi: string }> }) {
    const { mmsi } = await params
    const t = await getTranslations("VesselPage")

    return <h1>{t("title", { mmsi })}</h1>
}
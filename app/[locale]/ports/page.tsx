import { getTranslations } from "next-intl/server"
import NavBar from "@/components/navbar/navbar"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("PortsPage")
    return {
        title: t("window_title"),
        description: t("window_title"),
        icons: "/icons/openships_icon.svg",
    }
}

export default async function Page() {
    const t = await getTranslations("PortsPage")

    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col justify-start items-center">
            <NavBar />
            <h1 className="text-3xl font-bold p-4">{t("title")}</h1>
        </div>
    )
}
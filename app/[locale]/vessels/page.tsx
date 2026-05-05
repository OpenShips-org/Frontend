import { getTranslations } from "next-intl/server";
import NavBar from "@/components/navbar/navbar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("VesselPage");
    return {
        title: t("window_title"),
        description: t("window_title"),
        icons: "/icons/openships_icon.svg",
    };
}

export default async function Page() {
    const t = await getTranslations("VesselPage");

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-start overflow-hidden">
            <NavBar />
            <h1 className="p-4 text-3xl font-bold">{t("title")}</h1>
        </div>
    );
}

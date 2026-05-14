import { getTranslations } from "next-intl/server";
import NavBar from "@/components/navbar/navbar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("PortsPage");
    return {
        title: t("window_title"),
        description: t("window_title"),
        icons: "/icons/openships_icon.svg",
    };
}

export default async function Page() {
    const t = await getTranslations("PortsPage");

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-start overflow-hidden">
            <NavBar />
            <div className="mx-4 mt-5 w-[calc(100%-2rem)] rounded-md bg-gray-100 md:mx-auto md:w-1/2 dark:bg-gray-800">
                <h1 className="px-4 pt-2 text-2xl font-bold">{t("title")}</h1>
                <p className="px-4 pb-2 text-lg leading-tight">
                    {t("description")}
                </p>
                <hr className="mx-3 border-gray-400 pb-5" />
            </div>
        </div>
    );
}

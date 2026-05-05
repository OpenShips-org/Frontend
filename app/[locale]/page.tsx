import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import MainMap from "@/components/map/mainMap";
import NavBar from "@/components/navbar/navbar";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("MapPage");
    const main = await getTranslations("Main");
    return {
        title: t("window_title"),
        description: main("description"),
        icons: "/icons/openships_icon.svg",

        openGraph: {
            title: main("opengraph_title"),
            description: main("opengraph_description"),
        },
    };
}

export default function Page() {
    return (
        <div className="flex h-dvh w-full flex-col overflow-hidden">
            <NavBar />
            <div className="min-h-0 w-full flex-1">
                <MainMap />
            </div>
        </div>
    );
}

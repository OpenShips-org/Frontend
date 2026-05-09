import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import MainMap from "@/components/map/mainMap";
import NavBar from "@/components/navbar/navbar";
import FirstVisit from "@/components/popups/firstVisit";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("MapPage");
    const main = await getTranslations("Main");
    return {
        title: t("window_title"),
        description: main("description"),
        icons: "/icons/openships_icon.svg",

        openGraph: {
            type: "website",
            url: "https://openships.de",
            siteName: "OpenShips",
            title: main("opengraph_title"),
            description: main("opengraph_description"),
            images: [
                {
                    url: "/icons/openships_icon.png",
                    width: 500,
                    height: 500,
                    alt: "OpenShips Logo",
                },
            ],
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
            <FirstVisit />
        </div>
    );
}

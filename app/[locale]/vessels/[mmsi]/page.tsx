import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { apiBaseUrl } from "@/lib/config";
import NavBar from "@/components/navbar/navbar";
import { VesselData } from "@/types/vesselTypes";
import Logo from "@/public/icons/openships_icon.svg";
import Image from "next/image";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ mmsi: string }>;
}): Promise<Metadata> {
    const { mmsi } = await params;
    const t = await getTranslations("VesselDetailsPage");

    const res = await fetch(
        `${apiBaseUrl}/external/vessels/static/${mmsi}?scrapedData=false`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return {
            title: t("window_title", { name: "", mmsi }),
            description: t("window_title", { name: "", mmsi }),
            icons: "/icons/openships_icon.svg",
        };
    }

    const vesselData = await res.json();
    const name: string = vesselData.vesselName || mmsi;

    return {
        title: t("window_title", { name: name.trim(), mmsi }),
        description: t("window_title", { name: name.trim(), mmsi }),
        icons: "/icons/openships_icon.svg",
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ mmsi: string }>;
}) {
    const { mmsi } = await params;
    const t = await getTranslations("VesselDetailsPage");

    const res = await fetch(
        `${apiBaseUrl}/external/vessels/static/${mmsi}?scrapedData=true`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        return (
            <div className="flex h-screen w-screen flex-col items-center justify-start overflow-hidden">
                <NavBar />
                
                <div className="flex flex-col h-full w-full items-center justify-center">
                    <Image src={Logo} alt="OpenShips Logo" className="invert dark:invert-0" height={200} />
                    <h1 className="p-4 text-3xl font-bold mb-40">
                        {t("vessel_not_found", { mmsi })}
                    </h1>
                </div>
            </div>
        );
    }

    const vesselData: VesselData = await res.json();

    return (
        <div>
            <div className="flex h-screen w-screen flex-col items-center justify-start overflow-hidden">
                <NavBar />
                <h1 className="p-4 text-3xl font-bold">
                    {vesselData.vesselName || mmsi}
                </h1>
            </div>
        </div>
    );
}

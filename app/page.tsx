import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "OpenShips",
    description:
        "OpenShips is a free and open-source Vessel Tracking Platform as an alternative to platforms like MarineTraffic or VesselFinder. It provides real-time tracking of ships, allowing users to monitor vessel movements and access detailed information about each ship.",

    openGraph: {
        title: "OpenShips",
        description:
            "OpenShips is a free and open-source Vessel Tracking Platform as an alternative to platforms like MarineTraffic or VesselFinder. It provides real-time tracking of ships, allowing users to monitor vessel movements and access detailed information about each ship.",
        url: "https://openships.de",
        siteName: "OpenShips",
    },
};

export default function Page() {
    redirect("/en");
}

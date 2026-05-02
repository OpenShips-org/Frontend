import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "OpenShips",
    description: "OpenShips is a free and open-source Vessel Tracking Platform. It provides real-time tracking of ships, allowing users to monitor vessel movements and access detailed information about each ship. With OpenShips, you can easily track the location, speed, and other relevant data of ships around the world.",

    openGraph: {
        title: "OpenShips",
        description: "OpenShips is a free and open-source Vessel Tracking Platform. It provides real-time tracking of ships, allowing users to monitor vessel movements and access detailed information about each ship. With OpenShips, you can easily track the location, speed, and other relevant data of ships around the world.",
        url: "https://openships.de",
        siteName: "OpenShips",
    }
}

export default function Page() {
    redirect("/en")
}

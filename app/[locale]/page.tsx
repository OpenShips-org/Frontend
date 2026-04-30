import { useTranslations } from "next-intl"
import CoreMap from "@/components/map/coreMap"
import NavBar from "@/components/navbar/navbar"

export default function Page() {
    const t = useTranslations("MapPage")

    return (
        <div className="h-screen w-screen overflow-hidden">
            <NavBar />
            <div className="h-231 w-screen">
                <CoreMap />
            </div>
        </div>
    )
}
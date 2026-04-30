import React from 'react'
import { useTranslations } from "next-intl"
import Image from 'next/image'
import Logo from "../../public/icons/openships_icon.svg"

export default function NavBar() {

    const t = useTranslations("NavBar")

    return (
        <div className="w-full h-18 bg-gray-800 text-white flex items-center justify-between px-4">
            <div className="text-lg font-bold ml-4">
                <Image src={Logo} alt="Logo" width={64} height={64} className="inline-block mr-2 text-white" />
                {t("title")}
            </div>
            <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">{t("link_map")}</a>
                <a href="#" className="hover:text-gray-400">{t("link_vessels")}</a>
                <a href="#" className="hover:text-gray-400">{t("link_ports")}</a>
            </div>
        </div>
    )
}
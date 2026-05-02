import React from 'react'
import { useTranslations } from "next-intl"
import Image from 'next/image'
import Logo from "../../public/icons/openships_icon.svg"
import { Link } from '@/i18n/navigation'

export default function NavBar() {

    const t = useTranslations("NavBar")

    return (
        <div className="relative w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 shadow-2xl">
            <div className="text-2xl sm:text-3xl font-bold ml-2 sm:ml-4 flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src={Logo} alt="Logo" width={48} height={48} className="inline-block mr-2 w-10 h-10 sm:w-16 sm:h-16" />
                    <span className="hidden sm:inline">{t("title")}</span>
                </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex space-x-4 text-2xl">
                <Link href="/" className="hover:text-gray-400 transition-colors duration-200">{t("link_map")}</Link>
                <Link href="/vessels" className="hover:text-gray-400 transition-colors duration-200">{t("link_vessels")}</Link>
                <Link href="/ports" className="hover:text-gray-400 transition-colors duration-200">{t("link_ports")}</Link>
            </div>
        </div>
    )
}
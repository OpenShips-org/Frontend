import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Logo from "../../public/icons/openships_icon.svg";
import { Link } from "@/i18n/navigation";

export default function NavBar() {
    const t = useTranslations("NavBar");

    return (
        <div className="relative flex h-16 w-full items-center justify-between bg-gray-800 px-4 text-white shadow-2xl">
            <div className="ml-2 flex items-center text-2xl font-bold sm:ml-4 sm:text-3xl">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={48}
                        height={48}
                        className="mr-2 inline-block h-10 w-10 sm:h-16 sm:w-16"
                    />
                    <span className="hidden sm:inline">{t("title")}</span>
                </Link>
            </div>
            <div className="absolute left-1/2 flex -translate-x-1/2 space-x-4 text-2xl">
                <Link
                    href="/"
                    className="transition-colors duration-200 hover:text-gray-400"
                >
                    {t("link_map")}
                </Link>
                <Link
                    href="/vessels"
                    className="transition-colors duration-200 hover:text-gray-400"
                >
                    {t("link_vessels")}
                </Link>
                <Link
                    href="/ports"
                    className="transition-colors duration-200 hover:text-gray-400"
                >
                    {t("link_ports")}
                </Link>
            </div>
        </div>
    );
}

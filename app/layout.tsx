import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "map-gl-style-switcher/dist/map-gl-style-switcher.css";

import { ThemeProvider } from "@/components/theme-provider";
import QueryClientProvider from "@/components/queryClient-provider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                geist.variable
            )}
        >
            <body>
                <ThemeProvider>
                    <QueryClientProvider>{children}</QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

"use client";

import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

export default function QueryClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [client] = useState(() => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnReconnect: false,
                    retry: false,
                    staleTime: 1000 * 60 * 5, // 5 minutes,
                    refetchIntervalInBackground: false,
                },
            },
        });
        return queryClient;
    });

    return (
        <ReactQueryClientProvider client={client}>
            {children}
        </ReactQueryClientProvider>
    );
}

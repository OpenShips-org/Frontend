"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { set } from "lodash";

export default function FirstVisit() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");
        if (!hasVisitedBefore) {
            setOpen(true);
            localStorage.setItem("hasVisitedBefore", "true");
        }
    }, []);

    const t = useTranslations("Popup_FirstVisit");

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription className="mt-3">
                        {t("message")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button size={"lg"} className="hover:cursor-pointer">
                            {t("ok_button")}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

import { useEffect, useState } from "react";

export function useIsTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const hasTouch = () => {
            return "ontouchstart" in window || navigator.maxTouchPoints > 0;
        };

        setIsTouchDevice(hasTouch());
    }, []);

    return isTouchDevice;
}

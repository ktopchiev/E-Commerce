import { useState, useEffect } from "react";

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "">("");

    const handleResize = () => {
        if (window.innerWidth < 600) {
            setScreenSize("xs");
        } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
            setScreenSize("sm");
        } else if (window.innerWidth >= 900 && window.innerWidth < 1200) {
            setScreenSize("md");
        } else if (window.innerWidth >= 1200 && window.innerWidth < 1536) {
            setScreenSize("lg");
        } else if (window.innerWidth >= 1536) {
            setScreenSize("xl");
        }
    };

    useEffect(() => {

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenSize;
}

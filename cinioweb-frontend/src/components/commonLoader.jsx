import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./commonLoader.css";

export default function CommonLoader({ message = "Loading..." }) {
    const rootRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(rootRef.current, { opacity: 0, duration: 0.3 });
            gsap.from(textRef.current, { y: 10, opacity: 0, duration: 0.4, delay: 0.2 });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="common-loader" ref={rootRef}>
            <video
                className="common-loader__video"
                src="/loading_fullscreen.mp4"
                autoPlay
                loop
                muted
                playsInline
            />
            <p className="common-loader__message" ref={textRef}>{message}</p>
        </div>
    );
}
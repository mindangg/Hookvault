"use client";
import React, { Suspense, lazy, useRef, useCallback } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SpliteProps {
    scene: string;
    className?: string;
}

export function Splite({ scene, className }: SpliteProps) {
    const splineApp = useRef<Application | null>(null);

    const onLoad = useCallback((app: Application) => {
        splineApp.current = app;
        // Pause immediately — only animate on hover
        app.stop();
    }, []);

    const handleMouseEnter = useCallback(() => {
        splineApp.current?.play();
    }, []);

    const handleMouseLeave = useCallback(() => {
        splineApp.current?.stop();
    }, []);

    return (
        <div
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative" }}
        >
            <Suspense
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 border border-white/20 border-t-white/80 rounded-full animate-spin" />
                    </div>
                }
            >
                <Spline scene={scene} className={className} onLoad={onLoad} />
            </Suspense>
        </div>
    );
}
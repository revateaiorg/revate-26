import React, { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

/* ------------------------------------------------------------------ */
/*  Stable defaults. These live outside the component on purpose:      */
/*  the effect below re-creates the WebGL globe whenever a prop        */
/*  changes identity, and Contact re-renders on every keystroke.       */
/* ------------------------------------------------------------------ */
const NO_MARKERS = [];
const NO_ARCS = [];
const DEFAULT_MARKER = [0.38, 0.65, 0.98];
const DEFAULT_BASE = [0.23, 0.51, 0.96];
const DEFAULT_ARC = [0.38, 0.65, 0.98];
const DEFAULT_GLOW = [0.05, 0.12, 0.38];

const labelBase = {
    position: "absolute",
    bottom: "anchor(top)",
    left: "anchor(center)",
    translate: "-50% 0",
    marginBottom: 8,
    padding: "3px 8px",
    borderRadius: 6,
    color: "#fff",
    fontSize: "0.65rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    transition: "opacity 0.8s, filter 0.8s",
};

const arrow = {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translate3d(-50%, -1px, 0)",
    border: "5px solid transparent",
    borderTopColor: "#2563EB",
};

export const Globe = React.memo(function Globe({
    markers = NO_MARKERS,
    arcs = NO_ARCS,
    className = "",
    markerColor = DEFAULT_MARKER,
    baseColor = DEFAULT_BASE,
    arcColor = DEFAULT_ARC,
    glowColor = DEFAULT_GLOW,
    dark = 1,
    mapBrightness = 6,
    markerSize = 0.03,
    markerElevation = 0.01,
    arcWidth = 0.5,
    arcHeight = 0.25,
    speed = 0.003,
    theta = 0.25,
    diffuse = 1.2,
    mapSamples = 16000,
}) {
    const canvasRef = useRef(null);
    const pointerInteracting = useRef(null);
    const lastPointer = useRef(null);
    const dragOffset = useRef({ phi: 0, theta: 0 });
    const velocity = useRef({ phi: 0, theta: 0 });
    const phiOffsetRef = useRef(0);
    const thetaOffsetRef = useRef(0);
    const isPausedRef = useRef(false);

    const handlePointerDown = useCallback((e) => {
        pointerInteracting.current = { x: e.clientX, y: e.clientY };
        if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        isPausedRef.current = true;
    }, []);

    const handlePointerMove = useCallback((e) => {
        if (pointerInteracting.current !== null) {
            const deltaX = e.clientX - pointerInteracting.current.x;
            const deltaY = e.clientY - pointerInteracting.current.y;
            dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
            const now = Date.now();
            if (lastPointer.current) {
                const dt = Math.max(now - lastPointer.current.t, 1);
                const maxVelocity = 0.15;
                velocity.current = {
                    phi: Math.max(
                        -maxVelocity,
                        Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)
                    ),
                    theta: Math.max(
                        -maxVelocity,
                        Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)
                    ),
                };
            }
            lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
        }
    }, []);

    const handlePointerUp = useCallback(() => {
        if (pointerInteracting.current !== null) {
            phiOffsetRef.current += dragOffset.current.phi;
            thetaOffsetRef.current += dragOffset.current.theta;
            dragOffset.current = { phi: 0, theta: 0 };
            lastPointer.current = null;
        }
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        isPausedRef.current = false;
    }, []);

    useEffect(() => {
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerup", handlePointerUp, { passive: true });
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        let globe = null;
        let animationId;
        let phi = 0;
        let ro;

        const mapMarkers = () =>
            markers.map((m) => ({ location: m.location, size: markerSize, id: m.id }));
        const mapArcs = () => arcs.map((a) => ({ from: a.from, to: a.to, id: a.id }));

        function init() {
            const width = canvas.offsetWidth;
            if (width === 0 || globe) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            globe = createGlobe(canvas, {
                devicePixelRatio: dpr,
                width,
                height: width,
                phi: 0,
                theta,
                dark,
                diffuse,
                mapSamples,
                mapBrightness,
                baseColor,
                markerColor,
                glowColor,
                markerElevation,
                markers: mapMarkers(),
                arcs: mapArcs(),
                arcColor,
                arcWidth,
                arcHeight,
                opacity: 0.85,
            });

            function animate() {
                if (!isPausedRef.current) {
                    phi += speed;
                    if (
                        Math.abs(velocity.current.phi) > 0.0001 ||
                        Math.abs(velocity.current.theta) > 0.0001
                    ) {
                        phiOffsetRef.current += velocity.current.phi;
                        thetaOffsetRef.current += velocity.current.theta;
                        velocity.current.phi *= 0.95;
                        velocity.current.theta *= 0.95;
                    }
                    const thetaMin = -0.4;
                    const thetaMax = 0.4;
                    if (thetaOffsetRef.current < thetaMin) {
                        thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
                    } else if (thetaOffsetRef.current > thetaMax) {
                        thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
                    }
                }
                globe.update({
                    phi: phi + phiOffsetRef.current + dragOffset.current.phi,
                    theta: theta + thetaOffsetRef.current + dragOffset.current.theta,
                    dark,
                    mapBrightness,
                    markerColor,
                    baseColor,
                    arcColor,
                    markerElevation,
                    markers: mapMarkers(),
                    arcs: mapArcs(),
                });
                animationId = requestAnimationFrame(animate);
            }
            animate();
            setTimeout(() => canvas && (canvas.style.opacity = "1"));
        }

        if (canvas.offsetWidth > 0) {
            init();
        } else {
            ro = new ResizeObserver((entries) => {
                if (entries[0]?.contentRect.width > 0) {
                    ro.disconnect();
                    init();
                }
            });
            ro.observe(canvas);
        }

        return () => {
            if (ro) ro.disconnect();
            if (animationId) cancelAnimationFrame(animationId);
            if (globe) globe.destroy();
        };
    }, [
        markers, arcs, markerColor, baseColor, arcColor, glowColor, dark,
        mapBrightness, markerSize, markerElevation, arcWidth, arcHeight,
        speed, theta, diffuse, mapSamples,
    ]);

    return (
        <div className={`relative aspect-square select-none ${className}`}>
            <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    opacity: 0,
                    transition: "opacity 1.2s ease",
                    borderRadius: "50%",
                    touchAction: "none",
                    pointerEvents: "auto", // so a parent can be pointer-events-none without killing drag
                }}
            />
            {/* City labels use CSS Anchor Positioning (Chrome/Edge). Other browsers simply don't show them. */}
            {markers.map((m) => (
                <div
                    key={m.id}
                    style={{
                        ...labelBase,
                        positionAnchor: `--cobe-${m.id}`,
                        background: "#2563EB",
                        opacity: `var(--cobe-visible-${m.id}, 0)`,
                        filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 0)) * 8px))`,
                    }}
                >
                    {m.label}
                    <span style={arrow} />
                </div>
            ))}
        </div>
    );
});

/* ------------------------------------------------------------------ */
/*  Ready-to-use version for the Contact card                          */
/* ------------------------------------------------------------------ */
const CHENNAI = [13.0827, 80.2707];

const markers = [
    { id: "chennai", location: CHENNAI, label: "Chennai" },
    { id: "london", location: [51.5074, -0.1278], label: "London" },
    { id: "nyc", location: [40.7128, -74.006], label: "New York" },
    { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
    { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
    { id: "sydney", location: [-33.8688, 151.2093], label: "Sydney" },
];

const arcs = [
    { id: "chennai-london", from: CHENNAI, to: [51.5074, -0.1278] },
    { id: "chennai-nyc", from: CHENNAI, to: [40.7128, -74.006] },
    { id: "chennai-singapore", from: CHENNAI, to: [1.3521, 103.8198] },
    { id: "chennai-sydney", from: CHENNAI, to: [-33.8688, 151.2093] },
];

export const ContactGlobe = () => (
    <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-12 z-0 w-[280px] min-[900px]:-bottom-24 min-[900px]:-left-16 min-[900px]:w-[400px]"
    >
        {/* soft blue glow behind the globe */}
        <div className="absolute -inset-[25%] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_60%)] blur-2xl" />
        <Globe markers={markers} arcs={arcs} />
    </div>
);

export default Globe;
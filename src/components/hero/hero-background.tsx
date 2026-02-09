// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm"; // Ensure maath is installed or use custom random
import { useMotionValue, useSpring } from "framer-motion";

function Network({ count = 1500, mouse }: { count?: number; mouse: any }) {
    const points = useRef<any>(null);

    // Generate random positions (sphere)
    const sphere = useMemo(() => {
        const data = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 1.2 * Math.cbrt(Math.random());
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            data[i * 3] = x;
            data[i * 3 + 1] = y;
            data[i * 3 + 2] = z;
        }
        return data;
    }, [count]);

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.x -= delta / 10;
            points.current.rotation.y -= delta / 15;
        }
    });

    return (
        // @ts-ignore
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#1E90FF"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function HeroBackground() {
    const mouse = { x: useSpring(useMotionValue(0)), y: useSpring(useMotionValue(0)) };

    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Network mouse={mouse} />
            </Canvas>
            {/* Fallback Gradient Overlay (always visible for depth, but crucial for mobile if we disable canvas) */}
            <div className="absolute inset-0 bg-gradient-to-b from-monjez-dark/20 via-monjez-dark/80 to-monjez-dark pointer-events-none" />
        </div>
    );
}

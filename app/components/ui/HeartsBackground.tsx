"use client";

import * as THREE from "three";
import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, InstancedRigidBodies, RapierRigidBody, InstancedRigidBodyProps } from "@react-three/rapier";

const PALETTE = ["#d0a1a9", "#d5aab2", "#debdc3", "#e8d0d4", "#f6ecee", "#fadadd"];

// Geometria serca (zoptymalizowana)
const heartShape = new THREE.Shape();
const x = 0, y = 0;
heartShape.moveTo(x + 0.5, y + 0.5);
heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

function PhysicsHearts({ count }: { count: number }) {
    const bodies = useRef<RapierRigidBody[]>(null);
    const mesh = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const instances = useMemo(() => {
        const temp: InstancedRigidBodyProps[] = [];
        for (let i = 0; i < count; i++) {
            const scale = Math.random() * (0.4 - 0.2) + 0.2;
            temp.push({
                key: i,
                position: [
                    (Math.random() - 0.5) * viewport.width,
                    (Math.random() - 0.5) * viewport.height,
                    Math.random() * 4 + 1 // Bliżej kamery (oś Z)
                ],
                scale: [scale, scale, scale],
                userData: { color: PALETTE[Math.floor(Math.random() * PALETTE.length)] }
            });
        }
        return temp;
    }, [viewport, count]);

    const geometry = useMemo(() => {
        const geom = new THREE.ExtrudeGeometry(heartShape, {
            depth: 0.08,
            bevelEnabled: true,
            bevelSegments: 1,
            bevelSize: 0.02,
            bevelThickness: 0.02,
            curveSegments: 4
        });
        geom.center();
        geom.rotateZ(Math.PI);
        return geom;
    }, []);

    useEffect(() => {
        if (!mesh.current || !bodies.current) return;
        const tempColor = new THREE.Color();
        instances.forEach((data, i) => {
            mesh.current!.setColorAt(i, tempColor.set((data.userData as any).color));
            const body = bodies.current![i];
            if (body) {
                // Stała prędkość na start
                body.setLinvel({
                    x: (Math.random() - 0.5) * 1.5,
                    y: (Math.random() - 0.5) * 1.5,
                    z: 0
                }, true);
            }
        });
        mesh.current.instanceColor!.needsUpdate = true;
    }, [instances]);

    useFrame(() => {
        if (!bodies.current) return;
        const margin = 2;
        const halfWidth = viewport.width / 2 + margin;
        const halfHeight = viewport.height / 2 + margin;

        bodies.current.forEach((body) => {
            if (!body) return;
            const pos = body.translation();

            // Warp wokół krawędzi (pętla ruchu)
            if (pos.x > halfWidth) body.setTranslation({ x: -halfWidth, y: pos.y, z: pos.z }, true);
            else if (pos.x < -halfWidth) body.setTranslation({ x: halfWidth, y: pos.y, z: pos.z }, true);
            if (pos.y > halfHeight) body.setTranslation({ x: pos.x, y: -halfHeight, z: pos.z }, true);
            else if (pos.y < -halfHeight) body.setTranslation({ x: pos.x, y: halfHeight, z: pos.z }, true);
        });
    });

    return (
        <InstancedRigidBodies
            ref={bodies}
            instances={instances}
            colliders="cuboid"
            linearDamping={0}    // Brak wyhamowywania ruchu postępowego
            angularDamping={0}   // Brak wyhamowywania rotacji
            canSleep={false}     // Serduszka nigdy nie "zasypiają" (nie stają w miejscu)
        >
            <instancedMesh ref={mesh} args={[geometry, undefined, count]}>
                <meshStandardMaterial roughness={1} metalness={0} toneMapped={false} />
            </instancedMesh>
        </InstancedRigidBodies>
    );
}

export default function HeartsBackground({ onReady }: { onReady: () => void }) {
    const [count, setCount] = useState(15);

    useEffect(() => {
        // Redukcja serc na mobile (poniżej 768px)
        if (window.innerWidth < 768) {
            setCount(7);
        }
    }, []);

    return (
        <div className="w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={1}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: false
                }}
                onCreated={() => {
                    requestAnimationFrame(() => onReady());
                }}
            >
                <ambientLight intensity={2.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.5} />
                <Physics gravity={[0, 0, 0]}>
                    <PhysicsHearts count={count} />
                </Physics>
            </Canvas>
        </div>
    );
}
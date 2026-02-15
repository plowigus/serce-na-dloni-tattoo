"use client";

import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, InstancedRigidBodies, RapierRigidBody, InstancedRigidBodyProps } from "@react-three/rapier";

const PALETTE = ["#d0a1a9", "#d5aab2", "#debdc3", "#e8d0d4", "#f6ecee", "#fadadd"];
const CONFIG = { count: 15, speed: 1.0 }; // Zmniejszona liczba dla wydajności

// Geometria (bez zmian)
const heartShape = new THREE.Shape();
const x = 0, y = 0;
heartShape.moveTo(x + 0.5, y + 0.5);
heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

function PhysicsHearts() {
    const bodies = useRef<RapierRigidBody[]>(null);
    const mesh = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    const instances = useMemo(() => {
        const temp: InstancedRigidBodyProps[] = [];
        for (let i = 0; i < CONFIG.count; i++) {
            const scale = Math.random() * (0.45 - 0.25) + 0.25;
            temp.push({
                key: i,
                position: [(Math.random() - 0.5) * viewport.width, (Math.random() - 0.5) * viewport.height, 0],
                scale: [scale, scale, scale],
                userData: { color: PALETTE[Math.floor(Math.random() * PALETTE.length)] }
            });
        }
        return temp;
    }, [viewport]);

    const geometry = useMemo(() => {
        const geom = new THREE.ExtrudeGeometry(heartShape, {
            depth: 0.1,
            bevelEnabled: true,
            bevelSegments: 2,
            bevelSize: 0.04,
            bevelThickness: 0.04,
            curveSegments: 6
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
                const dirX = (Math.random() - 0.5) * CONFIG.speed;
                const dirY = (Math.random() - 0.5) * CONFIG.speed;
                body.setLinvel({ x: dirX, y: dirY, z: 0 }, true);
                body.setAngvel({ x: (Math.random() - 0.5), y: (Math.random() - 0.5), z: (Math.random() - 0.5) }, true);
            }
        });
        mesh.current.instanceColor!.needsUpdate = true;
    }, [instances]);

    useFrame(() => {
        if (!bodies.current) return;
        const margin = 1.5;
        const halfWidth = viewport.width / 2 + margin;
        const halfHeight = viewport.height / 2 + margin;
        bodies.current.forEach((body) => {
            if (!body) return;
            const pos = body.translation();
            const vel = body.linvel();
            let reset = false;
            let newX = pos.x, newY = pos.y;
            if (pos.x > halfWidth) { newX = -halfWidth + 0.5; reset = true; }
            else if (pos.x < -halfWidth) { newX = halfWidth - 0.5; reset = true; }
            if (pos.y > halfHeight) { newY = -halfHeight + 0.5; reset = true; }
            else if (pos.y < -halfHeight) { newY = halfHeight - 0.5; reset = true; }
            if (reset) {
                body.setTranslation({ x: newX, y: newY, z: 0 }, true);
                body.setLinvel(vel, true);
            }
        });
    });

    return (
        <InstancedRigidBodies
            ref={bodies}
            instances={instances}
            colliders="hull"
            restitution={1.0}
            friction={0}
            linearDamping={0}
            angularDamping={0}
            enabledRotations={[true, true, true]}
            enabledTranslations={[true, true, false]}
        >
            <instancedMesh ref={mesh} args={[geometry, undefined, CONFIG.count]}>
                <meshStandardMaterial roughness={1} metalness={0} color="#ffffff" toneMapped={false} />
            </instancedMesh>
        </InstancedRigidBodies>
    );
}

interface HeartsProps {
    onReady: () => void;
}

export default function HeartsBackground({ onReady }: HeartsProps) {
    return (
        <div className="w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 1.5]}
                frameloop="always" // Wymusza ciągłe renderowanie
                gl={{
                    antialias: true,
                    alpha: true, // Ważne: Przezroczyste tło canvasu
                    stencil: false,
                    depth: false,
                    powerPreference: "high-performance"
                }}
                onCreated={() => {
                    requestAnimationFrame(() => onReady());
                }}
            >
                {/* Usunięto <color attach="background" ... /> żeby tło pochodziło z CSS (bg-primary-50) */}

                <ambientLight intensity={3.0} />
                <directionalLight position={[5, 10, 5]} intensity={0.5} color="#fff" />
                <Physics gravity={[0, 0, 0]} timeStep={1 / 60}>
                    <PhysicsHearts />
                </Physics>
            </Canvas>
        </div>
    );
}
"use client";

import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics, InstancedRigidBodies, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import { useControls, Leva } from "leva";

const PALETTE = [
    "#d0a1a9", "#bb9198", "#927176", "#e8d0d4", "#d5aab2"
];

// --- 1. Geometria Serca ---
const createHeartShape = () => {
    const x = 0, y = 0;
    const shape = new THREE.Shape();
    shape.moveTo(x + 0.5, y + 0.5);
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);
    return shape;
};

// --- 2. Ściany (Borders) ---
function Borders() {
    const { viewport } = useThree();
    const thickness = 10;

    return (
        <>
            <CuboidCollider position={[0, -viewport.height / 2 - thickness / 2, 0]} args={[viewport.width, thickness / 2, 10]} />
            <CuboidCollider position={[0, viewport.height / 2 + thickness / 2, 0]} args={[viewport.width, thickness / 2, 10]} />
            <CuboidCollider position={[-viewport.width / 2 - thickness / 2, 0, 0]} args={[thickness / 2, viewport.height, 10]} />
            <CuboidCollider position={[viewport.width / 2 + thickness / 2, 0, 0]} args={[thickness / 2, viewport.height, 10]} />
            <CuboidCollider position={[0, 0, -5]} args={[viewport.width, viewport.height, 1]} />
            <CuboidCollider position={[0, 0, 5]} args={[viewport.width, viewport.height, 1]} />
        </>
    );
}

// --- 3. Fizyczne Serca ---
function PhysicsHearts({ config }: { config: any }) {
    const bodies = useRef<RapierRigidBody[]>(null);
    const mesh = useRef<THREE.InstancedMesh>(null);
    // 1. Pobieramy wymiary ekranu, aby rozrzucić serca po całości
    const { viewport } = useThree();

    const instances = useMemo(() => {
        const temp = [];
        for (let i = 0; i < config.count; i++) {
            const scale = Math.random() * (0.6 - 0.3) + 0.3;
            temp.push({
                key: i,
                position: [
                    // 2. Mnożymy przez szerokość/wysokość ekranu (minus margines 2, żeby nie były w ścianie)
                    (Math.random() - 0.5) * (viewport.width - 2),
                    (Math.random() - 0.5) * (viewport.height - 2),
                    0
                ] as [number, number, number],
                rotation: [0, 0, Math.random() * Math.PI] as [number, number, number],
                scale: [scale, scale, scale] as [number, number, number],
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
            });
        }
        return temp;
    }, [config.count, viewport]); // Dodana zależność od viewport

    const geometry = useMemo(() => {
        const shape = createHeartShape();
        const geom = new THREE.ExtrudeGeometry(shape, {
            depth: 0.2,
            bevelEnabled: true,
            bevelSegments: 5,
            bevelSize: 0.05,
            bevelThickness: 0.05,
            curveSegments: 16,
        });
        geom.center();
        geom.rotateZ(Math.PI);
        return geom;
    }, []);

    useEffect(() => {
        if (!mesh.current || !bodies.current) return;

        const tempColor = new THREE.Color();

        instances.forEach((data, i) => {
            mesh.current!.setColorAt(i, tempColor.set(data.color));
            const body = bodies.current![i];
            if (body) {
                const dirX = (Math.random() - 0.5) * config.speed;
                const dirY = (Math.random() - 0.5) * config.speed;

                body.setLinvel({ x: dirX, y: dirY, z: 0 }, true);
                body.setAngvel({
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                    z: (Math.random() - 0.5) * 2
                }, true);
            }
        });

        mesh.current.instanceColor!.needsUpdate = true;
    }, [instances, config.speed]);

    return (
        <InstancedRigidBodies
            ref={bodies}
            instances={instances}
            colliders="hull"
            restitution={1.2}
            friction={0}
            linearDamping={0}
            angularDamping={0}
        >
            <instancedMesh ref={mesh} args={[geometry, undefined, config.count]} castShadow receiveShadow>
                <meshStandardMaterial
                    roughness={0.8}
                    metalness={0.1}
                    color="#fff"
                />
            </instancedMesh>
        </InstancedRigidBodies>
    );
}

export default function HeartsBackground() {
    const config = useControls("Fizyka Serc", {
        count: { value: 30, min: 5, max: 50, step: 1, label: "Ilość" },
        speed: { value: 1.2, min: 1, max: 20, label: "Prędkość początkowa" },
    });

    return (
        <div className="absolute inset-0 w-full h-full bg-primary-50">
            <Leva collapsed={false} />

            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={2.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} />
                <Environment preset="city" environmentIntensity={0.2} />

                <Physics gravity={[0, 0, 0]}>
                    <Borders />
                    <PhysicsHearts config={config} />
                </Physics>
            </Canvas>
        </div>
    );
}
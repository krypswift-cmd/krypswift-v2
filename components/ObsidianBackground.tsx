'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface BackgroundProps {
  activeSection: number;
  scrollProgress: number;
}

// ── Inside Canvas component: Animated scene elements ────────────────────────
function SceneContent({ activeSection, scrollProgress }: BackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const gridRef = useRef<THREE.LineSegments>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Mesh>(null);
  const pulseRefs = useRef<Array<THREE.Mesh | null>>([]);
  const emissionPointsRef = useRef<THREE.Points>(null);
  const emissionMaterialRef = useRef<THREE.PointsMaterial>(null);
  const allocationMaterialRef = useRef<THREE.PointsMaterial>(null);

  // Smoothly interpolated camera lookAt anchor vector
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const particleCount = 200;
  const emissionCount = 150;
  const allocationCount = 200;

  // Initialize persistent state for inward-drifting, orbiting background particles
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < particleCount; i++) {
      list.push({
        angle: Math.random() * Math.PI * 2,
        radius: 2 + Math.random() * 28, // initial spread radius from Y-axis
        y: (Math.random() - 0.5) * 35,   // vertical altitude along Y-axis
        orbitSpeed: 0.08 + Math.random() * 0.18, // orbital speed
        driftSpeed: 0.025 + Math.random() * 0.08, // inward drift velocity
      });
    }
    return list;
  }, []);

  // Pre-allocate buffer arrays for background particles
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    return [pos];
  }, []);

  // ── Setup dedicated emission particle system for Act III (Outflow) ────────
  const emissionParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < emissionCount; i++) {
      list.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 15, // pre-spread radius for seamless visual start
        speed: 0.022 + Math.random() * 0.045, // radial expansion speed
      });
    }
    return list;
  }, []);

  // Pre-allocate buffer arrays for emission particles
  const [emissionPositions] = useMemo(() => {
    const pos = new Float32Array(emissionCount * 3);
    return [pos];
  }, []);

  // ── Setup dedicated 200 allocations 3D matrix for Act IV (Blueprint) ──────
  const allocationPositions = useMemo(() => {
    const pos = new Float32Array(allocationCount * 3);
    let index = 0;
    const spacing = 0.38; // perfect spacing inside the hollow chassis
    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
        for (let z = 0; z < 8; z++) {
          if (index >= allocationCount) break;
          // Center the grid points in local chassis coordinate space
          pos[index * 3] = (x - 2) * spacing;
          pos[index * 3 + 1] = (y - 2) * spacing;
          pos[index * 3 + 2] = (z - 3.5) * spacing;
          index++;
        }
      }
    }
    return pos;
  }, []);

  // Generate custom wireframe matrix grid
  const gridGeometry = useMemo(() => {
    const size = 60;
    const divisions = 30;
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    // Horizontal grid lines
    for (let i = -divisions; i <= divisions; i++) {
      const coord = (i / divisions) * size;
      
      // X lines at Y = -12, Z ranging
      vertices.push(-size, -12, coord, size, -12, coord);
      // Z lines at Y = -12, X ranging
      vertices.push(coord, -12, -size, coord, -12, size);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geometry;
  }, []);

  // ── Setup Core Lattice wireframe geometry and adjacency graph ──────────────
  const latticeGeometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(2, 2);
  }, []);

  const vertices = useMemo(() => {
    const pos = latticeGeometry.attributes.position;
    const list: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      list.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
    }
    return list;
  }, [latticeGeometry]);

  const adjacencyList = useMemo(() => {
    const indexAttr = latticeGeometry.index;
    const list: Record<number, Set<number>> = {};
    
    if (indexAttr) {
      const arr = indexAttr.array;
      for (let i = 0; i < indexAttr.count; i += 3) {
        const a = arr[i];
        const b = arr[i + 1];
        const c = arr[i + 2];
        
        if (!list[a]) list[a] = new Set();
        if (!list[b]) list[b] = new Set();
        if (!list[c]) list[c] = new Set();
        
        list[a].add(b); list[a].add(c);
        list[b].add(a); list[b].add(c);
        list[c].add(a); list[c].add(b);
      }
    }
    
    const finalMap: Record<number, number[]> = {};
    for (const key in list) {
      finalMap[Number(key)] = Array.from(list[Number(key)]);
    }
    return finalMap;
  }, [latticeGeometry]);

  // Persistent VRF Pulse tracking states
  const pulses = useMemo(() => {
    const list = [];
    for (let i = 0; i < 4; i++) {
      list.push({
        currentIdx: 0,
        targetIdx: 0,
        progress: 0,
        hops: 0,
        position: new THREE.Vector3(),
        active: false,
        speed: 0.05,
      });
    }
    return list;
  }, []);

  // Frame tick animation loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Dual Vector Camera interpolation based on scroll index
    // Act I Target:   Camera position [0, 0, 18],     lookAt target [0, 0, 0]
    // Act II Target:  Camera position [0, 1.8, 10],   lookAt target [0, 0, 0]
    // Act III Target: Camera position [0, 12, 0.01],  lookAt target [0, 0, 0] (Top-down)
    // Act IV Target:  Camera position [6, 5, 12],     lookAt target [0, 0, 0] (Isometric)
    // Act V Target:   Camera position [0, -0.5, 0.2], lookAt target [0, 10, 0] (Under lattice skyward)
    let targetX = 0;
    let targetY = 0;
    let targetZ = 18;
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    if (activeSection === 1) {
      targetY = 1.8;
      targetZ = 10;
    } else if (activeSection === 2) {
      targetY = 12;
      targetZ = 0.01;
    } else if (activeSection === 3) {
      targetX = 6;
      targetY = 5;
      targetZ = 12;
    } else if (activeSection >= 4) {
      targetX = 0;
      targetY = -0.5;
      targetZ = 0.2;
      // Target lookAt vector points high up the Y-axis monolithic beam
      targetLookAt.set(0, 10, 0);
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.04);
    
    // Smoothly lerp camera lookAt vector target
    currentLookAt.current.lerp(targetLookAt, 0.04);
    state.camera.lookAt(currentLookAt.current);

    // 2. Central Y-axis vector beam pulsing (extremely dim in Act II, III, IV, and V)
    if (beamRef.current) {
      const material = beamRef.current.material as THREE.MeshBasicMaterial;
      const baseOpacity = activeSection >= 1 ? 0.08 : 0.7;
      const pulseRange = activeSection >= 1 ? 0.03 : 0.3;
      material.opacity = baseOpacity + Math.sin(time * 1.8) * pulseRange;
    }

    // 3. Core Lattice scale expansion & active fade-in
    if (latticeRef.current) {
      const material = latticeRef.current.material as THREE.MeshBasicMaterial;
      
      const targetOpacity = activeSection >= 1 ? 0.15 : 0.05;
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.05);

      // Symmetrical lattice deconstruction scale lerp (expanded in Act IV & V)
      const targetScale = activeSection >= 3 ? 1.5 : 1.0;
      const currentScale = THREE.MathUtils.lerp(latticeRef.current.scale.x, targetScale, 0.05);
      latticeRef.current.scale.setScalar(currentScale);

      latticeRef.current.rotation.y = time * 0.04;
      latticeRef.current.rotation.x = time * 0.02;
    }

    // 4. VRF Pulse path zipping nested inside Core Lattice (Active in Act II, III, IV, and V)
    if (vertices.length > 0) {
      for (let i = 0; i < 4; i++) {
        const p = pulses[i];
        const mesh = pulseRefs.current[i];
        
        // Spawn/respawn pulse if inactive
        if (!p.active && Math.random() < 0.04) {
          const startIdx = Math.floor(Math.random() * vertices.length);
          const neighbors = adjacencyList[startIdx];
          if (neighbors && neighbors.length > 0) {
            p.currentIdx = startIdx;
            p.targetIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
            p.progress = 0;
            p.hops = Math.floor(Math.random() * 6) + 4; // 4 to 10 hops before fade-out
            p.position.copy(vertices[startIdx]);
            p.active = true;
            p.speed = 0.03 + Math.random() * 0.05;
          }
        }

        // Animate pulse along wireframe edge
        if (p.active) {
          p.progress += p.speed;
          
          const vStart = vertices[p.currentIdx];
          const vEnd = vertices[p.targetIdx];
          
          if (vStart && vEnd) {
            p.position.lerpVectors(vStart, vEnd, p.progress);
          }

          if (p.progress >= 1.0) {
            p.progress = 0;
            p.hops--;
            if (p.hops <= 0) {
              p.active = false;
            } else {
              p.currentIdx = p.targetIdx;
              const neighbors = adjacencyList[p.currentIdx];
              if (neighbors && neighbors.length > 0) {
                p.targetIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
              } else {
                p.active = false;
              }
            }
          }

          if (mesh) {
            mesh.visible = activeSection >= 1; // show pulses in active acts
            mesh.position.copy(p.position);
          }
        } else {
          if (mesh) {
            mesh.visible = false;
          }
        }
      }
    }

    // 5. Public Goods Emission Radial Outflow Physics (Act III: The Outflow)
    if (emissionPointsRef.current) {
      const posAttr = emissionPointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < emissionCount; i++) {
        const ep = emissionParticles[i];

        ep.radius += ep.speed;

        if (ep.radius > 15) {
          ep.radius = 0;
          ep.angle = Math.random() * Math.PI * 2;
        }

        arr[i * 3] = Math.cos(ep.angle) * ep.radius;
        arr[i * 3 + 1] = 0;
        arr[i * 3 + 2] = Math.sin(ep.angle) * ep.radius;
      }
      posAttr.needsUpdate = true;
    }

    // Smoothly fade emission particle system
    if (emissionMaterialRef.current) {
      const targetOpacity = activeSection === 2 ? 0.8 : 0;
      emissionMaterialRef.current.opacity = THREE.MathUtils.lerp(
        emissionMaterialRef.current.opacity,
        targetOpacity,
        0.05
      );
    }

    // 6. 200 Allocations Matrix grid opacity (Act IV: 0.5, Act V: 0.1 to avoid occlusion)
    if (allocationMaterialRef.current) {
      let targetOpacity = 0;
      if (activeSection === 3) {
        targetOpacity = 0.5;
      } else if (activeSection >= 4) {
        targetOpacity = 0.1; // faded down for skyward background depth
      }
      allocationMaterialRef.current.opacity = THREE.MathUtils.lerp(
        allocationMaterialRef.current.opacity,
        targetOpacity,
        0.05
      );
    }

    // 7. Custom background particle drift & orbit inward toward Y-axis
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        p.angle += p.orbitSpeed * 0.007;
        p.radius -= p.driftSpeed * 0.010;

        if (p.radius < 0.15) {
          p.radius = 20 + Math.random() * 10;
          p.angle = Math.random() * Math.PI * 2;
        }

        arr[i * 3] = Math.cos(p.angle) * p.radius;
        arr[i * 3 + 1] = p.y;
        arr[i * 3 + 2] = Math.sin(p.angle) * p.radius;
      }
      posAttr.needsUpdate = true;
    }

    // 8. Gentle grid waves
    if (gridRef.current) {
      gridRef.current.position.y = -12 + Math.sin(time * 0.25) * 0.3;
      gridRef.current.rotation.y = time * 0.003;
    }
  });

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      {/* Depth fog */}
      <fog attach="fog" args={['#000000', 8, 40]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 10]} color="#00F0FF" intensity={2} />

      {/* Central Monolithic Anchor: Glowing Pulsing Vector Beam */}
      <mesh ref={beamRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 10, 8]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core Lattice Mesh: hollow wireframe icosahedron */}
      <mesh ref={latticeRef} geometry={latticeGeometry}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe={true}
          transparent={true}
          opacity={0.02}
          blending={THREE.AdditiveBlending}
        />

        {/* VRF Pulse indicators (Sphere points) nested inside lattice rotation */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => { pulseRefs.current[i] = el; }}
            visible={false}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent={true}
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}

        {/* Act IV Blueprint: batched 200 allocations 3D matrix points nested inside chassis */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[allocationPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            ref={allocationMaterialRef}
            color="#00F0FF"
            size={0.05}
            sizeAttenuation={true}
            transparent={true}
            opacity={0}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </mesh>

      {/* Act III Public Goods: radial emission horizontal outflow particle system */}
      <points ref={emissionPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emissionPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={emissionMaterialRef}
          color="#00F0FF"
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floating background orbit-drift particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00F0FF"
          size={0.12}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Structured grid lines */}
      <lineSegments ref={gridRef} geometry={gridGeometry}>
        <lineBasicMaterial
          color="#00F0FF"
          transparent={true}
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

// ── Main Background Canvas orchestrator ─────────────────────────────────────
export default function ObsidianBackground({ activeSection, scrollProgress }: BackgroundProps) {
  return (
    <div className="canvas-background">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <SceneContent activeSection={activeSection} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

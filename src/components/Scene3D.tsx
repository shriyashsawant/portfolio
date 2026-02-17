import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      // WebGL not available — silently fail
      return;
    }

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const pointLight1 = new THREE.PointLight(0x00ff88, 0.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0x00d4ff, 0.3, 50);
    pointLight2.position.set(-10, -10, -5);
    scene.add(pointLight2);

    // Stars
    const starCount = 1500;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.6, sizeAttenuation: true });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Green particles
    const particleCount = 400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00ff88, size: 0.08, transparent: true, opacity: 0.5, sizeAttenuation: true });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Wireframe octahedrons
    const octaData: { mesh: THREE.Mesh; speed: number }[] = [];
    const octaConfigs = [
      { pos: [-4, 2, -2], color: 0x00ff88, speed: 0.8 },
      { pos: [4, -2, -4], color: 0xff00ff, speed: 1.2 },
      { pos: [-2, -3, -3], color: 0x00d4ff, speed: 0.6 },
      { pos: [3, 3, -5], color: 0xffdd00, speed: 1 },
    ];
    octaConfigs.forEach(({ pos, color, speed }) => {
      const geo = new THREE.OctahedronGeometry(0.6, 0);
      const mat = new THREE.MeshStandardMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      scene.add(mesh);
      octaData.push({ mesh, speed });
    });

    // Rotating torus ring
    const torusGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: new THREE.Color(0x00d4ff),
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.4,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(3, -1, -3);
    scene.add(torus);

    // Grid
    const grid = new THREE.GridHelper(40, 40, 0x00ff88, 0x00ff88);
    grid.position.y = -5;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.06;
    scene.add(grid);

    // Mouse tracking for parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      // Slow star rotation
      stars.rotation.y = t * 0.01;

      // Particle rotation
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.01) * 0.1;

      // Octahedrons float & spin
      octaData.forEach(({ mesh, speed }) => {
        const s = t * speed;
        mesh.rotation.x = Math.sin(s * 0.4) * 0.5;
        mesh.rotation.y = Math.cos(s * 0.3) * 0.5;
        mesh.rotation.z = Math.sin(s * 0.2) * 0.3;
        mesh.position.y += Math.sin(s * 0.5) * 0.002;
      });

      // Torus rotation
      torus.rotation.x = t * 0.15;
      torus.rotation.y = t * 0.1;

      // Camera subtle parallax
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }} />;
}


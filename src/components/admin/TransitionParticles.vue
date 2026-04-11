<template>
  <div
    v-show="isActive"
    class="fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-300"
    :class="{ 'opacity-100': isActive, 'opacity-0': !isActive }"
  >
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import gsap from "gsap";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isActive = ref(false);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let points: THREE.Points;
let geometry: THREE.BufferGeometry;
let material: THREE.PointsMaterial;

const initThree = () => {
  if (!canvasRef.value) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle Geometery
  const particleCount = 10000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 400;
    const y = (Math.random() - 0.5) * 400;
    const z = (Math.random() - 0.5) * 400;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Elegant blue/purple/orange colors from user image
    const r = Math.random();
    if (r < 0.3) {
      // Blue
      colors[i * 3] = 0.2;
      colors[i * 3 + 1] = 0.5;
      colors[i * 3 + 2] = 1.0;
    } else if (r < 0.6) {
      // Orange
      colors[i * 3] = 1.0;
      colors[i * 3 + 1] = 0.4;
      colors[i * 3 + 2] = 0.1;
    } else {
      // Purple/Darker blue
      colors[i * 3] = 0.5;
      colors[i * 3 + 1] = 0.2;
      colors[i * 3 + 2] = 0.8;
    }
  }

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);

  animate();
};

const animate = () => {
  if (!points) return;
  requestAnimationFrame(animate);

  // Subtle rotation
  points.rotation.y += 0.001;
  points.rotation.x += 0.0005;

  renderer.render(scene, camera);
};

const trigger = async () => {
  isActive.value = true;
  
  // Transition In
  gsap.to(material, {
    opacity: 1,
    size: 4,
    duration: 0.8,
    ease: "power2.inOut",
  });

  // Turbulence effect
  gsap.to(points.rotation, {
    y: "+=2",
    duration: 1.5,
    ease: "power2.inOut",
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Transition Out
  gsap.to(material, {
    opacity: 0,
    size: 0,
    duration: 1.0,
    ease: "power2.inOut",
    onComplete: () => {
      isActive.value = false;
    },
  });
};

defineExpose({ trigger });

onMounted(() => {
  initThree();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  renderer?.dispose();
  geometry?.dispose();
  material?.dispose();
});

const handleResize = () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
</script>

<style scoped>
canvas {
  filter: blur(0.5px);
}
</style>

import { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

export interface CitizenTravelBookProps {
  stage: 'intro' | 'open' | 'confirmed';
  appointment: {
    centre: string;
    date: string;
    time: string;
    reference: string;
  };
  reducedMotion?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export function CitizenTravelBook({ stage, appointment, reducedMotion = false, onToggle }: CitizenTravelBookProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(reducedMotion);
  const [manualOpen, setManualOpen] = useState(false);

  // The book should be open when stage is open/confirmed OR manually toggled
  const isOpen = stage === 'open' || stage === 'confirmed' || manualOpen;

  // Use a ref so the animation loop always reads the latest value
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // WebGL and Motion Preference Detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(reducedMotion || mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(reducedMotion || e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reducedMotion]);

  const handleToggle = useCallback(() => {
    const next = !isOpenRef.current;
    setManualOpen(next);
    onToggle?.(next);
  }, [onToggle]);

  // Three.js Scene Setup
  useEffect(() => {
    if (!hasWebGL || prefersReducedMotion || !mountRef.current) return;

    const host = mountRef.current;

    // SCENE — Paper Ivory background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F5F0E6');

    // CAMERA — fixed oblique angle so the book looks like an object on a desk
    const camera = new THREE.PerspectiveCamera(
      30,
      host.clientWidth / Math.max(host.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.4);
    camera.lookAt(0, 0.1, 0);

    // RENDERER — capped pixel ratio for performance
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight, false);
    host.appendChild(renderer.domElement);

    // LIGHTS — warm ambient + key directional
    const hemiLight = new THREE.HemisphereLight('#FFFFFF', '#D8D0C0', 1.7);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#FFF4DD', 2.6);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // BOOK GROUP — all book parts rotate together for pointer tilt
    const bookGroup = new THREE.Group();
    scene.add(bookGroup);

    // Shared materials
    const coverMat = new THREE.MeshStandardMaterial({ color: '#173E7A', roughness: 0.52, metalness: 0.04 });
    const pageMat = new THREE.MeshStandardMaterial({ color: '#F5F0E6', roughness: 0.95, metalness: 0.04 });
    const goldMat = new THREE.MeshStandardMaterial({ color: '#D89A2B', roughness: 0.38, metalness: 0.04 });

    // Left cover — stationary half of the book
    const coverGeom = new THREE.BoxGeometry(1.75, 2.4, 0.08);
    const leftCover = new THREE.Mesh(coverGeom, coverMat);
    leftCover.position.set(-0.89, 0, 0);
    bookGroup.add(leftCover);

    // Right hinge group — pivot sits at the spine so the cover opens like a real book
    const rightHinge = new THREE.Group();
    rightHinge.position.set(0, 0, 0);
    bookGroup.add(rightHinge);

    // Right cover
    const rightCover = new THREE.Mesh(coverGeom, coverMat);
    rightCover.position.set(0.89, 0, 0);
    rightHinge.add(rightCover);

    // Internal pages
    const pagesGeom = new THREE.BoxGeometry(1.66, 2.27, 0.15);
    const rightPages = new THREE.Mesh(pagesGeom, pageMat);
    rightPages.position.set(0.87, 0, 0.11);
    rightHinge.add(rightPages);

    // Abstract compass star — deliberately not a national or government symbol
    const starGeom = new THREE.OctahedronGeometry(0.12, 0);
    const star = new THREE.Mesh(starGeom, goldMat);
    star.position.set(0.92, 0.58, 0.17);
    rightHinge.add(star);

    // INTERACTION STATE (mutable, read by animation loop)
    let pointerX = 0;
    let pointerY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;
    let currentOpenAngle = 0;
    let visible = true;

    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * 0.08;
      pointerY = -((e.clientY - rect.top) / rect.height - 0.5) * 2 * 0.05;
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    host.addEventListener('pointermove', onPointerMove, { passive: true });
    host.addEventListener('pointerleave', onPointerLeave);

    // RESIZE
    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = host.getBoundingClientRect();
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    });
    resizeObserver.observe(host);

    // VISIBILITY — pause rendering when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(host);

    // ANIMATION LOOP
    const timer = new THREE.Timer();

    const animate = () => {
      requestAnimationFrame(animate);
      if (!visible) return;

      timer.update();
      const dt = Math.min(timer.getDelta(), 0.05);

      // Read the LATEST open state from the ref (avoids stale closure)
      const targetAngle = isOpenRef.current ? -Math.PI * 0.92 : 0;
      currentOpenAngle = THREE.MathUtils.damp(currentOpenAngle, targetAngle, 6, dt);
      rightHinge.rotation.y = currentOpenAngle;

      // Pointer tilt
      currentTiltX = THREE.MathUtils.damp(currentTiltX, pointerY, 7, dt);
      currentTiltY = THREE.MathUtils.damp(currentTiltY, pointerX, 7, dt);
      bookGroup.rotation.x = currentTiltX - 0.16;
      bookGroup.rotation.y = currentTiltY - 0.28;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP — dispose everything on unmount
    return () => {
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      coverGeom.dispose();
      pagesGeom.dispose();
      starGeom.dispose();
      coverMat.dispose();
      pageMat.dispose();
      goldMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [hasWebGL, prefersReducedMotion]);

  // FALLBACK — static HTML card when WebGL unavailable or reduced motion preferred
  if (!hasWebGL || prefersReducedMotion) {
    return (
      <section
        className="travel-book-fallback"
        aria-label="Illustrative journey preview"
        style={{
          backgroundColor: 'var(--color-ivory)',
          borderColor: 'var(--color-indigo)',
          color: 'var(--color-graphite)',
        }}
      >
        <p className="eyebrow" style={{ color: 'var(--color-saffron)' }}>
          Illustrative journey preview
        </p>
        <h3
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-indigo)', fontSize: '1.25rem', margin: '0.5rem 0' }}
        >
          {stage === 'confirmed' ? 'Your mock appointment pass' : 'Your application, organised'}
        </h3>
        <p className="text-sm">Fictional reference: {appointment.reference}</p>
        {stage === 'confirmed' && (
          <p className="text-sm" style={{ marginTop: '0.5rem' }}>
            {appointment.date} · {appointment.time} · {appointment.centre}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="travel-book-shell">
      <div
        ref={mountRef}
        className="w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: '4 / 3', backgroundColor: 'var(--color-ivory)' }}
        aria-hidden="true"
      />
      <div className="mt-4 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className="btn btn-secondary"
        >
          {isOpen ? 'Close preview' : 'Preview your journey'}
        </button>
        <p className="travel-book-note" style={{ color: 'var(--color-graphite-light)' }}>
          Illustrative only. This is not an official passport or appointment record.
        </p>
      </div>
    </section>
  );
}

"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Image from "next/image";
import HoverWord from "@/components/HoverWord";

const DiceHomepage = () => {
  const containerRef = useRef(null);
  const router = useRouter();

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [sceneReady, setSceneReady] = useState(false);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const diceGroupsRef = useRef([]);

  // ---- PERF: keep fast-moving values in refs (no re-render on mousemove)
  const hoveredCardIdRef = useRef(null);
  useEffect(() => {
    hoveredCardIdRef.current = hoveredCardId;
  }, [hoveredCardId]);

  const mouseNdcRef = useRef(new THREE.Vector2(0, 0));
  const mousePosRef = useRef({ x: 0, y: 0 }); // px inside container

  const needsPickRef = useRef(false);

  const dragRef = useRef({
    active: false,
    object: null,
    prevMouse: { x: 0, y: 0 },
  });

  // Hover preview DOM element (moved by style, not state)
  const hoverElRef = useRef(null);

  // Hover animation state (stored in ref, applied in animate loop)
  const hoverAnimRef = useRef({
    visible: false,
    currentId: null,
    enterStart: 0,
    exitStart: 0,
    exiting: false,
  });

  // which preview image to show (rarely changes, OK as state)
  const [hoverPreviewSrc, setHoverPreviewSrc] = useState("/about_me.gif");

  const [isDevLabelHover, setIsDevLabelHover] = useState(false);
  const [isArtistLabelHover, setIsArtistLabelHover] = useState(false);

  const cards = useMemo(
    () => [
      { id: "about", title: "About Me", icon: "👤", color: "#f4a261", route: "/about", preview: "/about_me.gif" },
      { id: "code", title: "Code", icon: "</>", color: "#e76f51", route: "/work?filter=code", preview: "/code.png" },
      { id: "art", title: "Art", icon: "✨", color: "#2a9d8f", route: "/work?filter=art", preview: "/art.gif" },
    ],
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const initTimeout = setTimeout(() => {
      initScene();
    }, 50);

    function initScene() {
      if (!containerRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#f2ede7");
      sceneRef.current = scene;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      if (width === 0 || height === 0) {
        setTimeout(initScene, 80);
        return;
      }

      const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
      camera.position.set(0, 2.9, 9.2);
      camera.lookAt(0, 0, 0);
      cameraRef.current = camera;

      // PERF: antialias off (dither style hides it) + capped pixel ratio
      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.shadowMap.enabled = false;

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      scene.add(new THREE.AmbientLight(0xffd4a3, 0.7));
      const directionalLight = new THREE.DirectionalLight(0xd55555, 1.2);
      directionalLight.position.set(5, 8, 5);
      scene.add(directionalLight);

      const accentLight = new THREE.DirectionalLight(0xd55555, 0.5);
      accentLight.position.set(-3, 3, -3);
      scene.add(accentLight);

      const ditherGLSL = `
        float dither4x4(vec2 position, float brightness) {
          float x = mod(position.x, 4.0);
          float y = mod(position.y, 4.0);
          float limit = 0.0;

          if (x < 0.5 && y < 0.5) limit = 0.0625;
          else if (x >= 1.0 && x < 2.0 && y < 0.5) limit = 0.5625;
          else if (x >= 2.0 && x < 3.0 && y < 0.5) limit = 0.1875;
          else if (x >= 3.0 && y < 0.5) limit = 0.6875;
          else if (x < 0.5 && y >= 1.0 && y < 2.0) limit = 0.8125;
          else if (x >= 1.0 && x < 2.0 && y >= 1.0 && y < 2.0) limit = 0.3125;
          else if (x >= 2.0 && x < 3.0 && y >= 1.0 && y < 2.0) limit = 0.9375;
          else if (x >= 3.0 && y >= 1.0 && y < 2.0) limit = 0.4375;
          else if (x < 0.5 && y >= 2.0 && y < 3.0) limit = 0.25;
          else if (x >= 1.0 && x < 2.0 && y >= 2.0 && y < 3.0) limit = 0.75;
          else if (x >= 2.0 && x < 3.0 && y >= 2.0 && y < 3.0) limit = 0.125;
          else if (x >= 3.0 && y >= 2.0 && y < 3.0) limit = 0.625;
          else if (x < 0.5 && y >= 3.0) limit = 1.0;
          else if (x >= 1.0 && x < 2.0 && y >= 3.0) limit = 0.5;
          else if (x >= 2.0 && x < 3.0 && y >= 3.0) limit = 0.875;
          else if (x >= 3.0 && y >= 3.0) limit = 0.375;

          return step(limit, brightness);
        }
      `;

      const diceVertexShader = `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const diceFragmentShader = `
        varying vec3 vNormal;
        ${ditherGLSL}
        void main() {
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float NdotL = dot(normalize(vNormal), lightDir);
          float lighting = NdotL * 0.5 + 0.5;

          vec3 color1 = vec3(0.02, 0.66, 0.58);
          vec3 color2 = vec3(0.39, 0.05, 0.25);
          vec3 color3 = vec3(0.84, 0.33, 0.33);
          vec3 color4 = vec3(0.95, 0.93, 0.91);

          vec3 color;
          if (lighting < 0.25) color = mix(color1, color2, lighting / 0.25);
          else if (lighting < 0.5) color = mix(color2, color3, (lighting - 0.25) / 0.25);
          else color = mix(color3, color4, (lighting - 0.5) / 0.5);

          float brightness = dot(color, vec3(0.3333));
          float dither = dither4x4(gl_FragCoord.xy * 0.5, brightness);
          float quantized = floor(brightness * 3.0 + dither) / 3.0;

          vec3 finalColor;
          if (quantized < 0.33) finalColor = color1;
          else if (quantized < 0.66) finalColor = color2;
          else if (quantized < 0.85) finalColor = color3;
          else finalColor = color4;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const makeDiceMaterial = () =>
        new THREE.ShaderMaterial({
          vertexShader: diceVertexShader,
          fragmentShader: diceFragmentShader,
        });

      const makeDitheredTextureMaterial = (texture) => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        texture.needsUpdate = true;

        return new THREE.ShaderMaterial({
          transparent: true,
          uniforms: { uMap: { value: texture } },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uMap;
            varying vec2 vUv;
            ${ditherGLSL}
            void main() {
              vec4 tex = texture2D(uMap, vUv);
              if (tex.a < 0.05) discard;

              float brightness = dot(tex.rgb, vec3(0.3333));
              float d = dither4x4(gl_FragCoord.xy * 0.5, brightness);

              float levels = 4.0;
              float q = floor(brightness * (levels - 1.0) + d) / (levels - 1.0);
              gl_FragColor = vec4(vec3(q), 1.0);
            }
          `,
        });
      };

      function createRoundedBoxGeometry(width, height, depth, radius, smoothness) {
        const shape = new THREE.Shape();
        const eps = 0.00001;

        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
        shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: depth - radius * 2,
          bevelEnabled: true,
          bevelSegments: smoothness,
          steps: 1,
          bevelSize: radius,
          bevelThickness: radius,
          curveSegments: smoothness,
        });

        geometry.center();
        return geometry;
      }

      function drawDiceDots(ctx, number, color) {
        const dotRadius = 32;
        const positions = {
          1: [[128, 128]],
          2: [
            [70, 70],
            [186, 186],
          ],
          3: [
            [70, 70],
            [128, 128],
            [186, 186],
          ],
          4: [
            [70, 70],
            [186, 70],
            [70, 186],
            [186, 186],
          ],
          5: [
            [70, 70],
            [186, 70],
            [128, 128],
            [70, 186],
            [186, 186],
          ],
          6: [
            [70, 70],
            [186, 70],
            [70, 128],
            [186, 128],
            [70, 186],
            [186, 186],
          ],
        };

        ctx.fillStyle = color;
        (positions[number] || []).forEach(([x, y]) => {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      function addDiceDots(diceMesh) {
        const allFaces = [
          { number: 1, face: "front", color: "#d55555" },
          { number: 6, face: "back", color: "#2d2d2d" },
          { number: 3, face: "left", color: "#d55555" },
          { number: 4, face: "right", color: "#2d2d2d" },
          { number: 2, face: "top", color: "#d55555" },
          { number: 5, face: "bottom", color: "#2d2d2d" },
        ];

        allFaces.forEach((faceConfig) => {
          const canvas = document.createElement("canvas");
          canvas.width = 256;
          canvas.height = 256;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.clearRect(0, 0, 256, 256);
          drawDiceDots(ctx, faceConfig.number, faceConfig.color);

          const texture = new THREE.CanvasTexture(canvas);
          const faceGeometry = new THREE.PlaneGeometry(1.3, 1.3);
          const faceMaterial = makeDitheredTextureMaterial(texture);
          const faceMesh = new THREE.Mesh(faceGeometry, faceMaterial);

          if (faceConfig.face === "front") faceMesh.position.z = 1.26;
          else if (faceConfig.face === "back") {
            faceMesh.position.z = -1.26;
            faceMesh.rotation.y = Math.PI;
          } else if (faceConfig.face === "left") {
            faceMesh.position.x = -1.26;
            faceMesh.rotation.y = -Math.PI / 2;
          } else if (faceConfig.face === "right") {
            faceMesh.position.x = 1.26;
            faceMesh.rotation.y = Math.PI / 2;
          } else if (faceConfig.face === "top") {
            faceMesh.position.y = 1.26;
            faceMesh.rotation.x = -Math.PI / 2;
          } else if (faceConfig.face === "bottom") {
            faceMesh.position.y = -1.26;
            faceMesh.rotation.x = Math.PI / 2;
          }

          diceMesh.add(faceMesh);
        });
      }

      diceGroupsRef.current = [];
      const BASE_DICE_SCALE = 0.05;

      const d6Group = new THREE.Group();
      const d6Geo = createRoundedBoxGeometry(2.5, 2.5, 2.5, 0.15, 6);
      const d6Mat = makeDiceMaterial();
      const d6 = new THREE.Mesh(d6Geo, d6Mat);
      addDiceDots(d6);
      d6Group.add(d6);
      d6Group.position.set(2.15, -0.75, -0.2);
      d6Group.rotation.set(-0.35, 0.55, 0.0);
      d6Group.scale.setScalar(0.02);
      d6Group.userData = { cardId: "code", baseRot: d6Group.rotation.clone() };
      scene.add(d6Group);
      diceGroupsRef.current.push(d6Group);

      const d20Group = new THREE.Group();
      const d20Geo = new THREE.IcosahedronGeometry(1.35);
      const d20Mat = makeDiceMaterial();
      const d20 = new THREE.Mesh(d20Geo, d20Mat);
      d20Group.add(d20);
      d20Group.position.set(-2.15, -0.9, -0.15);
      d20Group.rotation.set(0.15, 0.35, 0.0);
      d20Group.scale.setScalar(BASE_DICE_SCALE);
      d20Group.userData = { cardId: "art", baseRot: d20Group.rotation.clone() };
      scene.add(d20Group);
      diceGroupsRef.current.push(d20Group);

      const d4Group = new THREE.Group();
      const d4Geo = new THREE.TetrahedronGeometry(1.05);
      const d4Mat = makeDiceMaterial();
      const d4 = new THREE.Mesh(d4Geo, d4Mat);
      d4Group.add(d4);
      d4Group.position.set(-0.5, 1.15, 0.5);
      d4Group.rotation.set(2.25, -2.0, 2.25);
      d4Group.scale.setScalar(BASE_DICE_SCALE);
      d4Group.userData = { cardId: "about", baseRot: d4Group.rotation.clone() };
      scene.add(d4Group);
      diceGroupsRef.current.push(d4Group);

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const setMouseFromEvent = (event) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const xPx = event.clientX - rect.left;
        const yPx = event.clientY - rect.top;

        mousePosRef.current.x = xPx;
        mousePosRef.current.y = yPx;

        mouse.x = (xPx / rect.width) * 2 - 1;
        mouse.y = -(yPx / rect.height) * 2 + 1;

        mouseNdcRef.current.set(mouse.x, mouse.y);
        raycaster.setFromCamera(mouse, camera);
      };

      const pickDiceGroup = () => {
        const hits = raycaster.intersectObjects(diceGroupsRef.current, true);
        if (!hits.length) return null;

        let obj = hits[0].object;
        while (obj && !obj.userData?.cardId && obj.parent) obj = obj.parent;
        return obj?.userData?.cardId ? obj : null;
      };

      const onMouseMove = (event) => {
        setMouseFromEvent(event);

        if (dragRef.current.active && dragRef.current.object) {
          const dx = event.clientX - dragRef.current.prevMouse.x;
          const dy = event.clientY - dragRef.current.prevMouse.y;

          dragRef.current.object.rotation.y += dx * 0.01;
          dragRef.current.object.rotation.x += dy * 0.01;
          dragRef.current.object.userData.baseRot = dragRef.current.object.rotation.clone();
          dragRef.current.prevMouse = { x: event.clientX, y: event.clientY };
          return;
        }

        needsPickRef.current = true;
      };

      const onMouseDown = (event) => {
        setMouseFromEvent(event);
        const g = pickDiceGroup();
        if (!g) return;

        dragRef.current.active = true;
        dragRef.current.object = g;
        dragRef.current.prevMouse = { x: event.clientX, y: event.clientY };
        event.preventDefault();
      };

      const onMouseUp = () => {
        dragRef.current.active = false;
        dragRef.current.object = null;
      };

      const onClick = () => {
        if (dragRef.current.active) return;
        if (!hoveredCardIdRef.current) return;

        const card = cards.find((c) => c.id === hoveredCardIdRef.current);
        if (card) router.push(card.route);
      };

      const onContextMenu = (e) => e.preventDefault();

      const container = containerRef.current;
      if (container) {
        container.addEventListener("mousemove", onMouseMove);
        container.addEventListener("mousedown", onMouseDown);
        container.addEventListener("click", onClick);
        container.addEventListener("contextmenu", onContextMenu);
      }
      window.addEventListener("mouseup", onMouseUp);

      const clamp01 = (v) => Math.max(0, Math.min(1, v));
      const easeOutBack = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      };
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

      const ENTER_MS = 220;
      const EXIT_MS = 140;

      let animationId;
      let isAnimating = true;

      const HOVER_SCALE = 1.05;
      const ROT_FOLLOW_STRENGTH_X = 0.35;
      const ROT_FOLLOW_STRENGTH_Y = 0.55;
      const ROT_LERP = 0.12;

      const animate = () => {
        if (!isAnimating) return;
        animationId = requestAnimationFrame(animate);

        const now = performance.now();

        if (needsPickRef.current && !dragRef.current.active) {
          needsPickRef.current = false;

          const g = pickDiceGroup();
          const nextId = g ? g.userData.cardId : null;

          if (nextId !== hoveredCardIdRef.current) {
            const anim = hoverAnimRef.current;

            if (nextId) {
              anim.visible = true;
              anim.currentId = nextId;
              anim.enterStart = now;
              anim.exiting = false;

              // update preview src (only on hover change)
              const nextCard = cards.find((c) => c.id === nextId);
              setHoverPreviewSrc(nextCard?.preview || "/about_me.gif");
            } else if (anim.visible) {
              anim.exitStart = now;
              anim.exiting = true;
            }

            setHoveredCardId(nextId);
          }
        }

        const hoveredId = hoveredCardIdRef.current;
        const mouseNdc = mouseNdcRef.current;

        for (const g of diceGroupsRef.current) {
          const isHover = hoveredId && g.userData.cardId === hoveredId && !dragRef.current.active;

          const targetScale = isHover ? HOVER_SCALE : 1.0;
          g.scale.x += (targetScale - g.scale.x) * 0.12;
          g.scale.y += (targetScale - g.scale.y) * 0.12;
          g.scale.z += (targetScale - g.scale.z) * 0.12;

          const base = g.userData.baseRot || new THREE.Euler();
          const targetRotX = base.x + -mouseNdc.y * ROT_FOLLOW_STRENGTH_X;
          const targetRotY = base.y + mouseNdc.x * ROT_FOLLOW_STRENGTH_Y;

          if (isHover) {
            g.rotation.x += (targetRotX - g.rotation.x) * ROT_LERP;
            g.rotation.y += (targetRotY - g.rotation.y) * ROT_LERP;
          } else {
            g.rotation.x += (base.x - g.rotation.x) * ROT_LERP;
            g.rotation.y += (base.y - g.rotation.y) * ROT_LERP;
            g.rotation.z += (base.z - g.rotation.z) * ROT_LERP;
          }
        }

        const hoverEl = hoverElRef.current;
        if (hoverEl) {
          const anim = hoverAnimRef.current;

          let show = anim.visible;
          let opacity = 0;
          let scale = 1;

          if (show && !anim.exiting) {
            const t = clamp01((now - anim.enterStart) / ENTER_MS);
            opacity = t;
            scale = easeOutBack(t);
          } else if (show && anim.exiting) {
            const t = clamp01((now - anim.exitStart) / EXIT_MS);
            opacity = 1 - easeInOutQuad(t);
            scale = 1;
            if (t >= 1) {
              anim.visible = false;
              anim.exiting = false;
              anim.currentId = null;
              show = false;
            }
          }

          const wobble = Math.sin(now / 170) * 0.8;
          const tilt = Math.sin(now / 260) * 0.5;

          const { x, y } = mousePosRef.current;
          hoverEl.style.left = `${x}px`;
          hoverEl.style.top = `${y}px`;

          hoverEl.style.opacity = `${opacity}`;
          hoverEl.style.transform = `translate(-50%, -210px) scale(${scale}) rotate(${wobble}deg) rotateX(${tilt}deg)`;
          hoverEl.style.display = show ? "block" : "none";
        }

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current || !camera || !renderer) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      setSceneReady(true);

      return () => {
        isAnimating = false;
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mouseup", onMouseUp);

        if (container) {
          container.removeEventListener("mousemove", onMouseMove);
          container.removeEventListener("mousedown", onMouseDown);
          container.removeEventListener("click", onClick);
          container.removeEventListener("contextmenu", onContextMenu);
        }

        if (animationId) cancelAnimationFrame(animationId);

        d6Geo?.dispose();
        d20Geo?.dispose();
        d4Geo?.dispose();
        d6Mat?.dispose();
        d20Mat?.dispose();
        d4Mat?.dispose();

        renderer?.dispose();
        if (containerRef.current && renderer?.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch (e) {}
        }

        sceneRef.current = null;
        cameraRef.current = null;
        rendererRef.current = null;
        diceGroupsRef.current = [];
      };
    }

    const cleanup = initScene();

    return () => {
      clearTimeout(initTimeout);
      if (cleanup) cleanup();
    };
  }, [cards, router]);

  const hoveredCard = hoveredCardId ? cards.find((c) => c.id === hoveredCardId) : null;

  return (
    <div
      style={{
        backgroundColor: "#f2ede7",
        minHeight: "100vh",
        position: "relative",
        zIndex: 0,
      }}
    >
      <Navbar />

      {/* Labels */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          fontSize: "72px",
          fontWeight: "normal",
          color: "#2d2d2d",
          fontFamily: "'Maragsa', serif",
          zIndex: 50,
          pointerEvents: "auto",
        }}
      >
        <HoverWord
          text="Developer"
          onHoverChange={setIsDevLabelHover}
          bubbleSide="right"
          bubbleItems={["machine learning", "tool development", "computer graphics", "XR/VR", "creative coding", "systems"]}
          style={{
            fontSize: "72px",
            fontWeight: "normal",
            color: "#2d2d2d",
            fontFamily: "'Maragsa', serif",
          }}
        />

        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            transform: "translateY(20px) translateX(-30px)",
          }}
        >
          <Image
            src="/pix_cursor.png"
            alt=""
            width={90}
            height={90}
            priority
            style={{
              imageRendering: "pixelated",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </span>
      </div>

      {/* Artist label */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          display: "flex",
          alignItems: "baseline",
          gap: "12px",
          fontSize: "72px",
          fontWeight: "normal",
          color: "#2d2d2d",
          fontFamily: "Maragsa, serif",
          zIndex: 50,
          pointerEvents: "auto",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            transform: "translateY(20px) translateX(15px)",
          }}
        >
          <Image
            src="/pix_star.png"
            alt=""
            width={90}
            height={90}
            priority
            style={{
              imageRendering: "pixelated",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </span>

        <HoverWord
          text="Artist"
          onHoverChange={setIsArtistLabelHover}
          bubbleSide="left"
          bubbleItems={["UI/UX", "book design", "product design", "printed ephemera", "risograph", "web art"]}
          style={{
            fontSize: "72px",
            fontWeight: "normal",
            color: "#2d2d2d",
            fontFamily: "Maragsa, serif",
          }}
        />
      </div>

      {/* 3D Scene */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "75vh",
          cursor: hoveredCardId ? "grab" : "default",
          position: "relative",
          zIndex: 0,
          opacity: sceneReady ? 1 : 0,
          transition: "opacity 0.25s ease-in",
        }}
      />

      {/* Hover preview (always mounted; moved/animated via DOM styles for performance) */}
      <div
        ref={hoverElRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 320,
          zIndex: 999,
          pointerEvents: "none",
          display: "none",
          opacity: 0,
          transform: "translate(-50%, -210px) scale(0.98)",
          transformOrigin: "50% 90%",
          willChange: "transform,left,top,opacity",
          filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.18))",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            background: "rgba(255,255,255,0.0)",
          }}
        >
          <Image
            src={hoverPreviewSrc}
            alt={hoveredCard ? hoveredCard.title : "Hover preview"}
            width={120}
            height={120}
            // GIFs: keep unoptimized; PNG can be optimized but leaving unoptimized is fine for hover previews
            unoptimized
            priority
            style={{
              width: "80%",
              height: "auto",
              display: "block",
              userSelect: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DiceHomepage;

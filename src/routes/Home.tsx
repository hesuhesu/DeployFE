/*
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fadeIn } from "../components/Animation.tsx";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface StarData {
  originalPosition: THREE.Vector3;
  mesh: THREE.Mesh;
  intensity: number; // Light intensity for random changes
}

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starGroupRef = useRef<StarData[] | null>(null);
  const mouse = useRef(new THREE.Vector2());
  const [hoveredPlanetName, setHoveredPlanetName] = useState<string | null>(null);
  const hoveredPlanetRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    scene.background = new THREE.Color(0x000000);

    // Add orbit controls with inertia
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;  // Enable inertia
    controls.dampingFactor = 0.05;  // Smooth deceleration
    controls.enableZoom = true;
    controls.minDistance = 2; // Minimum zoom distance
    controls.maxDistance = 20; // Maximum zoom distance
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create stars with original positions
    const stars: StarData[] = [];
    const starGroup = new THREE.Group();

    // Generate 1000 stars
    for (let i = 0; i < 1000; i++) {
      const geometry = new THREE.SphereGeometry(0.03, 6, 6);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const randomPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      );

      star.position.copy(randomPosition);

      stars.push({
        originalPosition: randomPosition,
        mesh: star,
        intensity: 1,
      });

      starGroup.add(star);
    }
    starGroupRef.current = stars;
    scene.add(starGroup);

    const planets: { mesh: THREE.Mesh; name: string; color: string }[] = [];
    const planetColors = [0xff6347, 0x4682b4, 0x32cd32];
    const planetNames = ["About", "Project", "Diary"];
    const planetPositions = [
      { x: -4, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 4, y: 0, z: 0 },
    ];

    planetPositions.forEach((pos, idx) => {
      const geometry = new THREE.SphereGeometry(0.7, 64, 64);
      const material = new THREE.MeshStandardMaterial({
        color: planetColors[idx],
        emissive: 0x111111,
        roughness: 0.5,
        metalness: 0.8,
      });
      const planet = new THREE.Mesh(geometry, material);

      planet.position.set(pos.x, pos.y, pos.z);
      scene.add(planet);
      planets.push({ mesh: planet, name: planetNames[idx], color: `#${planetColors[idx].toString(16)}` });
    });

    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (event: MouseEvent): void => {
      if (!renderer || !camera) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse.current, camera);
      const intersects = raycaster.intersectObjects(planets.map((p) => p.mesh));

      if (intersects.length > 0) {
        const hoveredPlanet = intersects[0].object as THREE.Mesh;
        const hoveredPlanetData = planets.find((p) => p.mesh === hoveredPlanet);

        if (hoveredPlanetRef.current !== hoveredPlanet) {
          hoveredPlanetRef.current = hoveredPlanet;
          setHoveredPlanetName(hoveredPlanetData?.name || null);
        }
      } else {
        hoveredPlanetRef.current = null;
        setHoveredPlanetName(null);
      }
    };

    const handleClick = (): void => {
        if (!renderer || !camera) return;
      
        raycaster.setFromCamera(mouse.current, camera);
        const intersects = raycaster.intersectObjects(planets.map((p) => p.mesh));
      
        if (intersects.length > 0) {
          const clickedPlanet = intersects[0].object;
          const planetData = planets.find((p) => p.mesh === clickedPlanet);
      
          if (planetData) {
            // 클릭한 행성의 위치
            const planetPosition = planetData.mesh.position;
      
            // 카메라의 초기 위치
            const initialCameraPosition = camera.position.clone();
      
            // 카메라 이동 애니메이션의 지속 시간
            const moveDuration = 500;
      
            let startTime: number;
      
            const moveCamera = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
      
              const elapsedTime = timestamp - startTime;
              const progress = Math.min(elapsedTime / moveDuration, 1);
      
              // 카메라의 위치를 선형 보간하여 이동
              camera.position.lerpVectors(initialCameraPosition, planetPosition, progress);
      
              if (progress < 1) {
                requestAnimationFrame(moveCamera);
              } else {
                // 카메라 이동이 끝난 후 해당 페이지로 네비게이션
                setTimeout(() => {
                  const index = planets.findIndex((p) => p.mesh === clickedPlanet);
                  if (index === 0) navigate("/about");
                  else if (index === 1) navigate("/project");
                  else if (index === 2) navigate("/diary");
                }, 100);
              }
            };
      
            requestAnimationFrame(moveCamera);
          }
        }
      };
      
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("click", handleClick);

    const animate = (): void => {
      requestAnimationFrame(animate);

      const targetPosition = hoveredPlanetRef.current
        ? hoveredPlanetRef.current.position
        : null;

      starGroupRef.current?.forEach((starData) => {
        if (targetPosition) {
          const direction = new THREE.Vector3()
            .subVectors(targetPosition, starData.mesh.position)
            .normalize();
          starData.mesh.position.add(direction.multiplyScalar(0.1)); // Move towards planet
        } else {
          starData.mesh.position.lerp(starData.originalPosition, 0.01); // Return to original position
        }
      });

      planets.forEach((planet) => {
        planet.mesh.rotation.y += 0.01;
        planet.mesh.rotation.x += 0.005;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("click", handleClick);
      planets.forEach((planet) => {
        scene.remove(planet.mesh);
        planet.mesh.geometry.dispose();
        planet.mesh.material.dispose();
      });
      if (starGroupRef.current) {
        starGroupRef.current.forEach((starData) => {
          starData.mesh.geometry.dispose();
          starData.mesh.material.dispose();
        });
      }
      renderer.dispose();
    };
  }, []); // navigate

  return (
    <HomeContainer>
      <CanvasContainer ref={canvasRef} />
      {hoveredPlanetName && (
        <PlanetContainer>
          {hoveredPlanetName}
        </PlanetContainer>
      )}
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  position: relative; 
  width: 100%;
  height: 100vh;
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PlanetContainer = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 4rem;
  font-family: "Arial, sans-serif";
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8);
  pointer-events: none; // Avoid interfering with interactions
  animation: ${fadeIn} 1s ease forwards;
`;

*/
import React from 'react';
import styled from 'styled-components';
import { focusInContract, fadeIn } from '../components/Animation.tsx';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <FirstHome>
                <h2>Future Possibility</h2>
                <strong>성장, 노력, 끈기</strong>
                <p>Frontend 개발자 은희수입니다!</p>
            </FirstHome>
            <SecondHome>
                <p>제 2 화면입니다.</p>
            </SecondHome>
            <ThirdHome>
                <p>제 3 화면입니다.</p>
            </ThirdHome>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #282c34;
    height: 300vh;
    background-color : rgba(214, 230, 245, 0.925);
`;

const FirstHome = styled.div`
    height: 100vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        font-size:60px;
        animation: ${focusInContract} 1s ease forwards;
    }
    strong {
        animation: ${fadeIn} 2s ease forwards;
    }
    p {
        font-size:30px;
        animation: ${fadeIn} 3s ease forwards;
    }

    @media (max-width: 768px) {
        h2 {
            font-size:48px;
        }
        p {
            font-size:24px;
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size:32px;
        }
        p {
            font-size:16px;
        }
    }
`;

const SecondHome = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p{
        font-size:30px;
    }

    @media (max-width: 768px) {
        p {
            font-size:24px;
        }
    }

    @media (max-width: 480px) {
        p {
            font-size:18px;
        }
    }
`;

const ThirdHome = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p{
        font-size:30px;
    }

    @media (max-width: 768px) {
        p {
            font-size:24px;
        }
    }

    @media (max-width: 480px) {
        p {
            font-size:18px;
        }
    }
`;

export default Home
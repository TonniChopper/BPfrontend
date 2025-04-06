import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// eslint-disable-next-line react/prop-types
const SimulationViewer = ({ modelUrl }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !modelUrl) return;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
        );
        containerRef.current.appendChild(renderer.domElement);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Add camera controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        // Load 3D model
        const loader = new GLTFLoader();
        loader.load(
            modelUrl,
            (gltf) => {
                scene.add(gltf.scene);

                // Center and scale model
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

                camera.position.z = cameraZ * 1.5;

                const minZ = box.min.z;
                const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

                camera.far = cameraToFarEdge * 3;
                camera.updateProjectionMatrix();

                // Center model
                gltf.scene.position.x = -center.x;
                gltf.scene.position.y = -center.y;
                gltf.scene.position.z = -center.z;

                controls.update();
            },
            undefined,
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current) return;

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, [modelUrl]);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
        />
    );
};

export default SimulationViewer;
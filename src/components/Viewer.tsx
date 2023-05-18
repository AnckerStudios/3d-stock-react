import { useEffect, useRef } from "react";
import * as THREE from "three";

const Viewer = () => {
    const threeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Если объект класса "Three" ещё не создан, то попадаем внутрь
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
      
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        threeRef.current?.appendChild(renderer.domElement);
      
        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
      
        camera.position.z = 5;
        threeRef.current
      }, []);
    return ( 
        <>
            <div className=" h-[500px] w-[600px] bg-slate-300" ref={threeRef} />
        </>          
     );
}
 
export default Viewer;
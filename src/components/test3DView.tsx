import { useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CameraControls, Wireframe, useFBX, useGLTF, useProgress } from '@react-three/drei'

interface Test3DViewProps {
    url: string
}

function Test3DView({url} : Test3DViewProps) {
    const { progress } = useProgress();
    
    // const gltf = useLoader(GLTFLoader,url)
    const gltf = useLoader(GLTFLoader,"http://localhost:8080/api/model/model")
    // const fbx = useFBX("http://localhost:8080/api/model/model")
    // const gltfLoader = new GLTFLoader();
    useEffect(() => {
        console.log("gltf",gltf);
        
        
    }, [gltf])
    
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <group>
                <mesh >
                    {/* <boxGeometry/> */}
                    <primitive object={gltf.scene} /> 
                    {/* gltf.scene */}
                    {/* <Wireframe /> */}
                </mesh>
                
            </group>
            <CameraControls />
        </>
    )
}

export default Test3DView

import { useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { CameraControls, Environment, Wireframe, useFBX, useGLTF, useProgress } from '@react-three/drei'
import { TextureLoader, sRGBEncoding } from 'three'
import { PresetsType, presetsObj } from '@react-three/drei/helpers/environment-assets'

interface Test3DViewProps {
    url: string
}

function Test3DView({url} : Test3DViewProps) {
    const { progress } = useProgress();
    const { scene } = useThree();
    // const texture = useLoader(TextureLoader, "/noimg.png");
    // texture.encoding = sRGBEncoding;
    // scene.background = texture;
    // const gltf = useLoader(GLTFLoader,url)
    
    let gltf: GLTF | null = null;
    try{
        console.log("dd");
        
        gltf = useLoader(GLTFLoader,`http://localhost:8080/api/model/file/${url}`);
    }catch{
        console.log("чтото не так");
        
    }
  
    // useEffect(() => {
    //     console.log("gltf",gltf);
    //     try{
    //         gltf = useLoader(GLTFLoader,`http://localhost:8080/api/model/file/${url}`)
    //     }catch{`/testModel/1/scene.gltf`
    //         console.log("чтото не так");
            
    //     }
        
    // }, [])
    // const fbx = useFBX("http://localhost:8080/api/model/model")
    // const gltfLoader = new GLTFLoader();
    useEffect(() => {
        console.log("gltf",gltf);
        
        
    }, [gltf])
    
    return (
        <>
        {gltf && <>
        
            {/* <ambientLight /> */}
            <Environment preset={"dawn"} />
            {/* <pointLight position={[10, 10, 10]} /> */}
            <group>
                <mesh >
                    <primitive object={gltf.scene} /> 
                </mesh>
                
            </group>
            <CameraControls />
        </>}
        </>
    )
}

export default Test3DView

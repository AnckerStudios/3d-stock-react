import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const LoadingScreen2 = () => {
    const progress = useProgress();

    useEffect(() => {
        
        
    }, [progress])
    
    return (
        <Html center>
            gggg {progress.progress}
        </Html>
    );
}
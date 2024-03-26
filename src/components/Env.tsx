// @ts-nocheck

import { useState, useTransition, useRef } from "react"
import { Environment } from "@react-three/drei"
import { useControls } from "leva"
import { useThree, useFrame } from "@react-three/fiber"
import { PMREMGenerator } from "three"

export const CustomEnv = () => {
	const [preset, setPreset] = useState("sunset")
	const [inTransition, startTransition] = useTransition()
	//const { blur } = useControls(
	//	"Environment",
	//	{
	//		blur: { value: 0.65, min: 0, max: 1 },
	//		preset: {
	//			value: preset,
	//			options: ["sunset", "dawn", "night", "warehouse", "forest", "apartment", "studio", "city", "park", "lobby"],
	//			onChange: (value) => startTransition(() => setPreset(value)),
	//		},
	//	},
	//	{ order: 4 },
	//)
	return <Environment preset={preset} background blur={0.65} />	
}

const CusEnvironment = () => {
  const { gl, scene } = useThree();
	const pmremGenerator = useRef(null);

  // Generate the pre-filtered environment map on mount
  useFrame(() => {
    if (!pmremGenerator.current) {
      pmremGenerator.current = new PMREMGenerator(gl);
      pmremGenerator.current.compileEquirectangularShader();
      const envMap = pmremGenerator.current.fromScene(scene);
      scene.environment = envMap.texture;
    }
  });

  // Clean up on unmount
  return () => {
    if (pmremGenerator.current) {
      pmremGenerator.current.dispose();
      pmremGenerator.current = null;
    }
  };
};

export default CusEnvironment;
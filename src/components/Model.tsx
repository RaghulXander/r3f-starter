// @ts-nocheck

import React, { startTransition, useCallback, useEffect, useState, useRef } from "react"
import { useGLTF, useProgress, useAnimations } from "@react-three/drei"
import { dispose, useFrame, useThree } from "@react-three/fiber"
import { useControls } from "leva"
import * as THREE from "three"
//import { GenericAnimationController } from "../Dom/AnimationController/AnimationController"
import { Loader, ProgressBar } from "./Loader"
import TailwindAnimationControls from "./AnimationControls"
//import { useAnimate, useAnimations, useAnimationsWithCleanup } from "@src/hooks/useAnimationWithCleanup"
import { r3f } from "@src/lib/tunnel"
import { useAnimationContext } from "@src/context/AnimationContext"
//import { useAnimationsWithCleanup } from "../../hooks/useAnimationwithCleanup"

export const Model = React.memo(({ modelRef, setModelLoaded }: { modelRef: any; setModelLoaded: (data: any) => void }) => {
	const {In} = r3f
	const [model, setModel] = useState("heart-v1.glb")
	const [loading, setLoading] = useState(false) // Track loading state
	const { animations, selectedAnimation, setSelectedAnimation } = useAnimationContext();
	const groupRef = useRef(null);
	const { camera } = useThree()
	const [animationSpeed, setAnimationSpeed] = useState<number>(1);
	const gltf = useGLTF(`https://dbrhuu5ekb5pj.cloudfront.net/${model}`)
	//const { ref, mixer, names, actions, clips, seek } = useAnimations(gltf?.animations ?? {})
	 const controls = useAnimations(gltf?.animations ?? {});
  console.log("🚀 ~ Model ~ controls:", controls)
  //const [mixer] = useState(() => new THREE.AnimationMixer(gltf.scene));
	console.log("🚀 ~ Model ~ gltf:", gltf)

	const handleChange = useCallback((value) => {
		setLoading(true) // Set loading to true when changing models
		startTransition(() => {
			setModel(value)
		})
	}, [])

	useFrame(() => {
    controls.seek(animationSpeed);
  });

	useControls(
		"Models",
		{
			glbFiles: {
				options: {
					Heart: "heart-v1.glb",
					Skeleton: "skeleton-v1.glb",
					Ocean: "ocean-v1.glb",
					Tokyo: "LittlestTokyo.glb",
					Tectonic: "movingtectonicplates-v1.glb",
				},
				value: "heart-v1.glb",
				onChange: handleChange,
			},
		},
		{ collapsed: false, order: 1 },
	)

	useEffect(() => {
		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})

		modelRef.current = gltf.scene

		return () => {
			gltf.scene.traverse((child) => {
				if (child.isMesh) {
					child.material.dispose()
				}
			})

			dispose(gltf.scene)
			useGLTF.clear(`https://dbrhuu5ekb5pj.cloudfront.net/${model}`)
		}
	}, [gltf, model, modelRef])

	useEffect(() => {
		modelRef.current = gltf.scene
		setModelLoaded(gltf.scene)
		gltf.scene.scale.set(27, 27, 27)
		setLoading(false) // Set loading to false when model is loaded
	}, [gltf, modelRef, setModelLoaded])

	useFrame(() => {
		camera.lookAt(modelRef.current.position)
	})

	//const { actions, ref,mixer } = useAnimationsWithCleanup(loading ? [] : gltf.animations)
	//console.log("🚀 ~ Model ~ actions:", actions, mixer)
	//console.log("🚀 ~ Model ~ actions:", actions)
//const [mixer, actions] = useAnimations(gltf.animations, model);
//  console.log("🚀 ~ Model ~ actions:", actions)
//	const playAction = (clipName) => {
//		 const action = actions[clipName];
//  if (action) {
//    console.log('Playing animation:', clipName);
//    console.log('AnimationAction:', action);
//    console.log('Is playing:', action.isRunning());
//    action.play();
//  } else {
//    console.log('Animation not found:', clipName);
//  }
	//};


  //useEffect(() => {
  //  const animation = animations.find((anim) => anim.name === selectedAnimation);
  //  console.log("🚀 ~ useEffect ~ animation:", animation, selectedAnimation)
  //  if (animation) {
  //    const action = mixer.clipAction(animation.clip, gltf.scene);
  //    action.play();
  //  }
  //  return () => {
  //    mixer.stopAllAction();
  //  };
	//}, [selectedAnimation, animations, mixer]);
	console.log("🚀 ~ Model ~ animations:", animations, controls.actions, controls.clips)
	return (
		<>
			{loading && <Loader />}
			{!loading && (
				<>
					{/*<GenericAnimationController actions={actions} />*/}
					{<In><TailwindAnimationControls animationSpeed={animationSpeed} setAnimationSpeed={setAnimationSpeed} mixer={controls.mixer} animations={gltf.animations.reduce((acc, clip) => {
  acc[clip.name] = clip;
  return acc;
}, {})} playAction={(name)=>controls.actions?.[name]?.play()} /></In>}

					<primitive object={gltf.scene} ref={controls.ref} />
				</>
			)}
		</>
	)
})

Model.displayName = "Model"

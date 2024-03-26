import React, { StrictMode, useRef, useState, Suspense, useMemo, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AnimationMixer, LoopRepeat } from 'three'
import { Stats, OrbitControls, useGLTF } from '@react-three/drei'
import TailwindAnimationControls from './AnimationControls'
import { r3f } from "@src/lib/tunnel"
const { In } = r3f

//export function ModelAnimation({ url = `https://dbrhuu5ekb5pj.cloudfront.net/heart-v1.glb`, modelRef, setModelLoaded }) {

//    const { nodes, materials, animations, scene } = useGLTF(url)
//    const actions = useMemo(() => ({}), [])
//    const mixer = useMemo(() => new AnimationMixer(scene), [])
//	const [action, setAction] = useState()
//	const [animationSpeed, setAnimationSpeed] = useState<number>(1);
//    const [loading, setLoading] = useState(false)
//    let [wait, setWait] = useState(false)
//	let actionAssigned
//	const { camera } = useThree()

//    useEffect(() => {
//        animations.forEach((animation, index) => {
//					actions[index] = mixer.clipAction(animation, modelRef.current)
//        })
//				console.log("🚀 ~ animations.forEach ~ animations:", animations)
//		}, [])
	
//		useEffect(() => {
//		modelRef.current = scene
//			setModelLoaded(scene)
//			scene.scale.set(27, 27, 27)
//			setLoading(false) // Set loading to false when model is loaded
//		}, [scene, modelRef, setModelLoaded])

//		useFrame(() => {
//			camera.lookAt(modelRef.current.position)
//		})

//    useEffect(() => {
//        action?.reset().fadeIn(0.1).play()
//        return () => {
//            action?.fadeOut(0.1)
//        }
//    }, [action])

//    //useEffect(() => {
//    //    const handleKeyDown = (event) => {
//    //        if (!wait) {
//    //            actionAssigned = false

//    //            if (event.code === 'KeyW') {
//    //                setAction(actions[1]) // Use the second animation for walk
//    //                actionAssigned = true
//    //            }

//    //            if (event.code === 'KeyW' && event.shiftKey) {
//    //                setAction(actions[2]) // Use the third animation for running
//    //                actionAssigned = true
//    //            }

//    //            if (event.code === 'Space') {
//    //                setAction(actions[4]) // Use the fifth animation for jump
//    //                actionAssigned = true
//    //                setWait(true) // wait for jump to finish
//    //                setTimeout(() => setWait(false), 1000)
//    //            }

//    //            if (event.code === 'KeyQ') {
//    //                setAction(actions[3]) // Use the fourth animation for pose
//    //                actionAssigned = true
//    //            }

//    //            !actionAssigned && setAction(actions[0]) // Use the first animation for idle
//    //        }
//    //    }

//    //    document.addEventListener('keydown', handleKeyDown)
//    //    return () => {
//    //        document.removeEventListener('keydown', handleKeyDown)
//    //    }
//    //}, [wait, action])

//	return (
//			<>
//			<In>
//				<TailwindAnimationControls 
//					animationSpeed={animationSpeed} 
//					setAnimationSpeed={setAnimationSpeed}
//					mixer={mixer} 
//					animations={animations.reduce((acc, clip) => {
//						acc[clip.name] = clip;
//						return acc;
//					}, {})} 
//					playAction={(name) => {
//						console.log("🚀 ~ ModelAnimation ~ name:", name, actions)
//						setAction(actions[0])
//            actionAssigned = true
//					}} 
//				/>
//				</In>
//			 <primitive object={scene} ref={modelRef} />
//			</>
       
//    )
//}

//import { useEffect, useMemo, useState } from 'react';
//import { AnimationMixer, LoopRepeat } from 'three';
//import { useFrame } from '@react-three/fiber';
//import { useGLTF } from '@react-three/drei';
//import { In } from 'react-transition-group';
//import TailwindAnimationControls from './TailwindAnimationControls'; // Adjust the import path as needed

export function ModelAnimation({ url = `https://dbrhuu5ekb5pj.cloudfront.net/heart-v1.glb`, modelRef, setModelLoaded }) {
    const { animations, scene } = useGLTF(url, true);
    const mixer = useMemo(() => new AnimationMixer(scene), [scene]);
    const [animationSpeed, setAnimationSpeed] = useState<number>(1);
	const [action, setAction] = useState<any>(null);
    const actions = useMemo(() => ({}), []); // Initialize actions memo

    useEffect(() => {
        if (!mixer || !scene || !modelRef.current) return;

        animations.forEach((clip) => {
            const action = mixer.clipAction(clip, scene);
            action.clampWhenFinished = true;
            action.loop = LoopRepeat;
            //action.play();
            actions[clip.name] = action; // Store the action in the actions object
        });

        return () => {
            mixer.stopAllAction();
        };
    }, [animations, mixer, scene, modelRef, actions]);

    useEffect(() => {
        mixer.timeScale = animationSpeed;
    }, [animationSpeed, mixer]);

    useEffect(() => {
        modelRef.current = scene;
        setModelLoaded(scene);
    }, [scene, modelRef, setModelLoaded]);

    useFrame((_, delta) => {
        mixer.update(delta);
		});
	
	
const playAction = (name,isPlaying) => {
    const action = actions[name];
    if (action) {
        if (isPlaying) {
            if (!action.isRunning()) {
                // If the action is not already running, start it
                action.reset().fadeIn(0.1).play();
            }
        } else {
            action.stop(); // Stop the animation if isPlaying is false
        }
        setAction(action);
    }
};


    return (
        <>
            <In>
                <TailwindAnimationControls
                    animationSpeed={animationSpeed}
                    setAnimationSpeed={setAnimationSpeed}
                    mixer={mixer}
                    animations={Object.keys(actions)}
										playAction={playAction}
										anims={animations}
                />
            </In>
            <primitive object={scene} ref={modelRef} />
        </>
    );
}

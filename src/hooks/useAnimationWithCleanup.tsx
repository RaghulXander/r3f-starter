//import * as React from "react"
//import { useFrame } from "@react-three/fiber"
//import { AnimationAction, AnimationClip, AnimationMixer, Object3D } from "three"

//type Api<T extends AnimationClip> = {
//	ref: React.MutableRefObject<Object3D | undefined | null>
//	clips: AnimationClip[]
//	mixer: AnimationMixer
//	names: T["name"][]
//	actions: { [key in T["name"]]: AnimationAction | null }
//}

//export function useAnimationsWithCleanup<T extends AnimationClip>(
//	clips: T[],
//	root?: React.MutableRefObject<Object3D | undefined | null> | Object3D,
//	dependency?: any, // New dependency to trigger cleanup and reinitialization
//): Api<T> {
//	const ref = React.useRef<Object3D>()
//	const [actualRef] = React.useState(() => (root ? (root instanceof Object3D ? { current: root } : root) : ref))
//	const [mixer] = React.useState(() => new AnimationMixer(undefined as unknown as Object3D))
//	const lazyActions = React.useRef({})
//	const [api] = React.useState<Api<T>>(() => {
//		const actions = {} as { [key in T["name"]]: AnimationAction | null }
//		clips.forEach((clip) =>
//			Object.defineProperty(actions, clip.name, {
//				enumerable: true,
//				get() {
//					if (actualRef.current) {
//						return (
//							lazyActions.current[clip.name] ||
//							(lazyActions.current[clip.name] = mixer.clipAction(clip, actualRef.current))
//						)
//					}
//				},
//			}),
//		)
//		return { ref: actualRef, clips, actions, names: clips.map((c) => c.name), mixer }
//	})

//	// Update ref when root or actualRef changes
//	React.useEffect(() => {
//		if (root && root.current && root.current !== actualRef) {
//			setActualRef(root.current)
//		}
//	}, [root, actualRef])

//	useFrame((_, delta) => mixer.update(delta))

//	React.useEffect(() => {
//		const currentRoot = actualRef.current
//		return () => {
//			// Clean up only when clips change, wipe out lazy actions and uncache clips
//			Object.values(api.actions).forEach((action: AnimationAction) => {
//				if (currentRoot) {
//					mixer.uncacheAction(action as unknown as AnimationClip, currentRoot)
//				}
//			})
//			lazyActions.current = {}
//		}
//	}, [clips, dependency]) // Include dependency in the cleanup effect

//	React.useEffect(() => {
//		return () => {
//			mixer.stopAllAction()
//		}
//	}, [mixer])

//	return api
//}

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimationAction, AnimationClip, AnimationMixer, Object3D, Clock } from 'three';

export function useAnimations(animations: AnimationClip[], root: Object3D): [AnimationMixer, { [key: string]: AnimationAction }] {
  const mixer = useMemo(() => new AnimationMixer(root), [root]);
  const actions = useMemo(() => {
    const actionsObj: { [key: string]: AnimationAction } = {};
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip, root);
      actionsObj[clip.name] = action;
    });
    return actionsObj;
  }, [animations, mixer, root]);

  useEffect(() => {
    animations.forEach((clip) => {
      mixer.clipAction(clip, root);
    });
    return () => {
      mixer.uncacheRoot(root);
    };
  }, [animations, mixer, root]);

  return [mixer, actions];
}


export function useAnimate(mixer: AnimationMixer, actions: { [key: string]: AnimationAction }) {
  const clock = useRef(new Clock());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        const delta = clock.current.getDelta();
        mixer.update(delta);
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      setIsPlaying(false);
    };
  }, [isPlaying, mixer]);

  const playAction = (name: string) => {
    Object.keys(actions).forEach((actionName) => {
      if (actionName === name) {
        actions[actionName].play();
      } else {
        actions[actionName].stop();
      }
    });
    setIsPlaying(true);
  };

  return playAction;
}


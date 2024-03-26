import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Canvas } from '@react-three/fiber';
import { button, Leva, useControls } from 'leva';
import saveAs from 'file-saver'
import { Color } from 'three';
import * as THREE from "three"
import { Suspense, useMemo, useRef, useState } from 'react';
import {CustomEnv} from "../../components/Env";
import { useCanvasResizer } from '../../hooks/useCanvasResizer';
import { Loader } from '../../components/Loader';
import { r3f } from '../../lib/tunnel';
//import { CameraControls } from 'three-stdlib';
import { PerspectiveCamera, Stage, useAnimations } from '@react-three/drei';
import { ModelAnimation } from '../../components/CustomModel';

const XRViewer = ({ url, openARView }) => {
	const { Out } = r3f

	const getFileName = (filename: string): string => {
		const now = new Date()
		const day = now.getDate().toString().padStart(2, "0")
		const hour = now.getHours().toString().padStart(2, "0")
		const minute = now.getMinutes().toString().padStart(2, "0")
		const timestamp = `${day}${hour}${minute}`
		const parts = filename.split(".")
		const extension = parts.length > 1 ? `.${parts.pop()}` : ""
		const baseFilename = parts.join(".")
		return `${baseFilename}_${timestamp}${extension}`
	}
	const canvasRef = useRef(null)
	const modelRef = useRef(null)
	const cameraRef = useRef(null)
	const controlRef = useRef(null)
	const [loading, setModelLoaded] = useState(false)
	let fileName = getFileName("preview")
	//const controls = useControls('Preview', {
	//  orbit: { label: 'Rotate', value: false },
	//  orbitSpeed: { label: 'Speed', value: 1, min: 0.5, max: 10 },
	//});
	//const preview = useControls(
	//'Preview',
	//  {
	//  orbit: { label: 'Rotate', value: false },
	//  showAxes: { label: 'Axes', value: false },
	//	showGrid: { label: 'Grid', value: false },
	//  orbitSpeed: { label: 'Speed', value: 1, min: 0.5, max: 10 },
	//  contactShadow: { label: 'Shadow', value: true },
	//  intensity: { value: 1, min: 0, max: 2, step: 0.1, label: 'Light' },
	//  preset: {
	//    value: 'rembrandt',
	//    options: ['rembrandt', 'portrait', 'upfront', 'soft'],
	//    },
	//  environment: {
	//    value: 'city',
	//    options: ['', 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
	//  },
	//},
	//{ collapsed: true }
	//)
	//const exports = useMemo(() => {
	//	const temp = {}
	//	//temp['copy to clipboard'] = button(() =>
	//	//  toast.promise(copy(code), {
	//	//    loading: 'Loading',
	//	//    success: () => `Successfully copied`,
	//	//    error: (err) => err.toString(),
	//	//  })
	//	//)
	//	//temp['download zip'] = button(() =>
	//	//  toast.promise(download(), {
	//	//    loading: 'Loading',
	//	//    success: () => `Ready for download`,
	//	//    error: (err) => err.toString(),
	//	//  })
	//	//)

	//	//if (!isGlb(fileName) && !error) {
	//	//  const name = 'codesandbox' + (loading ? ' loading' : '')
	//	//  temp[name] = button(() => {
	//	//    location.href = sandboxId
	//	//      ? `https://codesandbox.io/s/${sandboxId}?file=/src/Model.${config.types ? 'tsx' : 'js'}`
	//	//      : '#'
	//	//  })
	//	//}

	//	temp['Download image'] = button(() => {
	//		var image = document
	//			.getElementsByTagName('canvas')[0]
	//			.toDataURL('image/png')
	//			.replace('image/png', 'image/octet-stream')

	//		saveAs(image, `${fileName.split('.')[0]}.png`)
	//	})

	//	return temp
	//}, [fileName])

	//useControls('Export Image', exports, { collapsed: true }, [exports])
	useCanvasResizer(canvasRef, modelRef?.current, cameraRef?.current, controlRef.current)
	return (
		<>
			<Leva titleBar={{ title: 'Configuration' }} collapsed />
			<div id="canvas-container" className="relative h-full">
				<Canvas
					ref={canvasRef}
					//camera={{ zoom: 0.6 }}
					//camera={{ position: [0, 0, 150], fov: 50 }}
					onCreated={({ scene, gl }) => {
						gl.setClearColor(0x000000, 0)
						//scene.background = new Color('#bfe3dd');
						scene.toneMapping = THREE.LinearToneMapping
					}}
					antialias
					colorManagement
					sortObjects
					shadowMap={{ enabled: true }}
					gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true, clearColor: 'white', alpha: true, antialias: true, autoClear: true }}
					style={{ width: "100%", height: "100%" }}
					shadows dpr={[1, 1.5]}
					//camera={{ position: [5, 2, 9], fov: 50 }}
					camera={{ position: [5, 2, 9], fov: 40, near: 1, far: 100, quaternion: [0, 0, 0, 1] }}
				>
					<CustomEnv />
					<Suspense fallback={<Loader />}>
						<ModelAnimation modelRef={modelRef} setModelLoaded={setModelLoaded} url={url} />
					</Suspense>
					{/*<TailwindAnimationControls*/}
					<PerspectiveCamera makeDefault ref={cameraRef} fov={40} />
					<OrbitControls
						enablePan
						//autoRotate={preview.orbit}
						//autoRotateSpeed={preview.orbitSpeed}
						enableRotate
						enableZoom
						//rotateSpeed={0.8}
						//zoomSpeed={1.2} // Adjust the zoom speed as needed
						//minDistance={1} // Set the minimum distance for zooming
						//maxDistance={10} // Set the maximum distance for zooming
						//minPolarAngle={0}
						//maxPolarAngle={Math.PI / 2}
						ref={controlRef}
					/>
					{/*{preview.showGrid && <AxisGridHelper />}
          {preview.showAxes && <axesHelper /> }*/}
				</Canvas>
				<div className="w-full absolute bottom-0 flex justify-start items-center bg-black bg-opacity-50 p-4 rounded-t-lg gap-4">
					<Out />
					<button
						onClick={() => {
							let [canvasElement] = document
								.getElementsByTagName('canvas')
							if (canvasElement) {
								const image = canvasElement.toDataURL('image/png')
									.replace('image/png', 'image/octet-stream')
								saveAs(image, `${fileName.split('.')[0]}.png`)
							}
						}}
						className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 justify-self-end"
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
						</svg>
						<span>Screenshot</span>
					</button>
					<button
						onClick={openARView}
						className="flex gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 justify-self-end"
					>
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							viewBox="0 0 24 24"
							className="w-6 h-6"
						>
							<path stroke="none" d="M0 0h24v24H0z" />
							<path d="M10 21H8a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v3.5" />
							<path d="M17 17l-4-2.5 4-2.5 4 2.5V19l-4 2.5z" />
							<path d="M13 14.5V19l4 2.5M17 17l4-2.5M11 4h2" />
						</svg>
						<span>View AR</span>
					</button>

				</div>

			</div>
		</>
	);
}

export default XRViewer;

function AxisGridHelper() {
	return (
		<>
			<gridHelper />
			<gridHelper rotation-x={Math.PI / 2} />
		</>
	);
}

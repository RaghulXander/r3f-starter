import { useEffect } from "react"
import * as THREE from "three"

export function useCanvasResizer(canvasRef, model, camera, controls) {
	useEffect(() => {
		const resizeHandler = () => {
			if (!canvasRef.current || !model || !controls) return
			const scale = 1
			const { clientWidth, clientHeight } = canvasRef.current
			const center = new THREE.Vector3()
			const multiplier = -1
			const box = new THREE.Box3().setFromObject(model)
			const boxSize = box.getSize(new THREE.Vector3()).multiplyScalar(scale)
			let maxSide = Math.max(boxSize.x, Math.max(boxSize.y, boxSize.z))
			if (maxSide < 1) maxSide = 2.6725857049414817
			console.log("🚀 ~ resizeHandler ~ maxSide:", maxSide)
			const defaultNear = maxSide / 100
			const defaultFar = maxSide * 100
			console.log("🚀 ~ resizeHandler ~ defaultNear:", defaultNear, defaultFar)
			const aspect = Math.min(1, clientWidth / clientHeight)
			const vFOV = (camera.fov * Math.PI) / 180
			const radiusSphere = Math.sqrt(boxSize.x ** 2 + boxSize.y ** 2 + boxSize.z ** 2) / 2

			model.scale.set(scale, scale, scale)
			model.position.set(0, (multiplier * boxSize.y) / 2, 0)
			model.position.set(0, 0, 0)

			// Resize the canvas
			//canvasRef.current.width = clientWidth
			//canvasRef.current.height = clientHeight

			// Update the camera or model scale
			let zSphere = 1.2 * (radiusSphere / Math.sin(vFOV / 2) / aspect)
			if (window.innerHeight < 500) {
				zSphere += 2 * (1 - (window.innerHeight / 500) ** 2)
			}
			if (camera) {
				camera.aspect = clientWidth / clientHeight
				//const canvasSize = Math.min(clientWidth, clientHeight)
				//const distance = canvasSize / (2 * Math.tan((camera.fov * Math.PI) / 360))
				const distance = maxSide * 2.5
				console.log("🚀 ~ resizeHandler ~ distance:", distance, Math.min(clientWidth, clientHeight) / (2 * Math.tan((camera.fov * Math.PI) / 360)))
				//camera.position.set(center.x, center.y, distance)
				//camera.lookAt(center.x, center.y, center.z)
				camera.position.set(-zSphere / 2, -zSphere / 2, zSphere)
				camera.far = defaultFar
				camera.near = defaultNear
				controls.target.set(0, 0, 0)
				camera.updateProjectionMatrix()
				camera.position.set(0, 0, distance)
				//camera.lookAt(new THREE.Vector3(0, 0, 0))
			}
				console.log("🚀 ~ resizeHandler ~ camera:", camera)

			// Update the model scale or position
			//if (model) {
			//	// Example: Scaling the model based on the canvas size
			//	//const scale = Math.min(clientWidth, clientHeight) / 2
			//	//console.log("🚀 ~ resizeHandler ~ canvasRef:", canvasRef, model, camera, scale)
			//	//model.scale.set(scale, scale, scale)
			//	let maxSize = 0
			//	const bbox = new THREE.Box3().setFromObject(model)
			//	const modelSize = new THREE.Vector3()
			//	bbox.getSize(modelSize)
			//	if (maxSize < modelSize.x) maxSize = modelSize.x
			//	if (maxSize < modelSize.y) maxSize = modelSize.y
			//	// maxSize = 100000;
			//	const center = new THREE.Vector3()
			//	bbox.getCenter(center)
			//	//console.log("Maxsize", maxSize, center.x)
			//	//model.position.set(0, 0, -1)
			//	const modelCenter = modelSize.clone().multiplyScalar(0.5)

			//	const offsetX = clientWidth / 2 - screenWidth / 2
			//	const offsetY = clientHeight / 2 - screenHeight / 2
			//	//const offsetY = -clientHeight / 2 + screenHeight / 2 + (modelSize.y * scale) / 2 // Adjusted for the model's size
			//	const screenDiagonal = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight)
			//	const scale = screenDiagonal / 0.5 // Adjust the division factor as needed
			//	model.scale.set(scale, scale, scale)
			//	//model.position.set(-modelCenter.x + offsetX, -modelCenter.y / 2, -1)
			//	model.position.set(-modelSize.x / 2 + offsetX, -modelSize.y / 2 + offsetY, -1) // Place the model slightly behind the origin
			//	//model.position.set(0 - (5 * center.x) / maxSize, 0 - (5 * center.y) / maxSize, 0 - (5 * center.z) / maxSize)

			//	//model.scale.set(5 / maxSize, 5 / maxSize, 5 / maxSize)
			//	const onFloor = true // Change to false if model should not be on the floor
			//	if (onFloor) {
			//		const mesh = new THREE.Mesh(
			//			new THREE.PlaneGeometry(100, 100, 1, 1),
			//			new THREE.ShadowMaterial({
			//				color: 0x000000,
			//				opacity: 0.05,
			//			}),
			//		)
			//		mesh.rotation.x = -Math.PI / 2
			//		mesh.translateZ(-modelSize.y / 2 - 0.00001)
			//		mesh.receiveShadow = true
			//		model.add(mesh)
			//	}
			//}s

			if (model) {
				const screenWidth = window.innerWidth
				const screenHeight = window.innerHeight
				const screenDiagonal = Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight)
				const updatedScale = screenDiagonal / 70 // Adjust the division factor as needed
				model.scale.set(updatedScale, updatedScale, updatedScale)
				model.position.set(0, (multiplier * maxSide) / 2, 0)
				//model.position.set(0, -boxSize.y * 2, -boxSize.z / 2)
			}
			console.log("🚀 ~ resizeHandler ~ clientWidth, clientHeight:", model, controls, canvasRef, camera)
		}

		// Initial resize
		resizeHandler()

		// Add resize event listener
		window.addEventListener("resize", resizeHandler)

		// Remove resize event listener on cleanup
		return () => {
			window.removeEventListener("resize", resizeHandler)
		}
	}, [canvasRef, model, camera])
}


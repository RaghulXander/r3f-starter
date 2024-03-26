import { useEffect } from "react"
import { Html, useProgress } from "@react-three/drei"
import CircularProgressLoader from "./ProgressLoader"

export const Loader = () => {
	const { progress } = useProgress()

	useEffect(() => {
		const interval = setInterval(() => {
			console.log(`Progress: ${progress}%`)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [progress])

	if (parseInt(progress.toFixed(0)) === 0) return null
	return (
		<Html center>
			<CircularProgressLoader progress={parseInt(progress.toFixed(2))} />
		</Html>
	)
}

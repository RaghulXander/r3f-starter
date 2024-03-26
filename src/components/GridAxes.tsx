import { memo } from "react"
import { useControls } from "leva"

const numberRange = (value: number, max = 25, min = -25, step = 0.001) => {
	return { value, min, max, step }
}

const GridAxes = () => {
	const {
		showAxes,
		showGrid
	} = useControls(
		"Axes & Grid",
		{
			showAxes: false,
			showGrid: false,
		},
		{ collapsed: false, order: 3 },
	)

	return (
		<group>
			{showAxes ? <axesHelper  /> : null}
			{showGrid ? <gridHelper scale={1} /> : null}
		</group>
	)
}

export default memo(GridAxes)

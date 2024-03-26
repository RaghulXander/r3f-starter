import { mergeClasses } from "@src/lib/utils"
import React from "react"

export interface ICircularProgressBarProps {
	/**
	 *  Current progress value (0-100)
	 */
	progress: number

	/**
	 * Optional Size of the circular progress bar
	 */
	size?: number

	/**
	 * Optional Size of the stroke
	 */
	stokeSize?: number

	/**
	 * Optional class name for the progress text
	 */
	progresTextsClassName?: string

	/**
	 * Optional class name for the circle elements
	 */
	circleClassName?: string

	/**
	 * Optional class name for the background circle element
	 */
	backgroundCircleClassName?: string
}


export const CircularProgress: React.FC<ICircularProgressBarProps> = (props) => {
	const {
		progress = 0,
		size = 120,
		stokeSize = 12,
		progresTextsClassName,
		circleClassName,
		backgroundCircleClassName,
	} = props

	const radius = (size - 20) / 2 // radius based on the size
	const circumference = 2 * Math.PI * radius // circumference of the circle with the radius
	const offset = circumference - (progress / 100) * circumference // stroke-dashoffset based on progress
	const sizeClassName = `w-${size / 4} h-${size / 4}` // Make sure the classname is available in tailwind or extend it

	return (
		<div className={mergeClasses("relative", sizeClassName, backgroundCircleClassName)} data-testid="progress-circle">
			<svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
				<circle
					className={mergeClasses("text-slate-200 stroke-current", circleClassName)}
					strokeWidth={stokeSize}
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="transparent"
				/>
				<circle
					className={mergeClasses("text-primary-default stroke-current", circleClassName)}
					strokeWidth={stokeSize}
					strokeLinecap="round"
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					transform="rotate(-90, 60, 60)"
				/>
				<text
					x={size / 2}
					y={size / 2}
					className={mergeClasses("text-lg font-normal font-['Plus Jakarta Sans']", progresTextsClassName)}
					textAnchor="middle"
					alignmentBaseline="middle"
				>
					{progress}%
				</text>
			</svg>
		</div>
	)
}

export default CircularProgress

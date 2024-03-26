/* eslint-disable tailwindcss/classnames-order */
// @ts-nocheck
"use client"

import React, { Fragment, useEffect, useState } from "react"
import { ModelViewer } from "../ModelViewer/ModelViewer"
import XRViewer from "../XRViewer/XRViewer"
import {QRModal} from "../QRModal/QRModal"

export default function Experience({url = "https://dbrhuu5ekb5pj.cloudfront.net/skeleton-v1.glb"}) {
	const [isMobileARCompatible, setIsMobileARCompatible] = useState(false)
	const [showQRModal, setShowQRModal] = useState(false)
	const [isAr, setAr] = useState(false)
const openARView = () => {
    // Check if URL contains experienceMode=qr
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('experienceMode') && urlParams.get('experienceMode') === 'qr') {
      setAr(true);
    } else {
			if (isMobileARCompatible) {
					// Open AR view logic here
					setAr(true);
			} else {
					setShowQRModal(true);
			}
    }
}

	const checkMobileARCompatibility = async () => {
		if ("xr" in navigator) {
			try {
				// @ts-ignore
				const supported = await navigator.xr.isSessionSupported("immersive-ar")
				setIsMobileARCompatible(supported)
			} catch (error) {
				console.error("Error checking AR compatibility:", error)
				setIsMobileARCompatible(false)
			}
		} else {
			setIsMobileARCompatible(false)
		}
	}

	useEffect(() => {
		checkMobileARCompatibility()
	}, [])

	useEffect(() => {
		const script = document.createElement("script")
		script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"
		script.type = "module"
		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [])

	return (
			<div className="relative flex w-full h-full">
				{isAr ? <ModelViewer withAr={isAr} url={url} /> : <XRViewer url={url} openARView={openARView} />}
				{showQRModal && <QRModal onClose={() => setShowQRModal(false)} />}
			</div>
	)
}

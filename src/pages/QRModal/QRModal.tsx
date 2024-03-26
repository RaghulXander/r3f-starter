/* eslint-disable tailwindcss/classnames-order */
import QRCode from "react-qr-code"

export const QRModal = ({ onClose }: { onClose: () => void }) => {
	const url = window.location.origin + window.location.pathname + (window.location.search ? `${window.location.search}&` : '?') + 'experienceMode=qr'

	return (
		<div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 p-20">
			<div className="flex w-[70vw] flex-col justify-center rounded-lg bg-white shadow-lg relative p-5 h-full items-center gap-2">
				<h2 className="text-lg font-bold">Scan QR Code for AR view</h2>
				<hr className="border-t-2 border-gray-300 my-2 w-1/2"/>
				<div className="text-center border-2 border-gray-600 p-4 rounded-xl">
					
					<QRCode value={url} />
				</div>
				<button
					onClick={onClose}
					className="absolute right-0 top-0 bg-white px-2 py-2 font-bold text-black hover:bg-gray-700 hover:text-white rounded-sm"
				>
					X
				</button>
			</div>
		</div>
	)
}

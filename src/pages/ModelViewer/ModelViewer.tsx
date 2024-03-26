"use client"

import { Helmet } from 'react-helmet';
import { Fragment } from 'react/jsx-runtime';

//const CustomHead = () => (

//)

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'model-viewer': ModelViewerAttributes
		}
		interface ModelViewerAttributes {
			src: string,
			children?: any,
			id?: any,
			ref?: any,
			class: string,
			poster: string,
			alt: string,
			ar: boolean,
		}
	}
}

export const ModelViewer = ({ withAr, url}: {withAr: boolean, url: string}) => (
	<Fragment>
		<Helmet>
			<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"></script>
		</Helmet>
		<div id="google-model-viewer" className="h-screen w-full">
		<model-viewer
			class="w-full h-[70vh]"
			src={url}
			ios-src=""
			poster="7"
			alt="A 3D model"
			shadow-intensity="1"
			camera-controls
			auto-rotate
			ar={withAr}
		></model-viewer>
	</div>
	</Fragment>

)
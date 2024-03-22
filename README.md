# ⚛️🤝3️⃣ Three.js + React Three Fiber Template

> ✨ See a [live demo here](https://three-fiber-starter.onrender.com)

## Features 
- [**Pnpm**](https://github.com/pnpm/pnpm)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Vite**](https://vitejs.dev/)
  - [`vite-tsconfig-paths`](https://github.com/aleclarson/vite-tsconfig-paths)
  - [`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer)
- [**React 18**](https://react.dev/)
- [**Three.js**](https://threejs.org/)
- [**React Three Fiber**](https://github.com/pmndrs/react-three-fiber)
  - [`drei`](https://github.com/pmndrs/drei)
  - [`@react-spring/three`](https://www.react-spring.dev/docs/guides/react-three-fiber)
- [**Leva**](https://github.com/pmndrs/leva)

## Getting Started

#### 1. Install deps
```sh
$ pnpm install
```
Expect a peer dependency version mismatch warning due to [Leva not upgrading to React 18 yet.](https://github.com/pmndrs/leva/issues/358)

#### 2. Run the development server
```sh
$ pnpm dev
```
By default, your app will be available on http://localhost:5173

#### 3. Build for production
```sh
$ pnpm build
```
This will output the build into `dist`. You may use this directory for static deployments.
*The build size will be quite large due to three.js. This can be visualized by opening the `stats.html` build artifact in your browser*


## Resources

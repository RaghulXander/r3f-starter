import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Canvas } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { Color } from 'three';
import './App.css';
import { SpinningCube } from './components/SpinningCube';

function App() {
  const controls = useControls('Camera', {
    orbit: { label: 'Orbit', value: false },
    orbitSpeed: { label: 'Speed', value: 1, min: 0.5, max: 10 },
  });

  return (
    <>
      <Leva titleBar={{ title: 'Configuration' }} collapsed />
      <div id="canvas-container">
        <Canvas
          camera={{ zoom: 0.6 }}
          onCreated={({ scene }) => {
            scene.background = new Color('black');
          }}
        >
          <SpinningCube />
          <OrbitControls
            autoRotate={controls.orbit}
            autoRotateSpeed={controls.orbitSpeed}
          />
          <AxisGridHelper />
        </Canvas>
      </div>
    </>
  );
}

export default App;

function AxisGridHelper() {
  return (
    <>
      <gridHelper />
      <gridHelper rotation-x={Math.PI / 2} />
    </>
  );
}

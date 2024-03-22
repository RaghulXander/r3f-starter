import {
  SpringValue,
  animated,
  config,
  to,
  useSpring,
} from '@react-spring/three';
import { omitKeys } from '@src/lib/utils';
import { useControls } from 'leva';
import type { HexColorString } from 'three';

export function SpinningCube() {
  const { color1, color2, scale, rotation } = useCubeControls();

  return (
    <>
      {/* @ts-ignore */}
      <animated.hemisphereLight color={color1} groundColor={color2} />
      <animated.mesh
        scale={scale}
        rotation={rotation}
        material-color={'#dddddd'}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </animated.mesh>
    </>
  );
}

function useCubeControls() {
  const dimConfig = () => ({
    value: ~~(Math.random() * 6),
    min: 1,
    max: 10,
    step: 1,
  });

  const [controls, setControls] = useControls('Cube', () => ({
    color1: { label: 'Top Color', value: '#ff0000' as HexColorString },
    color2: { label: 'Bottom Color', value: '#0000ff' as HexColorString },
    width: { label: 'Width', ...dimConfig() },
    height: { label: 'Height', ...dimConfig() },
    depth: { label: 'Depth', ...dimConfig() },
    autoRotate: { label: 'Auto Rotate', value: true },
    rotation: { label: 'Rotation', value: 0.2, min: 0, max: 3.14 },
  }));

  const { color1, color2, width, height, depth } = useSpring({
    to: omitKeys(controls, ['rotation', 'autoRotate']),
    config: { ...config.gentle },
  });

  const { rotation } = useSpring({
    from: { rotation: 0 },
    to: { rotation: 3.14 },
    config: { duration: 4000 },
    loop: true,
    pause: !controls.autoRotate,
    onPause: ({ value }) => {
      setControls({ rotation: (value as SpringValue<number>).get() });
    },
  });

  return {
    color1,
    color2,
    scale: to([width, height, depth], (x, y, z) => [x, y, z]),
    rotation: to(controls.autoRotate ? rotation : controls.rotation, (r) => [
      r,
      r,
      r,
    ]) as any,
  };
}

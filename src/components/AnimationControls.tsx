import React, { useState, useEffect } from 'react';
import { AnimationMixer, Clock } from 'three';
import { Dropdown } from './Dropdown';

//const TailwindAnimationControls: React.FC<{
//  mixer: AnimationMixer;
//  animations: string[];
//  playAction: (animation: string, isPlaying: boolean) => void;
//  setAnimationSpeed: (speed: number) => void;
//  animationSpeed: number;
//}> = ({ mixer, animations, playAction, setAnimationSpeed, animationSpeed }) => {
//  console.log("🚀 ~ mixer:", mixer)
//  const actionNames = ["empty", ...animations];
//  const [isPlaying, setIsPlaying] = useState<boolean>(false);
//  const [selectedAnimation, setSelectedAnimation] = useState<string>(actionNames[0]);
//   const [sliderValue, setSliderValue] = useState(0);
//  const [appliedSliderValue, setAppliedSliderValue] = useState(0);
//  const clock = new Clock();

//  useEffect(() => {
//    const animate = () => {
//      if (isPlaying) {
//        const delta = clock.getDelta();
//        mixer.update(delta * animationSpeed);
//      }
//      requestAnimationFrame(animate);
//    };
//    animate();
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, [isPlaying, animationSpeed]);

//  useEffect(() => {
//    if (isPlaying) {
//      mixer.timeScale = animationSpeed;
//    }
//  }, [isPlaying, animationSpeed, mixer]);

//  const handlePlayPause = () => {
//    setIsPlaying(!isPlaying);
//    playAction(selectedAnimation, !isPlaying);
//    if (!isPlaying) {
//      mixer.timeScale = 1; // Reset the time scale when starting playback
//    }
//  };

//  useEffect(() => {
//   const updateSliderValue = () => {
//      if (isPlaying) {
//        const duration = mixer.time;
//        const totalDuration = mixer._actions[0]._clip.duration;
//        const newValue = (duration / totalDuration) * 100;
//        setSliderValue(newValue);
//      }
//    };

//    const frameId = setInterval(updateSliderValue, 1000 / 60);
//    return () => clearInterval(frameId);
//  }, [mixer]);

//  const handleSliderChange = (e) => {
//    const newValue = parseFloat(e.target.value);
//    if (appliedSliderValue !== newValue) {
//      setSliderValue(newValue);
//      const totalDuration = mixer._actions[0]._clip.duration;
//      const newTime = (newValue / 100) * totalDuration;
//      mixer.setTime(newTime);
//      setAppliedSliderValue(newValue);
//    }
//  };
//  const handleAnimationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//    setSelectedAnimation(e.target.value);
//  };

//  return (
//    <div className="flex items-center space-x-4 absolute bottom-0">
//      <button onClick={handlePlayPause}>
//        {isPlaying ? 'Pause' : 'Play'}
//      </button>
//      <select
//        value={selectedAnimation}
//        onChange={handleAnimationChange}
//        className="border rounded-md px-2 py-1"
//      >
//        {actionNames?.map((animation) => (
//          <option key={animation} value={animation}>
//            {animation}
//          </option>
//        ))}
//      </select>
//      <input
//        type="range"
//        min="0.1"
//        max="10" // Set a reasonable max value for your animation speed
//        step="0.1"
//        value={sliderValue}
//        onChange={handleSliderChange}
//        className="w-full"
//      />
//      <span>{sliderValue}</span>
//    </div>
//  );
//};

//import React, { useState, useEffect } from 'react';
//import { AnimationMixer } from 'three';

interface ModelAnimationControlsProps {
  mixer: AnimationMixer;
  animations: string[];
  playAction: (animation: string, isPlaying: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  animationSpeed: number;
}

//const ModelAnimationControls: React.FC<ModelAnimationControlsProps> = ({ mixer, animations, playAction, setAnimationSpeed, animationSpeed, anims }) => {
//  const actionNames = ["empty", ...animations];
//  const [isPlaying, setIsPlaying] = useState<boolean>(false);
//  const [sliderValue, setSliderValue] = useState<number>(0);
//  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(0);
//  const [maxSliderValue, setMaxSliderValue] = useState(1);
//  const [selectedAnimation, setSelectedAnimation] = useState<string>(actionNames[0]);
//  const clock = new Clock();

//  useEffect(() => {
//    const animate = () => {
//      if (isPlaying) {
//        const delta = clock.getDelta();
//        mixer.update(delta);
//      }
//      requestAnimationFrame(animate);
//    };
//    animate();
//    // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, [isPlaying, mixer]);

//  useEffect(() => {
//    const updateSliderValue = () => {
//      if (isPlaying) {
//        const duration = mixer.time;
//        const totalDuration = mixer._actions[0]._clip.duration;
//        const newValue = (duration / totalDuration) * 100;
//        setSliderValue(newValue);
//      }
//    };

//    const frameId = setInterval(updateSliderValue, 1000 / 60);
//    return () => clearInterval(frameId);
//  }, [isPlaying, mixer]);

// const handlePlayPause = () => {
//  setIsPlaying(!isPlaying);
//  if (!isPlaying) {
//    mixer.timeScale = 1; // Reset the time scale when starting playback
//    playAction(selectedAnimation, true); // Start playing the selected animation
//  } else {
//    mixer.timeScale = 0; // Pause the animation
//    playAction(selectedAnimation, false); // Pause the selected animation
//  }
//};

//const handleSliderChange = (newSliderValue) => {
//  console.log("🚀 ~ handleSliderChange ~ newSliderValue:", anims, newSliderValue, appliedSliderValue, mixer._actions)
//  if (appliedSliderValue !== newSliderValue) {
//    setSliderValue(newSliderValue); // Update the state with the new slider value
//    const totalDuration = anims[0].duration;
//    const newTime = Number(totalDuration * newSliderValue); // Use newSliderValue here
//    console.log("🚀 ~ handleSliderChange ~ newTime:", newTime)
//    mixer.setTime(newTime); // Set the new time for the animation
//    mixer.update(0);
//  }
//};

//  const handleAnimationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//    setSelectedAnimation(e.target.value);
//    const selectedAnimationObject = animations.find(clip => clip.name === e.target.value);
//    if (selectedAnimationObject) {
//      // Update the slider's max value based on the selected animation's duration
//      setMaxSliderValue(selectedAnimationObject.duration);
//    }
//  };

//  return (
//    <div>
//      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
//      <select value={selectedAnimation} onChange={handleAnimationChange}>
//        {actionNames.map((animation) => (
//          <option key={animation} value={animation}>
//            {animation}
//          </option>
//        ))}
//      </select>
//      <input
//        type="range"
//        min="0"
//        max={maxSliderValue}
//        step="0.1"
//        value={sliderValue}
//        onInput={(e) => handleSliderChange(parseFloat(e.target.value))}
//        disabled={isPlaying}
//        className="w-full"
//      />
//    </div>
//  );
//};

const ModelAnimationControls: React.FC<ModelAnimationControlsProps> = ({ mixer, animations, playAction, setAnimationSpeed, animationSpeed, anims }) => {
  const actionNames = [...animations];
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [appliedSliderValue, setAppliedSliderValue] = useState<number>(0);
  const [maxSliderValue, setMaxSliderValue] = useState<number>(1);
  const [selectedAnimation, setSelectedAnimation] = useState<string>(actionNames[0]);
  const clock = new Clock();

  useEffect(() => {
    const animate = () => {
      if (isPlaying) {
        const delta = clock.getDelta();
        mixer.update(delta);
      }
      requestAnimationFrame(animate);
    };
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, mixer]);

  useEffect(() => {
    const updateSliderValue = () => {
      if (isPlaying) {
        const duration = mixer.time;
        const totalDuration = mixer._actions[0]._clip.duration;
        const newValue = (duration / totalDuration) * 100;
        setSliderValue(newValue);
      }
    };

    const frameId = setInterval(updateSliderValue, 1000 / 60);
    return () => clearInterval(frameId);
  }, [isPlaying, mixer]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      mixer.timeScale = 1;
      playAction(selectedAnimation, true);
    } else {
      mixer.timeScale = 0;
      playAction(selectedAnimation, false);
    }
  };

  const handleSliderChange = (newSliderValue: number) => {
    if (appliedSliderValue !== newSliderValue) {
      setSliderValue(newSliderValue);
      const totalDuration = anims[0].duration;
      const newTime = (newSliderValue / 100) * totalDuration;
      mixer.setTime(newTime);
      mixer.update(0); // Not sure if this is necessary
    }
    setAppliedSliderValue(newSliderValue);
  };

  const handleAnimationChange = (selected: string) => {
    setSelectedAnimation(selected);
    const selectedAnimationObject = animations.find(clip => clip.name === selected);
    if (selectedAnimationObject) {
      setMaxSliderValue(selectedAnimationObject.duration);
    }
  };

  return (
<div className="flex items-center gap-4 flex-1">
  <button className="bg-blue-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded" onClick={handlePlayPause}>
    {isPlaying ? 'Pause' : 'Play'}
  </button>
      <Dropdown options={actionNames} onSelect={handleAnimationChange} selectedOption={selectedAnimation} />
  <input
    type="range"
    min="0"
    max={maxSliderValue}
    step="0.1"
    value={sliderValue}
    onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
    disabled={isPlaying}
    className="w-full appearance-none bg-gray-800 h-1 rounded-lg cursor-pointer"
  />
</div>
  );
};


export default ModelAnimationControls;
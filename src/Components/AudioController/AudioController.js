import React, {useEffect, useState, forwardRef} from "react";
import "./AudioController.css";
import {FaPlay} from "react-icons/fa";
import {GiPauseButton} from "react-icons/gi";
import {FaBackward} from "react-icons/fa6";
import {FaForward} from "react-icons/fa";

const AudioController = forwardRef(({currentTrack,setAudioSrc, liveStatus, files}, ref) => {
  const [fileUrl, setFileUrl] = useState();

  const stopAudio = () => {
    ref?.current?.pause();
  };

  const startAudio = () => {
    files?.length && ref?.current?.play();
  };

  /* The `useEffect` hook  provided is responsible for creating a URL for the current audio track
  source and setting it in the component's state variable `fileUrl`. Here's a breakdown of what it
  does: */
  useEffect(() => {
    if (currentTrack?.src) {
      const url = URL.createObjectURL(currentTrack?.src);

      setFileUrl(url);
    }

    let aduio = ref.current;
    aduio.onended = function () {
      setAudioSrc(currentTrack.index + 1);
    };
  }, [currentTrack]);

  /* The `useEffect` hook  provided is responsible for triggering a side effect when the `fileUrl`
  state variable changes. Here's a breakdown of what it does: */
  useEffect(() => {
    files?.length > 1 && startAudio();
  }, [fileUrl]);

  /* This `useEffect` hook is responsible for checking the length of the `files` array. If the length
  of the `files` array is zero (meaning there are no files present), it will call the `stopAudio`
  function. */
  useEffect(() => {
    !files.length && stopAudio();
  }, [files]);

  return (
    <div className="width_100 height_100" id="audio_player">
      <audio ref={ref} src={fileUrl} type="audio/mpeg"></audio>

      <div className="vis_gif"></div>

      <div className="audio_controlls">
        <FaBackward />
        {liveStatus?.isPlaying ? <GiPauseButton onClick={stopAudio} /> : <FaPlay onClick={startAudio} />}
        <FaForward />
      </div>
    </div>
  );
});

export default AudioController;

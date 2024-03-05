import React, {useContext, useEffect, useRef, useState} from "react";
import "./MusicTrackHandler.css";
import {audioFunctionsContext} from "../../App";


const AudioTrack = React.forwardRef(({activeStatus, currentTrack, index, liveStatus, file}, ref) => {
  const audioTrackTimer = useRef();
  const audioTrackLineRef = useRef();
  const trackRef = useRef();
  const audioPlayerRef = ref["audioPlayerRef"];
  const [cords, setCoords] = React.useState();
  const [timelineTracker, setTimelineTracker] = React.useState({xValue: 0, xPercent: 0});
  const {setAudioSrc} = useContext(audioFunctionsContext);


  /**
   * The onMouseMove function calculates the horizontal position of the mouse relative to a specific
   * element and updates the state with the calculated values.
   */
  const onMouseMove = ({nativeEvent}) => {
    const {clientX} = nativeEvent;
    let clientRect = audioTrackLineRef.current.getBoundingClientRect();
    let x = clientX - clientRect.left;
    let xPercent = ((x * 100) / clientRect.width).toFixed(0);
    x < clientRect.width && setCoords({xValue: x, xPercent: xPercent});
  };

  /**
   * The function `updateAudioTimeline` updates the audio player's timeline based on the current status
   * and coordinates.
   */
  const updateAudioTimeline = () => {
    if (activeStatus) {
      audioPlayerRef.current.currentTime = ((audioPlayerRef.current.duration * cords.xPercent) / 100).toFixed(0);
      setTimelineTracker({xValue: cords.x, xPercent: cords.xPercent});
      audioPlayerRef.current.play();
    } else {
      setTimelineTracker({xValue: cords.xValue, xPercent: cords.xPercent, skipTimeline: true});
      setAudioSrc(index);
    }
  };

  /* The `useEffect` hook in the provided code snippet is responsible for managing side effects in the
  AudioTrack component based on changes to the `activeStatus` and `liveStatus` dependencies. */
  useEffect(() => {
    let clientRect = audioTrackLineRef.current.getBoundingClientRect();
   /* This block of code is responsible for updating the audio player's timeline based on certain
   conditions. Here's a breakdown of what it does: */
    if (activeStatus && liveStatus?.isPlaying && audioPlayerRef.current) {
      console.log("cords", cords);
      if (timelineTracker?.skipTimeline) {
        setTimeout(() => {
          audioPlayerRef.current.currentTime = ((audioPlayerRef.current.duration * cords.xPercent) / 100).toFixed(0);
        }, 500);
      } else {
        setTimelineTracker({xValue: 0, xPercent: 0});
      }
      audioTrackTimer.current = setInterval(() => {
        let percentage = ((audioPlayerRef.current.currentTime * 100) / audioPlayerRef.current.duration).toFixed(0);
        let x = ((percentage * clientRect.width) / 100).toFixed(0);
        setTimelineTracker({xValue: x, xPercent: percentage});
        if (percentage > 100) {
          clearInterval(audioTrackTimer.current);
        }
      }, 500);
    } else {
      clearInterval(audioTrackTimer.current);
    }

    return () => {
      clearInterval(audioTrackTimer.current);
    };
  }, [activeStatus, liveStatus]);
  return (
    <div className="audioTrack" style={{width: file?.size / 15000 + "px" || "100px"}} onClick={updateAudioTimeline} ref={audioTrackLineRef} onMouseMove={onMouseMove} onMouseLeave={() => setCoords(null)}>
      {activeStatus && <div style={{left: `${timelineTracker.xValue}px`}} ref={trackRef} className="track_timeliner"></div>}

      {cords && <div style={{left: `${cords.xValue}px`}} ref={trackRef} className="track_follower"></div>}
      <div className="track_timeliner_tag">{file.name}</div>
    </div>
  );
});

export default AudioTrack;

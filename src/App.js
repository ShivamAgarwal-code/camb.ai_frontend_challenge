import React, {useEffect, useRef, useState} from "react";
import FileHandler from "./Components/FileMusicHandler/FileMusicHandler";
import AudioController from "./Components/AudioController/AudioController";
import TrackHandler from "./Components/MusicTrackHandler/MusicTrackHandler";
import {MdLibraryMusic} from "react-icons/md";
import {MdPhotoSizeSelectActual} from "react-icons/md";
import {TbCalendarStar} from "react-icons/tb";

export const audioFunctionsContext = React.createContext();

const App = () => {
  const [files, setFiles] = useState([]);
  const audioPlayerRef = useRef();
  const [currentTrack, setCurrentTrack] = useState();
  const [liveStatus, setLiveStatus] = useState();

  /**
   * The function `setAudioSrc` sets the audio source based on the provided index or defaults to the
   * first file in the array.
   * @param [index=null] - The `index` parameter in the `setAudioSrc` function is used to specify the
   * index of the audio file in the `files` array that you want to set as the current track. If no
   * index is provided (or if it is `null`), the function will default to setting the
   */

  
  const setAudioSrc = (index = null) => {
    if (index == null) {
      setCurrentTrack({src: files[0], index: 0});
    } else if (Number.isInteger(index) && index >= 0 && index < files.length) {
      setCurrentTrack({src: files[index], index});
    }
  };

  /* The `useEffect(() => { files.length && setAudioSrc(); }, [files]);` hook in the React component is
  responsible for setting the audio source when the `files` state changes. */
  useEffect(() => {
    files.length && setAudioSrc();
  }, [files]);

  /* The `useEffect` hook  provided is setting up event listeners for the `onplay` and `onpause`
  events of the audio player referenced by `audioPlayerRef`. */
  useEffect(() => {
    audioPlayerRef.current.onplay = () => {
      setLiveStatus({isPlaying: true});
    };
    audioPlayerRef.current.onpause = function () {
      setLiveStatus({isPlaying: false});
    };
  }, []);

  return (
    <div className="parent_div">
      <header className="home_header display_flex content_center align_center">
        <p>Camb.ai Audio Pill Player</p>
      </header>
      <div className="content_div">
        <div className="left_content_div">
          <div className="left_content_menubar display_flex content_center">
            <div>My media</div>
            <div>Audio & Video</div>
            <div>Titles</div>
            <div>Backgrounds</div>
            <div>Transitions</div>
          </div>
          <div className="display_flex height_100">
            <div className="left_content_sidemenubar">
              <p>PROJECT MEDIA</p>
              <ul>
                <li>
                  <MdLibraryMusic />
                  Project Media
                </li>
              </ul>

              <p>LIBRARIES</p>
              <ul>
                <li>
                  <MdPhotoSizeSelectActual />
                  Photos
                </li>
                <li>
                  <TbCalendarStar />
                  All Events
                </li>
              </ul>
            </div>
            <div className="right_content">
              <div className="width_100 height_100">
                <FileHandler files={files} setFiles={setFiles} />
              </div>
            </div>
          </div>
        </div>

        <div className="right_content_div">
          <AudioController liveStatus={liveStatus} files={files} setAudioSrc={setAudioSrc} currentTrack={currentTrack} ref={audioPlayerRef} />
        </div>
      </div>
      <div className="trackline_parent_div">
        <audioFunctionsContext.Provider value={{setAudioSrc}}>
          <TrackHandler liveStatus={liveStatus} ref={{audioPlayerRef: audioPlayerRef}} files={files} currentTrack={currentTrack} />
        </audioFunctionsContext.Provider>
      </div>
    </div>
  );
};

export default App;

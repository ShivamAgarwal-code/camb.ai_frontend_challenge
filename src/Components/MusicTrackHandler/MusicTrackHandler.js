import React, {useEffect, useState} from "react";
import AudioTrack from "./AudioTrack";
import "./MusicTrackHandler.css";

const TrackHandler = React.forwardRef(({files, currentTrack, liveStatus}, ref) => {
  return (
    <div className="trackLine">
      {files.map((file, i) => {
        if (i === currentTrack?.index) {
          return <AudioTrack file={file} liveStatus={liveStatus} ref={ref} index={i} currentTrack={currentTrack} activeStatus={true} />;
        } else {
          return <AudioTrack file={file} liveStatus={liveStatus} ref={ref} index={i} currentTrack={currentTrack} activeStatus={false} />;
        }
      })}
    </div>
  );
});

export default TrackHandler;

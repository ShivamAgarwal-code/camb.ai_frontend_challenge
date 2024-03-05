import React, {useEffect, useState} from "react";
import dragula from "dragula";
import {CiImport} from "react-icons/ci";
import {IoCalendar} from "react-icons/io5";
import {GrSettingsOption} from "react-icons/gr";
import {PiDotsNine} from "react-icons/pi";
import {MdOutlineDeleteOutline} from "react-icons/md";
import "./FileMusicHandler.css";
const FileHandler = ({files, setFiles}) => {
  const [resizeTrack, setResizeTrack] = useState([]);

  const handleUploadFile = (event) => {
    if (event?.target?.files?.length) {
      let data = [...files];
      data.push(event.target.files[0]);
      setFiles(data);
    }
  };

  const deleteFile = (index) => {
    let data = [...files];
    data.splice(index, 1);
    setFiles(data);
  };

  /* This `useEffect` hook is setting up a drag-and-drop functionality using the `dragula` library.
  Here's a breakdown of what it's doing: */
  useEffect(() => {
    var drake = dragula([document.querySelector("#dragula")], {mirrorContainer: document.querySelector("#drop-target")});
    drake.on("drop", (el, target, source, sibling) => {
      let childNodes = document.getElementById("dragula").childNodes;
      let updatedArray = [];
      childNodes.forEach((el) => {
        updatedArray.push(el.id);
      });
      /* `setResizeTrack(updatedArray);` is updating the state variable `resizeTrack` with the new array
`updatedArray`. This is being done inside the `dragula` library's `drop` event handler, where the
order of the files is being updated based on the drag-and-drop action. The `resizeTrack` state is
used to keep track of the updated order of files after they have been rearranged through
drag-and-drop. */
      setResizeTrack(updatedArray);
    });
  }, []);

  /* This `useEffect` hook is monitoring the `resizeTrack` state variable for changes. When
  `resizeTrack` changes (i.e., when the order of files is updated through drag-and-drop), this
  effect is triggered. */
  useEffect(() => {
    if (resizeTrack.length) {
      let updatedArray = [];
      resizeTrack.forEach((index) => {
        updatedArray.push(files[index]);
      });
      console.log(updatedArray);
      setFiles(updatedArray);
    }
  }, [resizeTrack]);
  return (
    <div className="audioFileController">
      <div className="right_content_menubar display_flex space_btw align_center">
        <div className="display_flex">
          <div>
            <IoCalendar />
          </div>
          <div>
            &nbsp;&nbsp;
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        {files?.length > 0 && (
          <div>
            <label className="audioFileInputLabelButton" for="audioFileInput">
              <CiImport />
              <span>&nbsp;&nbsp;Import Audio</span>
            </label>
          </div>
        )}

        <div>
          <GrSettingsOption />
        </div>
      </div>
      {!files?.length && (
        <div className="upload_file_initial_div">
          <label className="audioFileInputLabel" for="audioFileInput">
            <CiImport />
            <p>Import Audio</p>
          </label>
        </div>
      )}
      <input onChange={handleUploadFile} type="file" id="audioFileInput" accept=".mp3,audio/*" />

      <div>
        <div>
          <div className="fileList">
            <div id="dragula">
              {files.map((file, i) => {
                return (
                  <div key={file.name + "_" + i} id={i} className="audioFileCard">
                    <div>
                      <PiDotsNine /> <span>{file.name.split("").splice(0, 60)}</span>
                    </div>
                    <div>
                      <MdOutlineDeleteOutline className="deleteFile" onClick={() => deleteFile(i)} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div id="drop-target"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileHandler;

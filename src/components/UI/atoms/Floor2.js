import React, { useEffect } from "react";
import floor2Plan from "../media/2floor-final.png";
import "../../../main.css";
import Tooltip from "@material-ui/core/Tooltip";
import { fetchRooms, roomsSelector } from "../../../store/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { green, orange, pink, blue } from '@material-ui/core/colors';


function Floor2(props) {

  const title = "Click on me to see all sensors"

  const roomsData = useSelector(roomsSelector);
  console.log(roomsData, "roomsData");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, []);

  const colorPick = (sensorType) => {
    switch (sensorType) {
        case 'temperatureSensor': return orange[500];
        case 'carbonDioxideSensor': return green[500];
        case 'humiditySensor': return pink[500];
        default: return blue[500];
    }
}
// const onRoomSelect = props.roomSelect;
  const getRoomName = (e) => {
    e = e.target || e.srcElement;
    let roomName = e.id;
    props.onRoomSelect(roomName);
    return roomName;
  }

  return (
    <div>
      <h1>Floor 2</h1>
      <div class="map">
        <svg viewBox="0 0 1024 615">
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_1"
                class="part"
                d="m 264.27376,130.43346 0.4867,180.31939 96.60836,-0.73004 0.24335,7.30038 34.79848,-0.24334 v -6.81369 h 103.90874 l -0.24334,-15.3308 15.40748,-0.21971 v 15.78757 l 149.33776,-0.9671 0.24335,7.54373 34.79848,0.48669 0.24334,-7.30038 49.88594,0.24335 0.24334,-179.58936 H 515.65019 l 0.24335,15.3308 h -16.30419 l 0.24335,-15.3308 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_2"
                class="part"
                d="m 765.5466,135.93657 -0.17207,166.22118 19.78824,-0.34414 -0.34415,5.67836 h 33.89811 l -0.34414,-5.67836 188.76251,-0.51622 0.1721,-166.0491 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_3"
                class="part"
                d="m 765.37453,308.00819 -0.17207,17.5513 -14.79816,0.17207 v 68.82865 h 15.1423 l -0.17207,24.43417 241.41647,0.34414 0.1721,-112.01862 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_4"
                class="part"
                d="m 785.16277,419.85473 -0.17207,7.05494 -19.61617,-0.17207 -0.34414,158.8221 242.44891,-0.17207 -0.6883,-159.51039 -188.07427,0.34414 v -7.05493 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_5"
                class="part"
                d="m 706.31179,402.12928 0.12167,7.90874 44.28897,-0.48669 -0.60836,176.06084 -121.79468,-0.36502 0.85171,-117.90114 -7.1787,0.24334 0.24334,-34.19011 7.30038,0.12167 -0.12167,-24.21292 H 672 v -7.17871 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_6"
                class="part"
                d="m 515.18241,409.18629 v 175.85719 l 107.37268,-0.68828 0.34415,-175.51305 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_7"
                class="part"
                d="m 264.302,406.43315 0.68828,179.9869 234.70568,-1.03242 -0.34414,-178.95448 -98.76911,0.34414 -0.34414,-4.818 -33.72604,0.34414 v 4.47386 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_8"
                class="part"
                d="m 750.53336,316.65479 -0.30113,85.82071 -550.67218,-0.0108 0.0445,-84.83737 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_9"
                class="part"
                d="m 17.277567,406.26616 0.243346,179.34601 h 8.273764 l -0.243346,4.86692 87.969579,-0.12167 v -4.62358 l 32.24335,0.24335 -0.12167,2.92015 h 93.44486 v -3.28517 h 11.31559 V 406.08365 h -56.69962 v -3.52852 l -33.20362,-0.12265 v 4.12972 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_10"
                class="part"
                d="m 17.551304,402.4755 123.891566,0.17207 -0.34415,-28.56388 4.64594,-0.17208 -0.17208,-29.94046 h -4.64593 V 317.6442 l -123.719489,0.17207 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_11"
                class="part"
                d="m 145.91673,402.13136 h 49.72869 v -25.98282 h 3.95765 l -0.17207,-30.62874 -3.78558,0.17207 -0.68828,-107.20062 h -49.38456 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_12"
                class="part"
                d="m 200.03325,237.97504 -0.086,74.50701 7.14098,-0.17207 -0.086,5.24818 h 31.231 v -4.99008 l 11.7869,0.086 -0.2581,-74.67908 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_13"
                class="part"
                d="m 58.159696,238.72243 0.486692,73.4905 44.045632,0.24334 -0.24335,4.38023 31.39163,0.24335 0.24335,-4.62358 7.54373,-0.24334 -0.24335,-74.22053 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_14"
                class="part"
                d="m 17.764259,237.9924 36.745247,0.48669 -0.730038,74.95057 -2.43346,-0.24335 0.243346,4.62358 -30.661597,0.48669 0.243346,-6.327 h -4.380228 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_15"
                class="part"
                d="m 110.47909,134.08365 140.1673,-0.73004 0.24334,100.5019 -63.5133,-0.24334 0.24334,5.11026 -31.14829,-0.48669 -0.73003,-5.35361 -45.74905,0.48669 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_16"
                class="part"
                d="m 17.277567,234.58555 92.714833,-1.21673 0.48669,-37.96198 -93.688215,-0.24334 z"
              />
            </a>
          </Tooltip>
          <Tooltip title={title}>
            <a>
              <path
                onClick={getRoomName}
                id="POIC_2_17"
                class="part"
                d="m 17.764259,135.05703 88.091251,-0.73003 0.24335,19.71102 4.86692,-0.24334 -0.12167,28.10646 h -4.74525 l 0.36502,10.58555 -88.942967,-0.36502 z"
              />
            </a>
          </Tooltip>
        </svg>
        <img src={floor2Plan} alt="" />
      </div>
    </div>
  );
}

export default Floor2;

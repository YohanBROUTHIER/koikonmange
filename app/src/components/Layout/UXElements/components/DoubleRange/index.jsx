import "./styles.css";
import AlarmTime from "../../icons/AlarmTime";
import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function DoubleInputRange({label, name}) {
  //Time Range Selection methods/state/constants
  const curTime = new Date();
  // const timeMax = 24 * 60 * 60 - 1;
  const timeMax = 6 * 60 * 60 - 1;
  const curMin =  0;
  const [minTimeCaption, set_minTimeCaption] = useState("");
  const [maxTimeCaption, set_maxTimeCaption] = useState("");
  const handleTimeChange = (e) => {
    let h = Math.floor(e.minValue / 3600);
  let m = Math.floor((e.minValue % 3600) / 60);
  let s = e.minValue % 60;
  let minH = h.toString().padStart(2, "0");
  let minM = m.toString().padStart(2, "0");
  let minS = s.toString().padStart(2, "0");
  set_minTimeCaption(minH + ":" + minM + ":" + minS);

  let hh = Math.floor(e.maxValue / 3600);
  let mm = Math.floor((e.maxValue % 3600) / 60);
  let ss = e.maxValue % 60;
  let maxH = hh.toString().padStart(2, "0");
  let maxM = mm.toString().padStart(2, "0");
  let maxS = ss.toString().padStart(2, "0");
  set_maxTimeCaption(maxH + ":" + maxM + ":" + maxS);
  };
  const getTimeLabels = () => {
    let arr = [];
    for (let i = 0; i <= 12; i++) {
      arr.push(i.toString().padStart(2, "0") + ":00");
    }
    return arr;
  };
  return (
    <div className="App">
      <div className="multi-range-slider-container">
        <MultiRangeSlider className="multiRangeSlider"
          labels={getTimeLabels()}
          min={0}
          max={timeMax}
          minValue={curMin}
          maxValue={timeMax}
          step={1}
          subSteps={true}
          minCaption={minTimeCaption}
          maxCaption={maxTimeCaption}
          onInput={handleTimeChange}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px", height:"0.2rem"}}
          ruler='false'
          label = 'false'
          barLeftColor="var(--colorOrangeDark)"
          barInnerColor="var(--colorOrangeRange)"
          barRightColor="var(--colorOrangeDark)"
          thumbLeftColor="var(--colorOrangeRange)"
          thumbRightColor="var(--colorOrangeRange)"
        />
      <div className="divOutput">

        <label htmlFor="" >{label}</label>
          <div className="divOutputContainer">
            <span>
              {minTimeCaption}
              <input type="hidden" name={`${name}min`} value={minTimeCaption}/>
            </span>
            <AlarmTime />
            <span>
              {maxTimeCaption}
              <input type="hidden" name={`${name}max`} value={maxTimeCaption}/>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

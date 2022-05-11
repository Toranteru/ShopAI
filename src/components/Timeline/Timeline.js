import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Timeline.css';

export default function Timeline() {
  const dispatch = useDispatch();
  const { prompt, response } = useSelector(state => state.promptSlice);
  const [timeline, setTimeline] = useState(JSON.parse(window.localStorage.getItem('Timeline')) || []);

  useEffect(() => {
    if (!response) return;
    
    setTimeline([...timeline, { prompt, response }]);
    // eslint-disable-next-line
  }, [response])

  useEffect(() => {
    window.localStorage.setItem("Timeline", JSON.stringify(timeline));
    dispatch({ type: 'CLEAR_RESPONSE' });
    let eventArea = document.getElementById('event-area');

    if (!eventArea) return;
    // When the timeline is updated, ensure the scrollbar remains at the top.
    eventArea.scrollTop = -eventArea.scrollHeight;
    // eslint-disable-next-line
  }, [timeline])

  return (
    <div className='flex column timeline-area shadow'>
      <h2 className='title'>Timeline</h2>
      <div id='event-area' className='flex reverse'>
        {timeline.length > 0 ? timeline.map((event, index) => (
          <div key={index} index={index} className='event-container'>
            <p className='event-subtitle'><b>&gt; Prompt:</b>   {event.prompt}</p>
            <p className='event-subtitle'><b>&gt; Response:</b> {event.response}</p>
            <i className='event-delete fa-solid fa-trash fa-width' onClick={() => {
              setTimeline([...timeline].filter((el, i) => i !== index));
            }}></i>
          </div>
        )) : <p className='subtitle'>There are currently no prompts stored in the timeline!</p>}
      </div>
    </div>
  )
}

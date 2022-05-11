import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Prompt.css';

export default function Prompt() {
  const dispatch = useDispatch();
  const { prompt, engine, temperature } = useSelector(state => state.promptSlice);

  function renderOptions(options) {
    let items = options.map((optionKey) => <option key={optionKey} value={optionKey}>{optionKey}</option>);
    return items;
  }

  return (
    <div className='flex center container'>
      <div className='flex column prompt-area shadow'>
        <h2 className='title'>Fun with AI</h2>
        <p className='subtitle'>You'll be able to configure different responses as you modify the prompt, engine and temperature!</p>
        <div className='flex row center options-container'>
          <p className='subtitle'>Engine:</p>
          <select 
            id='engine' name='engine' className='engine-dropdown' 
            onChange={(e) => dispatch({ type: 'UPDATE_ENGINE', payload: e.target.value })}
          >
            {renderOptions(['text-curie-001', 'text-babbage-001', 'text-ada-001'])}
          </select>
        </div>
        <div className='flex row center options-container'>
          <p className='subtitle'>Temperature:</p>
          <input 
            type='range' min={0} max={1} step={0.01} defaultValue={0.5}
            onChange={(e) => dispatch({ type: 'UPDATE_TEMPERATURE', payload: Number(e.target.value) })}>
          </input>
          <p className='subtitle temperature-container'>{temperature}</p>
        </div>
        <textarea 
          id='user-prompt'
          placeholder='Enter a prompt here!'
          onBlur={(e) => dispatch({ type: 'UPDATE_PROMPT', payload: e.target.value })}
        ></textarea>

        <button className='submit' onClick={() => {
          if (!prompt) {
            alert('Please enter a prompt!');
            return;
          }

          const data = {
            prompt,
            temperature,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          };
            
          fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => dispatch({ type: 'SUBMIT_PROMPT', payload: data.choices[0].text.trim().replace(/\.$/, "") }));
        }}>Submit</button>
      </div>
    </div>
  )
}

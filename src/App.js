import Prompt from './components/Prompt/Prompt';
import Timeline from './components/Timeline/Timeline';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='flex center container wrapper'>
        <Timeline />
        <Prompt />
      </div>
    </div>
  );
}

export default App;

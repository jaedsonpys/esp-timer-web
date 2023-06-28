import Switch from 'react-switch';
import { useState } from 'react';

import './App.css';

function App() {
    const [relayChecked, setRelayChecked] = useState(false);
    const [timerChecked, setTimerChecked] = useState(false);
    
    return (
        <div className='controllerBox'>
            <h1>ESPTimer</h1>
            <div className='switch relayControl'>
                <label htmlFor="controlSwitch">Ligar/Desligar</label>
                <Switch
                    onChange={checked => setRelayChecked(checked)}
                    checked={relayChecked}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    id='controlSwitch'
                />
            </div>
            <div className="timerControlArea">
                <div className='switch timerControl'>
                    <label htmlFor="timerControlSwitch">Temporizador</label>
                    <Switch
                        onChange={checked => setTimerChecked(checked)}
                        checked={timerChecked}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        id='timerControlSwitch'
                    />
                </div>
                <div className="timerArea">
                    <div className='timerSelectorForm min'>
                        <label htmlFor="minTimer">De</label>
                        <div id="minTimer">
                            <input type="time" id="startHourSelector"/>
                        </div>
                    </div>
                    <div className='timerSelectorForm max'>
                        <label htmlFor="maxTimer">Até</label>
                        <div id='maxTimer'>
                            <input type="time" id="endHourSelector"/>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

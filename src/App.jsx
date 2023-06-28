import Switch from 'react-switch';
import { useState } from 'react';

function App() {
    const [checked, setChecked] = useState(false);
    
    return (
        <div className='controllerBox'>
            <h1>ESPTimer</h1>
            <hr/>
            <div className='relayControl'>
                <label htmlFor="controlSwitch">Ligar/Desligar</label>
                <Switch
                    onChange={checked => setChecked(checked)}
                    checked={checked}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    id='controlSwitch'
                />
            </div>
            <div className='timerArea'>
                <div className='timerControl'>
                    <label htmlFor="timerControlSwitch">Temporizador</label>
                    <Switch
                        onChange={checked => setChecked(checked)}
                        checked={checked}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        id='timerControlSwitch'
                    />
                </div>
                <div className="timerSelectorArea">
                    <div className='timerSelectorForm'>
                        <label htmlFor="minTimer">Liga às</label>
                        <div id="minTimer">
                            <input type="number" min={0} max={23} id="hourSelector" placeholder='Hora'/>
                            <input type="number" min={0} max={59} id="minuteSelector" placeholder='Minutos'/>
                        </div>
                    </div>
                    <div className='timerSelectorForm'>
                        <label htmlFor="maxTimer">Desliga às</label>
                        <div id='maxTimer'>
                            <input type="number" min={0} max={23} id="hourSelector" placeholder='Hora'/>
                            <input type="number" min={0} max={59} id="minuteSelector" placeholder='Minutos'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

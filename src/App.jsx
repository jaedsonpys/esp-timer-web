import Switch from 'react-switch';
import { useState } from 'react';

function App() {
    const [checked, setChecked] = useState(false);
    
    return (
        <>
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
        </>
    );
}

export default App;

import Switch from 'react-switch';
import { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';

function App() {
    const [relayChecked, setRelayChecked] = useState(false);
    const [timerChecked, setTimerChecked] = useState(false);
    const [startInput, setStartInput] = useState('00:00');
    const [endInput, setEndInput] = useState('00:00');

    const [startHours, setStartHours] = useState(22);
    const [startMinutes, setStartMinutes] = useState(0);
    const [endHours, setEndHours] = useState(6);
    const [endMinutes, setEndMinutes] = useState(6);

    useEffect(() => {
        const updateRelayStatus = () => {
            api
                .get('/device')
                .then((response) => {
                    const data = response.data;
                    if(data.status === 'on') {
                        setRelayChecked(true);
                    } else {
                        setRelayChecked(false);
                    }
                })
        }

        const updateLastTimer = () => {
            api
                .get('/config')
                .then((response) => {
                    const data = response.data;
                    var [sHour, sMinute] = data.start.split(':');
                    var [eHour, eMinute] = data.end.split(':');

                    if(sHour.length === 1) {
                        sHour = '0' + sHour;
                    }
                    
                    if(sMinute.length === 1) {
                        sMinute = '0' + sMinute;
                    }

                    if(eHour.length === 1) {
                        eHour = '0' + eHour;
                    }
                    
                    if(eMinute.length === 1) {
                        eMinute = '0' + eMinute;
                    }

                    setStartInput(`${sHour}:${sMinute}`);
                    setEndInput(`${eHour}:${eMinute}`);
                })
        }

        const updateTimerStatus = () => {
            api
                .get('/status')
                .then((response) => {
                    const data = response.data;
                    if(data.status == "on") {
                        setTimerChecked(true);
                    } else {
                        setTimerChecked(false);
                    }
                })
        }

        updateTimerStatus();
        updateLastTimer();
        updateRelayStatus();
    }, [])

    const getInputTimeValue = (e) => {
        const inputID = e.target.id;
        const inputValue = e.target.value;

        const [hours, minutes] = inputValue.split(':');

        if(inputID === 'startHourSelector') {
            setStartHours(parseInt(hours));
            setStartMinutes(parseInt(minutes));
            setStartInput(inputValue);
        } else {
            setEndHours(parseInt(hours));
            setEndMinutes(parseInt(minutes));
            setEndInput(inputValue);
        }
    }

    const controlRelay = (checked) => {
        setRelayChecked(checked);
        api.post('/device', null, {params: {'status': relayChecked ? 'off' : 'on'}})
    }

    const setTimerStatus = (checked) => {
        setTimerChecked(checked);
        api.post('/status', null, {params: {'status': timerChecked ? 'off': 'on'}})
    }

    const setTimer = () => {
        const params = {
            sh: startHours,
            sm: startMinutes,
            eh: endHours,
            em: endMinutes,
        }

        api.post('/config', null, {params});
        alert('Temporizador definido!');
    }

    return (
        <div className='controllerBox'>
            <h1>ESPTimer</h1>
            <div className='switch relayControl'>
                <label htmlFor="controlSwitch">Ligar/Desligar</label>
                <Switch
                    onChange={checked => controlRelay(checked)}
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
                        onChange={checked => setTimerStatus(checked)}
                        checked={timerChecked}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        id='timerControlSwitch'
                    />
                </div>
                <div className="timerForm" style={!timerChecked ? {opacity: '25%'} : null}>
                    <div className="timerArea">
                        <div className='timerSelectorForm min'>
                            <label htmlFor="minTimer">De</label>
                            <div id="minTimer">
                                <input type="time" id="startHourSelector" value={startInput} onChange={getInputTimeValue}/>
                            </div>
                        </div>
                        <div className='timerSelectorForm max'>
                            <label htmlFor="maxTimer">Até</label>
                            <div id='maxTimer'>
                                <input type="time" id="endHourSelector" value={endInput} onChange={getInputTimeValue}/>
                            </div>
                        </div>
                    </div>
                    <div className="buttonBox">
                        <button type="button" className='updateButton' onClick={setTimer}>Atualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

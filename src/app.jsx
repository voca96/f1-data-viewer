import {useState, useEffect } from 'react'
import './style.scss'

const API_BASE_URL = 'https://api.openf1.org/v1'

// Endpoint: Brings all the sessions/race of a year
// https://api.openf1.org/v1/sessions?session_name=Race&year=2024

// Endpoint: Bring all the drivers per session/race
// https://api.openf1.org/v1/drivers?session_key=9472

// Endpint: Bring all the position based in time for specific session/race
// https://api.openf1.org/v1/position?session_key=9472

// const TEAM_COLOR = {
//     'ferrari': 'rgb(255, 0, 0)'
// }

const App = () => {
    const [raceSession, setRaceSession] = useState([])
    const [drivers, setDrivers] = useState([])

    // NESTED PROMISES ...
    useEffect(()=>{
        fetch(`${API_BASE_URL}/sessions?session_name=Race&year=2024`).then(res => {
            return res.json()
        }).then(data => {
            const session = data.map(s => s.session_key)
            setRaceSession(session)
            // fetch(`${API_BASE_URL}/drivers?driver_number=20&session_key=9158`).then(res => {
            fetch(`${API_BASE_URL}/drivers?session_key=${raceSession[0]}`).then(res => {
                return res.json()
            }).then(data => {
                setDrivers(data)
                console.log(data)
            })
        })
    },[])

    return (
        <main>
            {drivers.length !== 0 && <>
                {drivers.map((driver) => {
                    return(
                        <div key={driver.driver_number} className='driver-card glass-effect' style={{
                                // background: `radial-gradient(100.44% 215.01% at 0% 0%, ${TEAM_COLOR[driver.team_name.toLowerCase()] || 'dark-yellow'}, rgb(255, 255, 255))`
                                background: `radial-gradient(100.44% 215.01% at 0% 0%, #${driver.team_colour}, rgb(255, 255, 255))`
                            }}>
                                <div>
                                    <h1>{driver.full_name}</h1>
                                    <h2>{driver.team_name}</h2>
                                </div>
                                <img src={`${driver.headshot_url.split('png').splice(0, 2).join('png')}png`} alt={`pilot of ${driver.team_name}: ${driver.full_name}`} />
                        </div>
                    )
                })}
            </>}
        </main>
    )
}

export default App
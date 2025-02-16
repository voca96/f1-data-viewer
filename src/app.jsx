import {useState, useEffect } from 'react'
import './style.css'

const App = () => {

    const [driver, setDriver] = useState()

    useEffect(()=>{
        fetch('https://api.openf1.org/v1/drivers?driver_number=16&session_key=9158').then(res => {
            return res.json()
        }).then(data => {
            setDriver(data[0])
            console.log(data)
        })
    },[])

    return (
        <main>
            <div className='driver-card glass-effect'>
                {driver && <>
                    <div>
                        <h1>{driver.full_name}</h1>
                        <h2>{driver.team_name}</h2>
                    </div>
                    <img src={`${driver.headshot_url.split('png')[0]}png`} alt="driver image" />
                </>}
            </div>
        </main>
    )
}

export default App
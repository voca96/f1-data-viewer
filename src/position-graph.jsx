import { useEffect, useState } from "react";

// Endpint: Bring all the position based in time for specific session/race
// https://api.openf1.org/v1/position?session_key=9472

// Endpoint to get all the laps that a pilot do
// https://api.openf1.org/v1/laps?session_key=9472

const PositionGraph = () => {
    
    useEffect(() => {
        let positionByPilot = {}
        let lapPilotStartTime = {}
        let positionLapData = {}
        fetch("https://api.openf1.org/v1/position?session_key=9472").then(res => res.json()).then(data=> { 
            data.forEach(({driver_number, position, date}) => {
                // console.log(driver_number, position)
                positionByPilot[driver_number] = [...positionByPilot[driver_number] || [], {position, positionGained: date}]
            })
            fetch("https://api.openf1.org/v1/laps?session_key=9472").then(res => res.json()).then(data=> {
                data.forEach(({driver_number, date_start}) => {
                    lapPilotStartTime[driver_number] = [...lapPilotStartTime[driver_number] || [], date_start]
                    positionLapData[driver_number] = []
                })
                // Position
                // lap
                let a = []
                console.log(positionByPilot)
                console.log(lapPilotStartTime)
                positionByPilot["2"].forEach(position => {
                    console.log('a')
                    lapPilotStartTime["2"].forEach((time, i) => {
                        console.log(new Date(position.positionGained) > new Date(time))
                        if(new Date(position.positionGained) > new Date(time)){
                            a = [...a, {
                                position: position.position,
                                lap: i+1
                            }]
                            return 
                        }
                        else {a = [...a, {
                            position: position.position,
                            lap: i+1
                        }]}
                    })
                })
                // console.log(a)
            })

        })
    },[])
    
    return(<></>)
}

export default PositionGraph
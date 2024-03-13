import React, { useEffect } from 'react'
import Card from 'screens/components/global/card'
import './disasterdetails.css'
import { useParams } from 'react-router-dom'
import { disasterdata } from 'types/interfaces'
import Disaster from '../disasters'
type Props = {
    data: disasterdata | undefined
}

export const Details = (props: Props) => {

    const [newData, setNewData] = React.useState<disasterdata>()

    useEffect(() => {
        const newData = props.data
        setNewData(newData)
    },[props.data])

  return (
    <div className='card-details'>
    	<div className='card-details-wrapper'>
            <h1>Disaster Record</h1>
            <span><h3>Name:</h3> <p>{newData?.disaster}</p></span>
            <span><h3>Evacuees:</h3><p>{newData?.evacuees}</p></span>
            <span><h3>Agriculture Damage: </h3><p>{newData?.agri}</p></span>
            <span><h3>Infrastructure Damage: </h3><p>{newData?.infra}</p></span>
            <span><h3>Livestock Damage: </h3><p>{newData?.livestock}</p></span>
            <span><h3>Date of Record: </h3><p>{newData?.date}</p></span>
            <span><h3>Respond: </h3><p>{newData?.response}</p></span>
        </div>
    </div>
  )
}
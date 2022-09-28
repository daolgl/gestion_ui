import React, { useContext, useEffect, useState } from 'react'
import { SpinnerLoad } from '../../components/atoms/SpinnerLoad/SpinnerLoad'
import { HomeContainer } from '../../components/templates/HomeContainer/HomeContainer'
import UserTarea from '../../contexts/UserContext/UserTarea'
import { Tarea } from '../Tarea/Tarea'
import { TareaEdit } from '../Tarea/TareaEdit'

export const Home = () => {
    const [load, setLoad] = useState(true)
    const tarea = useContext(UserTarea)

    useEffect(() => {
      setTimeout(() => {
        setLoad(false)
      }, 3000);
    }, [])
    
    return (
        <>
          {
              load ? <SpinnerLoad />
              : tarea.tarea ? <Tarea /> : tarea.tareaEdit.tarea ? <TareaEdit /> : <HomeContainer />
          }   
        </>
    )
}

import React, { useContext } from 'react'
import { HomeContainer } from '../../components/templates/HomeContainer/HomeContainer'
import UserTarea from '../../contexts/UserContext/UserTarea'
import { Tarea } from '../Tarea/Tarea'
import { TareaEdit } from '../Tarea/TareaEdit'

export const Home = () => {
    const tarea = useContext(UserTarea)
    // console.log(user)
    return (
        <>
            {tarea.tarea ? <Tarea /> : tarea.tareaEdit.tarea ? <TareaEdit /> : <HomeContainer />}            
        </>
    )
}

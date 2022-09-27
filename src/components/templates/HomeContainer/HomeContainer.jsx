import React from 'react'
import { useApi } from '../../../hooks/useApi/useApi'
import { HomeForm } from '../../molecules/HomeForm/HomeForm'
import { NavBar } from '../../organisms/NavBar/NavBar'
import { TareasList } from '../../organisms/TareasList/TareasList'

export const HomeContainer = () => {
  const tareas = useApi('http://localhost:8080/api/tareas/')
  
  return (
    <div>
      <NavBar text={<HomeForm />}/>
      <h1>Este es el HOME</h1> 
      <TareasList tareas={tareas} />
      
      </div>
  )
}

import React, { useContext } from 'react'
import UserContext from '../../../contexts/UserContext/UserContext'
import UserTarea from '../../../contexts/UserContext/UserTarea'
import profile from '../../atoms/profile.png'
import './perfil.css'

export const UserPerfil = () => {
    const user = useContext(UserContext)
    const tarea = useContext(UserTarea)
  return (
    <div className='perfil'>
            <div className='perfil-img'>
                <img src={profile} alt="Logo"/>
            </div>
            <div>
                <div className='perfil-name'>
                    <h5>
                        {`${user.user.first_name} ${user.user.last_name}`}
                    </h5>
                    <h6>
                        {user.user.email}
                    </h6>
                </div>
                <button color="danger" onClick={() =>{ 
                    user.setUser(null)
                    tarea.setTarea(false)
                    tarea.setTareaEdit(false)
                    }}
                    className="login-button">
                    Cerrar Sesión
                </button>
            </div>
    </div>
     
    
  )
}

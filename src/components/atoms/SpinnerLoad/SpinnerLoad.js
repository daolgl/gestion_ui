import React from 'react'
import { Button, Spinner } from 'reactstrap'
import './spinnerLoad.css'
export const SpinnerLoad = () => {
  return (
    <div className='spinner-container'>
        <Button
            color="primary"
            disabled
          >
            <Spinner size="sm">
            </Spinner>
            <span>
              {' '} Cargando...
            </span>
        </Button>
    </div>
    
  )
}
import { AuthContext } from 'auth'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

function ErrorInside({}: Props) {
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()

  return (
    <div className='errorwrapper'>
        <img width={250} height={250} src={require('../../../assets/Error.png')} className='error-logo' /> 
        <h1 style = {{color: '#2F5288', fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: 100, textAlign: 'center', marginBottom: 0}}>ERROR 404</h1>
        <p style={{marginTop:0 }}>You are anywhere, but nowhere.</p>
    </div>
  )
}

export default ErrorInside
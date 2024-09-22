import React from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Login() {
    const [existingUser, setExistingUser] = React.useState(true)

    return(
        existingUser ? 
            <SignIn createNewAcc={() => setExistingUser(false)}/> : 
            <SignUp signInExistingUser={() => setExistingUser(true)}/>
    )
}
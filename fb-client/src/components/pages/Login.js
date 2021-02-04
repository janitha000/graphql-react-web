import React, { useContext, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import Loader from "react-loader-spinner";
import { AuthContext } from '../../contexts/auth'

import './Register.css'
import { useForm } from '../../hooks/useForm';

const Login = ({ history }) => {
    const { login } = useContext(AuthContext)
    const [errors, setErrors] = useState('')

    const { onChange, onSubmit, clearForm, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result)
            let { data: { login: userData } } = result
            login(userData)
            history.push('/')
        },
        onError(err) {
            console.log(err.toString())
            setErrors(err.toString())
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
        clearForm();
    }

    return (
        <div className="register">
            <div className="login-box">
                <h2>Login</h2>
                <form>
                    <div className="user-box">
                        <input type="text" name="username" value={values.username} onChange={(e) => onChange(e)} required />
                        <label>Username</label>
                    </div>

                    <div className="user-box">
                        <input type="password" name="password" value={values.password} onChange={(e) => onChange(e)} required />
                        <label>Password</label>
                    </div>
                    <a href="#" onClick={onSubmit}>  Submit</a>

                </form>
                <div className="register-message">
                    {loading && (<Loader type="Bars" color="black" height={50} width={50} />)}
                    {!loading && errors && (<p style={{ color: 'red' }}>{errors}</p>)}

                </div>
            </div>

        </div>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            loginInput: {
                username: $username
                password: $password
            }
        ) {
            user { id, username, email, createdAt}
            token
        }
    }
    
`

export default Login

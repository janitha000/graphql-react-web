import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";

import './Register.css'
import { useForm } from '../../hooks/useForm';

const Register = () => {

    const [result, setResult] = useState({})
    const [errors, setErrors] = useState('')
    const { onChange, onSubmit, clearForm, values } = useForm(registerUser, { username: '', email: '', password: '' })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result)
            let { data: { register } } = result
            setResult(register)
        },
        onError(err) {
            console.log(err.toString())
            setErrors(err.toString())
        },
        variables: values
    })

    function registerUser() {
        addUser();
        clearForm({ username: '', email: '', password: '' });
    }

    return (
        <div className="register">
            <div className="login-box">
                <h2>Register</h2>
                <form>
                    <div className="user-box">
                        <input type="text" name="username" value={values.username} onChange={(e) => onChange(e)} required />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type="text" name="email" value={values.email} onChange={(e) => onChange(e)} required />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" value={values.password} onChange={(e) => onChange(e)} required />
                        <label>Password</label>
                    </div>
                    <a href="#" onClick={onSubmit}>  Submit</a>

                </form>
                <div className="register-message">
                    {loading && (<Loader type="Bars" color="black" height={50} width={50} />)}
                    {!loading && result && result.user && (<p>User Registered Successfully. Navigate to <Link to="/login" >Login</Link> page.</p>)}
                    {!loading && errors && (<p style={{ color: 'red' }}>{errors}</p>)}

                </div>
            </div>

        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $password: String!
        $email: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                email: $email
            }
        ) {
            user { id, username, email, createdAt}
            token
        }
    }
    
`

export default Register

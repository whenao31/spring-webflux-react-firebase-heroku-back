import React, { useState} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "../assets/styles/login.css"
import { logInWithEmailAndPassword, signInWithGoogle } from '../firebase'

const LoginForm = () => {

    const {loading, hasErrors} = useSelector((state) => state);
    const { handleSubmit, formState: { errors }, register } = useForm();
    const [validateData, setValidate] = useState(false)

    const onSubmit = (data) => {
        if(!data.email.trim()){
            setValidate(true);
            return ;
        }
        setValidate(false);
        logInWithEmailAndPassword(data.email, data.password)
    }

    return (
        <div className='login'>
            <section className='login__container'>
                <h3>Log-in info</h3>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='container'>
                        <input 
                            type="email"
                            placeholder='Your e-mail address'
                            required
                            {...register("email", { required: true,})}
                        />
                        {validateData && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    <div className='container'>
                        <input 
                            type="password"
                            placeholder='Your password'
                            required
                            {...register("password", { required: true, minLength: 6})}
                        />
                        {errors.password?.type === 'minLength' && <p style={{color: "red", fontSize: "12px"}}>"minimum 6 characters long"</p>}
                    </div>
                    <div>
                        <button 
                            type='submit'
                            className='login__btn'
                            disabled={loading}
                        >
                        {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
                <div>
                    <button className="login__btn login__google" onClick={signInWithGoogle}>Sign in with google</button>
                </div>
                <small>
                    Forgot password? &nbsp;&nbsp;
                    <NavLink to="/">Reset password.</NavLink>
                </small>
                <br/>
                <small>
                    Don't have an account? &nbsp;&nbsp;
                    <NavLink to="/register">Register.</NavLink>
                </small>
            </section>
        </div>
    )
}

export default LoginForm
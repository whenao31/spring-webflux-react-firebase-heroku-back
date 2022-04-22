import React, { useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { NavLink, useHistory } from 'react-router-dom'
import "../assets/styles/login.css"
import { auth, sendPasswordReset } from '../firebase'

const ResetPasswordPage = () => {

    const [user, loading] = useAuthState(auth);
    const { handleSubmit, register } = useForm();
    const [validateData, setValidate] = useState(false)

    const history = useHistory();

    useEffect(() => {
        if (loading) return;
        if (user) history.push("/")
    }, [user, loading]);

    const onSubmit = (data) => {
        if(!data.email.trim()){
            setValidate(true);
            return ;
        }
        setValidate(false);
        sendPasswordReset(data.email)
    }

    return (
        <div className='login'>
            <section className='login__container'>
                <h3> Reset password</h3>
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
                    <div>
                        <button 
                            type='submit'
                            className='login__btn'
                            disabled={loading}
                        >
                        Send reset email
                        </button>
                    </div>
                </form>
                <br/>
                <small>
                    Don't have an account? &nbsp;&nbsp;
                    <NavLink to="/register">Register.</NavLink>
                </small>
            </section>
        </div>
    )
}

export default ResetPasswordPage
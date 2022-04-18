import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import '../assets/styles/register.css'
import { auth, registerWithEmailAndPassword } from '../firebase';


const UserFormPage = () => {

    const [user, loading, error] = useAuthState(auth);
    const {hasErrors} = useSelector((state) => state);
    const { handleSubmit, formState: { errors }, register } = useForm();
    const [validateData, setValidate] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });
    const history = useHistory();

    useEffect(() => {
        if (loading) return;
        if (user) history.push("/questions")
    }, [user, loading]);

    const onSubmit = (data) => {
        const { firstName, lastName, profileImage, email, password} = data;
        if (!firstName.trim()){
            setValidate({...validateData, firstName: true});
            return ;
        }
        if (!lastName.trim()){
            setValidate({...validateData, lastName: true});
            return ;
        }
        if (!email.trim()){
            setValidate({...validateData, email: true});
            return ;
        }
        setValidate({
            firstName: false,
            lastName: false,
            email: false,
        })
        console.log(data);
        registerWithEmailAndPassword(firstName, lastName, email, password, profileImage);
    }
    
    return (
        <div className='register'>
            <div className='register__container'>
                <h3>Register info</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Your first name'
                            required
                            {...register("firstName", {maxLength: 20, })}
                        />
                        {validateData.firstName && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Your last name'
                            required
                            {...register("lastName", {maxLength: 20, })}
                        />
                        {validateData.lastName && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Url for you profile picture'
                            {...register("profileImage", )}
                        />
                    </div>
                    <div className='container'>
                        <input 
                            type="email"
                            placeholder='Your e-mail address'
                            required
                            {...register("email", { required: true,})}
                        />
                        {validateData.email && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
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
                    <small>
                    Already have an account? &nbsp;&nbsp;
                    <NavLink to="/">Login.</NavLink>
                </small>                
                </form>
            </div>
        </div>
    )
}

export default UserFormPage
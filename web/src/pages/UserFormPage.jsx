import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import '../assets/styles/register.css'
import { auth, findUserById, registerWithEmailAndPassword, updateUserInfo } from '../firebase';

const defaultImageUrl = "https://www.gravatar.com/avatar/?d=robohash";

const UserFormPage = ({mode}) => {

    const modeLocal = mode || "register";
    const [user, loading,] = useAuthState(auth);
    
    const { 
        handleSubmit,
        formState: { errors,},
        register,
        setValue,
        getValues,
    }
    = useForm ({
        defaultValues: {
            userDetails: {
                firstName: "",
                lastName: "",
                profileImage: "",
                email: "",
            }
        },
    });

    const [validateData, setValidate] = useState({
        firstName: false,
        lastName: false,
        email: false,
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const { email, firstName, lastName, profileImage, documentId } = useSelector((state) => state.auth);     

    useEffect(() => {
        if (loading) return;
        // If the form is being used to register then redirect to questions page
        if (user && modeLocal === "register") history.push("/questions")
        // If the form is used for updating user profile find the user info
        if (user && modeLocal === "profile" && documentId === null){
            findUserById(user.uid, dispatch);
        }
    }, [user, loading]);

    useEffect(() => {
        // bring the user data from the state
        setValue("userDetails", {
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage,
            email: email
        }, {shouldTouch: true})              
    }, [documentId])
    

    const onSubmit = (data) => {
        const password = data.password;
        const firstName = data.userDetails.firstName;
        const lastName = data.userDetails.lastName;
        const profileImage = data.userDetails.profileImage;
        const email = data.userDetails.email;
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
        });
        if (modeLocal === "register") {
            registerWithEmailAndPassword(firstName, lastName, email, password, profileImage);
        }
        if (modeLocal === "profile") {
            const userInfo = {
                firstName: firstName,
                lastName: lastName,
                profileImage: profileImage,
            }
            console.log(userInfo);
            updateUserInfo(user.uid, userInfo, dispatch);
        }
    }

    const updateHandler = () => {
        const values = getValues();
        const firstName = values.userDetails.firstName || "";
        const lastName = values.userDetails.lastName || "";
        const profileImage = values.userDetails.profileImage || "";
        console.log(firstName, lastName, profileImage);
        if (!firstName.trim()){
            setValidate({...validateData, firstName: true});
            return ;
        }
        if (!lastName.trim()){
            setValidate({...validateData, lastName: true});
            return ;
        }
        setValidate({
            firstName: false,
            lastName: false,
            email: false,
        });
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            profileImage: profileImage,
        }
        updateUserInfo(documentId, userInfo, dispatch);
    }
    
    return (
        <div className='register'>
            <div className='register__container'>
                {
                    modeLocal === "profile" ? <h3>User Profile</h3> : <h3>Register info</h3>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <img
                            src={(profileImage === "") || (profileImage === undefined) ? defaultImageUrl : profileImage }
                            alt="logged-in user"
                            style={{'width': '60px', 'height': '70px'}}
                        />
                    </div>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Your first name'
                            required
                            {...register("userDetails.firstName", {maxLength: 20, })}
                        />
                        {validateData.firstName && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Your last name'
                            required
                            {...register("userDetails.lastName", {maxLength: 20, })}
                        />
                        {validateData.lastName && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    <div className='container'>
                        <input
                            className='register__textBox'
                            type="text"
                            placeholder='Url for you profile picture'
                            {...register("userDetails.profileImage", )}
                        />
                    </div>
                    <div className='container'>
                        <input 
                            type="email"
                            placeholder='Your e-mail address'
                            required
                            {...register("userDetails.email", { required:  modeLocal === "register" ? true : false,})}
                            disabled={modeLocal === "profile" ? true : false}
                        />
                        {validateData.email && <p style={{color: "red", fontSize: "12px"}}>"blank spaces not allowed"</p>}
                    </div>
                    {
                        modeLocal === "register" &&
                        <div className='container'>
                            <input 
                                type="password"
                                placeholder='Your password'
                                required
                                {...register("password", { required: true, minLength: 6})}
                                disabled={modeLocal === "profile" ? true : false}
                            />
                            {errors.password?.type === 'minLength' && <p style={{color: "red", fontSize: "12px"}}>"minimum 6 characters long"</p>}
                        </div>
                    }
                    {
                        modeLocal === "register" &&
                        <div>
                            <button 
                                type='submit'
                                className='login__btn'
                                disabled={loading}
                            >
                            {loading ? "Loading..." : "Sign Up"}
                            </button>
                        </div>
                    }
                    {
                    modeLocal === "register" &&
                    <small>
                        Already have an account? &nbsp;&nbsp;
                        <NavLink to="/">Login.</NavLink>
                    </small>
                    }                
                </form>
                {
                modeLocal === "profile" &&
                    <div>
                    <button
                        className='login__btn'
                        disabled={loading}
                        onClick={updateHandler}
                    >
                        Update
                    </button>
                    </div>
                } 
            </div>
        </div>
    )
}

export default UserFormPage
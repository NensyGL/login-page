import React, {useState} from "react";
import {signUp} from "../../requests/requests.ts";

export function SignUp({toggleForm}: {toggleForm: (formType: string) => void}) {
    const [form, setForm] = useState({email: '', password: '', repeatPassword: ''});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const isFormValid = () => {
        return (!emailError && !passwordError && !repeatPasswordError) && (form.email && form.password && form.repeatPassword);
    }

    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({...form, [name]: value});
        switch (name) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    setEmailError('Email is invalid');
                } else {
                    setEmailError('');
                }
                break;
            case 'password':
                if (value.length < 8 || value.length > 16) {
                    setPasswordError('Password must be 8 to 16 symbols');
                } else {
                    setPasswordError('');
                }
                break;
            case 'repeatPassword':
                if (value !== form.password) {
                    setRepeatPasswordError('');
                } else {
                    setRepeatPasswordError('');
                }
                break;
        }
    }

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const response = await signUp(form);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleForm('login');
    }

    return (
        <>
            <p>Enter your details to Sing Up</p>
            <form>
                <div className="input-wrapper active">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" onChange={handleFormInputChange}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"
                           onChange={handleFormInputChange}/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="repeat-password">Repeat Password</label>
                    <input type="password" id="repeat-password" name="repeat-password"
                           onChange={handleFormInputChange}/>
                </div>
                {(emailError || passwordError || repeatPasswordError) && (
                    <div>
                        {emailError && (<p className="error">{emailError}</p>)}
                        {passwordError && (<p className="error">{passwordError}</p>)}
                        {repeatPasswordError && (<p className="error">{repeatPasswordError}</p>)}
                    </div>
                )}
                <div className="additional-fields">
                    <button className="text-btn f-right" onClick={handleLogin}>Back to Login page</button>
                </div>
                <div>
                    <button className="form-btn signup-btn f-right" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </>
    )
}

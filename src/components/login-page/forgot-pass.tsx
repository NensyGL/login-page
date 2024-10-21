import React, {useState} from "react";
import {forgotPass} from "../../requests/requests.ts";

export function ForgotPass({toggleForm}: {toggleForm: (formType: string) => void}) {
    const [form, setForm] = useState({email: ''});
    const [emailError, setEmailError] = useState('');

    const isFormValid = () => {
        return (!emailError && form.email);
    }

    const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({...form, [name]: value});
        if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                setEmailError('Email is invalid');
            } else {
                setEmailError('');
            }
        }
    }

    const handleForgotPass = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const response = await forgotPass(form);
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
            <p>Enter your email to reset the password</p>
            <form>
                <div className="input-wrapper active">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" onChange={handleFormInputChange}/>
                </div>
                {(emailError) && (
                    <div>
                        {emailError && (<p className="error">{emailError}</p>)}
                    </div>
                )}
                <div className="additional-fields">
                    <button className="text-btn f-right" onClick={handleLogin}>Back to Login page</button>
                </div>
                <div>
                    <button className="form-btn signup-btn f-right" onClick={handleForgotPass}>Reset Password</button>
                </div>
            </form>
        </>
    )
}

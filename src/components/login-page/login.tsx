import './login-page.css';
import {useState} from "react";
import {login} from '../../requests/requests.ts';

export function Login({toggleForm}) {
    const [loginForm, setLoginForm] = useState({email: '', password: '', rememberUser: false});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const isFormValid = () => {
        return (!emailError && !passwordError) && (loginForm.email && loginForm.password);
    }

    const handleFormInputChange = (e) => {
        const name = e.target.name;
        let value;
        if (name === 'rememberUser') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }
        setLoginForm({...loginForm, [name]: value});
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
        }
    }

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (isFormValid()) {
            try {
                const response = await login(loginForm);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleForgotPassword = () => {
        toggleForm('forgot-pass');
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        toggleForm('sign-up');
    }

    return (
        <>
            <p>Welcome back! Please login to your account.</p>
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
                {(emailError || passwordError) && (
                    <div>
                        {emailError && (<p className="error">{emailError}</p>)}
                        {passwordError && (<p className="error">{passwordError}</p>)}
                    </div>
                )}
                <div className="flex-row-sb additional-fields">
                    <label htmlFor="rememberUser">
                        <input type="checkbox" id="rememberUser" name="rememberUser"
                               onChange={handleFormInputChange}/>
                        Remember me
                    </label>
                    <p className="p-btn" onClick={handleForgotPassword}>Forgot Password?</p>
                </div>

                <div>
                    <button className="form-btn login-btn" onClick={handleLogin}>Login</button>
                    <button className="form-btn signup-btn" onClick={handleSignUp}>Sign Up</button>
                </div>
            </form>
        </>
    )
}

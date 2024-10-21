import './login-page.css';
import {Login} from "./login.tsx";
import {ForgotPass} from "./forgot-pass.tsx";
import {SignUp} from "./sign-up.tsx";
import {useState} from "react";

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPass, setIsForgotPass] = useState(false);

    const toggleForm = (formType: string): void => {
        switch (formType) {
            case 'login':
                setIsLogin(true);
                setIsForgotPass(false);
                setIsSignUp(false);
                break;
            case 'forgot-pass':
                setIsLogin(false);
                setIsForgotPass(true);
                setIsSignUp(false);
                break;
            case 'sign-up':
                setIsLogin(false);
                setIsForgotPass(false);
                setIsSignUp(true);
                break;
        }
    }

    return (
        <>
            <header className="login-header">
                <div className="logo">
                    Digital
                </div>
                <nav>
                    <a className="active" href="/">Home</a>
                    <a href="/">About us</a>
                    <a href="/">Blog</a>
                    <a href="/">Pricing</a>
                </nav>
            </header>
            <div className="flex-2-cols">
                <div className="login-container">
                    <div className="content-container">
                        <h1>
                            Artificial Intelligence Driving
                            Results For The Travel Industry
                        </h1>
                        {isLogin && <Login toggleForm={toggleForm}></Login>}
                        {isForgotPass && <ForgotPass toggleForm={toggleForm}></ForgotPass>}
                        {isSignUp && <SignUp toggleForm={toggleForm}></SignUp>}
                    </div>
                </div>
                <div className="main-container">

                </div>
            </div>
        </>
    )
}

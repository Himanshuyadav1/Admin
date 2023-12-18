import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            const res_token = await response.json();
            console.log(res_token);
            if(response.ok) {
                toast.success("Login Successfully");
                storeTokenInLS(res_token.token);
                navigate('/');
            } else {
                toast.error(res_token.extraDetails ? res_token.extraDetails : res_token.message);
            }
        } catch (error) {
            console.log("Login", error);
        }
    }
    return (
        <>
            <section>
                <main>
                    <div className="section-login">
                        <div className="container grid grid-two-cols">
                            <div className="login-image">
                                <img 
                                    src="/images/login.png" 
                                    alt="a boy is trying to do login"
                                    height="500"
                                    width="500"
                                />
                            </div>
                            <div className="login-form">
                                <h1 className="main-heading mb-3">login form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                            type="email" 
                                            id="email"
                                            placeholder="Enter Email"
                                            name="email"
                                            required
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input 
                                            type="password" 
                                            id="password"
                                            placeholder="Enter password"
                                            name="password"
                                            required
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button className="btn btn-login">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Login;
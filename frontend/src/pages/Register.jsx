import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(user)
            });
            console.log(response);
            if(response.ok) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                const res_token = await response.json();
                storeTokenInLS(res_token.token);
                navigate('/login');
            }
        } catch (error) {
            console.log("Register FE",error);
        }
    }
    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img 
                                    src="/images/register.png" 
                                    alt="a girl is trying to do registration" 
                                    height="500"
                                    width="500"
                                />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">registration form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input 
                                            type="text"
                                            id="username"
                                            placeholder="Enter Username"
                                            name="username"
                                            required    
                                            value={user.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input 
                                            type="email"
                                            id="email"
                                            placeholder="Enter email"
                                            name="email"
                                            required    
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input 
                                            type="number"
                                            id="phone"
                                            placeholder="Enter phone"
                                            name="phone"
                                            required   
                                            value={user.phone} 
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
                                    <button type="submit" className="btn btn-submit">Registration now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Register;
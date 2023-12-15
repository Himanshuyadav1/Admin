import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username: "",
    email: "",
    message: ""
};

const Contact = () => {
    const [ contact, setContact ] = useState(defaultContactFormData);
    const [ userData, setUserData ] = useState(true);
    const { user } = useAuth();

    if(userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: ""
        });
        setUserData(false);
    }

    const handleInput = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/form/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contact)
            });
            if(response.ok) {
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                alert("Message send successfully!!");
            }
        } catch (error) {
            console.log("Contact Submit ",error);
        }
    }    
    return (
        <>
            <section className="section-contact">
                <div className="container contact-content">
                    <h1 className="main-heading">contact us</h1>
                </div>
                <div className="container grid grid-two-cols">
                    <div className="contact-image">
                        <img 
                            src="/images/support.png" 
                            alt="We are always ready to help" 
                            width="400"
                            height="400"
                        />
                    </div>
                    <section className="section-form">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input 
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Enter username"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="message">message</label>
                                <textarea
                                    rows="6"
                                    cols="30"                                     
                                    id="message"
                                    name="message"
                                    placeholder="Enter message"
                                    value={contact.message} 
                                    onChange={handleInput}
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button className="btn" type="submit">submit</button>
                            </div>
                        </form>
                    </section>                        
                </div>
                <section className="mb-3"> 
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.325516872171!2d82.98374817444623!3d25.32685572643857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2de6e196cbb3%3A0x1527bb81c5e30918!2sVaranasi%20Junction%20railway%20station!5e0!3m2!1sen!2sin!4v1701437438095!5m2!1sen!2sin" 
                        width="100%" 
                        height="450" 
                        style={{ border:0 }} 
                        allowFullScreen
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">                            
                    </iframe>
                </section>
            </section>
        </>
    )
}

export default Contact;
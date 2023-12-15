import Contact from "../models/contact-modal.js";

class ContactController {
    static contactForm = async (req, res) => {
        try {
            const response = req.body;
            await Contact.create(response);
            return res.status(200).json({ message: "message sent successfully!!" });
        } catch (error) {
            res.status(500).json({ message: "Server Error" });
        }
    }
}

export default ContactController;
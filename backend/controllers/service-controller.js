import Service from "../models/service-model.js";

class ServiceController {
    static services = async (req, res) => {
        try {
            const response = await Service.find();
            if(!response) {
                return res.status(404).json({ msg: "No service found" });
            }
            res.status(200).json({ message: response });
        } catch (error) {
            console.log(`Service ${error}`);
        }
    }
}

export default ServiceController;
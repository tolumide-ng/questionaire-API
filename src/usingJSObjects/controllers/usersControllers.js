import usersModels from './../models/usersModels';


export default {
    createUser(req, res) {
        const request = req.value.body;
        const createTheUser = usersModels.createNewUser(request);
        return res.status(201).json({ status: 201, data: [createTheUser] });
    }
}

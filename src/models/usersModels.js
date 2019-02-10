import uuid from 'uuid';

class Users {
    constructor(){
        this.Users = [];
    }

    createNewUser(data) {
        const createUser = {
            id: uuid.v4(),
            firstName: data.firstName,
            lastName: data.lastName,
            otherName: data.otherName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            userName: data.userName,
            registered: new Date(),
            isAdmin: data.isAdmin,
        }
        this.Users.push(createUser);
        return createUser;
    }

    findUser(data) {
        return this.Users.find(user => user.id === data);
    }
}

export default new Users();
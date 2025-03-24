const bcryptjs = require("bcryptjs");
const User = require("../entities/User");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }

  async registerUser(data) {
    console.log(data);

    const cryptPassword = await bcryptjs.hash(data.password, 10);
    const user = new User(data.name, data.email, cryptPassword, data.birth);

    // return await this.userRepository.registerUser(user);
    return await user;
  }
}

module.exports = UserService;

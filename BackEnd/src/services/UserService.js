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

    return await this.userRepository.registerUser(user);
  }

  async autenticateUser(dataLogin) {
    const user = await this.userRepository.getUserByEmail(dataLogin.email);

    if (!user) {
      return { error: "User not found", code: 404 };
    }

    const correctPassword = await bcryptjs.compare(
      dataLogin.password,
      user.password
    );

    if (!correctPassword) {
      return { error: "Invalid Credentials", code: 401 };
    }

    return { user };
  }

  async updatePassword(email, newPassword) {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      
      if (!user) {
        return { error: "Usuário não encontrado" };
      }
      
      const cryptPassword = await bcryptjs.hash(newPassword, 10);
      
      return await this.userRepository.updateUserPassword(email, cryptPassword);
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUserCount() {
    return await this.userRepository.getUserCount();
  }
  
  async getRecentUsers(limit = 3) {
    return await this.userRepository.getRecentUsers(limit);
  }
}

module.exports = UserService;

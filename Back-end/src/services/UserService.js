class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    // return await this.userRepository.getAllUser();
    return await "Listando usuários ...";
  }
}

module.exports = UserService;

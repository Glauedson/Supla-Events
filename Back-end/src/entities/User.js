class User {
  constructor(name, email, password, age) {
    this.id = 0;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.role = "user";
  }
}

module.exports = User;

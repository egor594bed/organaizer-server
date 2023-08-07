import User from "../models/User";

class UserService {
  async findUserByEmail(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
}

export default new UserService();

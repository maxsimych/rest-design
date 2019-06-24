class UserService {
  constructor (UserModel) {
    this.UserModel = UserModel;
  }

  createUser(firstName, lastName) {
    const user = new this.UserModel({ firstName, lastName });
    return user.save();
  };
  async listUsers(offset = 0, limit = 0, fields = []) {
    const list = await this.UserModel.find({ deleted: false }, null, {
      skip: offset,
      limit
    });
    if (fields.length < 1) return list;
    return list.map(user => {
      return this._extractFields(user,fields);
    })
  };
  getUser(userId) {
    return this.UserModel.findById(userId);
  };
  async updateUser(userId, firstName, lastName ) {
    const user = await this.UserModel.findById(userId);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    return user.save();
  };
  async deleteUser(userId) {
    const user = await this.UserModel.findById(userId);
    user.deleted = true;
    return user.save();
  }
  _extractFields(user, fields) {
    const result = fields.reduce((acc, field) => {
      acc[field] = user[field];
      return acc;
    }, {})
    return result;
  }
}

module.exports = UserService;
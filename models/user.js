const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: { type: Sequelize.STRING },
  last: { type: Sequelize.STRING },
  age: { type: Sequelize.INTEGER },
  email: { type: Sequelize.STRING, allowNull: false },
  bio: { type: Sequelize.TEXT }
}, {
  validate: {
    noEmail() {
      if (!this.email) throw new Error('email cannot be null');
    },
    minAgeEighteen() {
      if (this.age < 18) throw new Error('Validation min on age failed');
    }
  },
  getterMethods: {
    fullName: function() {
      return this.getDataValue('first') + ' ' + this.getDataValue('last');
    }
  }
});

User.prototype.haveBirthday = function(){
  this.age = this.age + 1;
  return this.save();
};

console.log(User);
module.exports = User;

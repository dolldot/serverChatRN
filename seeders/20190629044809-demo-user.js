'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: "mbahdoll",
      email: "mbah@dolldot.com",
      password: "$2y$12$vleh8kH21LbwfE9nmq4N6uBfx4Uibvg/sMRJZm1QlfMpEAbGTfBBK"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

const sequelize = require("../sequelize");
const Sequelize = require("sequelize");

/**
 * defintion for lead table
 */
const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: "name",
    },
    dateofbirth: {
      type: Sequelize.DATE,
      allowNull: true,
      field: "dateof_birth",
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "password",
    },
    about: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "about",
    },
    phonenumber: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "phonenumber",
    },
    profilephoto: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "profilephoto",
    },
  },
  {
    timestamps: true,
    // don't delete database entries but set the newly added attribute deletedAt
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    freezeTableName: true,
  }
);
sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = User;

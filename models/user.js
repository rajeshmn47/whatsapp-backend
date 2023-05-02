const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
/**
 * defintion for lead table
 */
const User = sequelize.define(
  "usera",
  {
    id: {
      type: Sequelize.INTEGER(126),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: Sequelize.STRING(126),
      allowNull: false,
      unique: true,
      field: "name",
    },
    dateofbirth: {
      type: Sequelize.DATE(126),
      allowNull: true,
      field: "dateof_birth",
    },
    password: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "password",
    },
    about: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "about",
    },
    phonenumber: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "phonenumber",
    },
    profilephoto: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "profilephoto",
    },
    last_seen: {
      type: Sequelize.DATE(126),
      allowNull: true,
      field: "last_seen",
    },
  },
  {
    timestamps: true,
    scopes: {
      withoutPassword: {
        attributes: { exclude: ["password"] },
      },
    },
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

const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
/**
 * defintion for lead table
 */
const Lead = sequelize.define(
  "lead",
  {
    id: {
      type: Sequelize.INTEGER,
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
      type: Sequelize.DATE,
      allowNull: true,
      field: "dateof_birth",
    },
    country: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "country",
    },
    resume: {
      type: Sequelize.STRING(126),
      allowNull: true,
      field: "resume",
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
    console.log("List table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Lead;

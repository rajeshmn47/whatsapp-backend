const sequelize = require("../sequelize");
const Sequelize = require("sequelize");

/**
 * defintion for lead table
 */
const Status = sequelize.define(
  "status",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    posted_by: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: "posted_by",
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "url",
    },
    seen_by: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "seen_by",
    },
    r: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "",
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
    console.log("Status table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Status;

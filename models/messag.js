const sequelize = require("../sequelize");
const Sequelize = require("sequelize");

/**
 * defintion for lead table
 */
const Massage = sequelize.define(
  "messages",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    conversationid: {
      type: Sequelize.STRING,
      field: "conversationid",
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "message",
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
    console.log("Message table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Massage;

const sequelize = require("../sequelize");
const Sequelize = require("sequelize");

/**
 * defintion for lead table
 */
const Konversation = sequelize.define(
  "conversationse",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    members: {
      type: Sequelize.STRING,
      field: "members",
    },
    memberone: {
      type: Sequelize.STRING,
      field: "memberone",
      allowNull: true,
    },
    membertwo: {
      type: Sequelize.STRING,
      field: "membertwo",
      allowNull: true,
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
    console.log("Conversation table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

module.exports = Konversation;

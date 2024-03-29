const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
/**
 * defintion for lead table
 */
const Message = sequelize.define(
  "message",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "conversationid",
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
    is_seen: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_seen",
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

module.exports = Message;

const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
/**
 * defintion for lead table
 */
const Massage = sequelize.define(
  "messagezeu",
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
      get() {
        return this.getDataValue("message").toString("utf8mb4");
      },
    },
    is_seen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: "is_seen",
    },
    senderid: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "senderid",
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
    charset: "utf8mb4",
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

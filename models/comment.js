export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    Comment.hasOne(models.User, {as: 'user', sourceKey: 'uid', foreignKey: 'id'});
  };
  return Comment;
};
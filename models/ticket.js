export default (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    assignedTo: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Ticket.associate = function(models) {
    Ticket.hasMany(models.Comment, {as: 'comments', targetKey: 'id', foreignKey: 'ticketId'});
    Ticket.hasOne(models.User, {sourceKey: 'createdBy', foreignKey: 'id', as: 'createdByDetails'});
    Ticket.hasOne(models.User, {sourceKey: 'assignedTo', foreignKey: 'id', as: 'assignedToDetails'});
  };
  return Ticket;
};
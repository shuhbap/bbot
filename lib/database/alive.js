const config = require('../../config');
const { DataTypes } = require('sequelize');

const DB = config.DATABASE.define('Alive', {
  ALIVE_DATA: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: `Hello &user i am alive now`
  }
});

async function setAlive(msg) {
  const exist = await DB.findOne();
  if (!exist) {
    await DB.create({
      ALIVE_DATA: msg
    });
  } else {
    await exist.update({
      ALIVE_DATA: msg
    });
  }
  return true;
}

async function getAlive() {
  const exist = await DB.findOne();
  if (!exist) return false;
  return exist.ALIVE_DATA;
}

module.exports = { setAlive, getAlive };

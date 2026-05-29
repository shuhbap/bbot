const { DataTypes } = require('sequelize');
const config = require('../../config.js');

 const ChatBot = config.DATABASE.define(
	'ChatBot',
	{
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isDMOnly: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		isGCOnly: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: 'Afiya',
		timestamps: false,
	}
);

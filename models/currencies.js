'use strict';
module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define('currencies', {
        name: {
            type: DataTypes.STRING
        },
        short: {
            type: DataTypes.STRING
        },
        hotAddress: {
            type: DataTypes.STRING
        },
        hotAddressApproxBalance: {
            type: DataTypes.DECIMAL,
            defaultValue: 0
        },
        height: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        withdrawalFee: {
            type: DataTypes.DECIMAL,
            defaultValue: 0.001
        }
    }, {
        classMethods: {
            findByName: function(short) {
                return this.findOne({where: {short}});
            }
        }
    });
    Currency.associate = function (models) {
        // associations can be defined here
    };

    return Currency;
};
// findByName(short) {
//     return this.findOne({where: {short}});
// }


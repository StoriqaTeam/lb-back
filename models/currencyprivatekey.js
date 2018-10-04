'use strict';
module.exports = (sequelize, DataTypes) => {
    const Currencyprivatekey = sequelize.define('currencyprivatekey', {
        currency_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model: "currencies", key: "id"}
        },
        key: {
            type: DataTypes.TEXT,
            unique: true
        }
    }, {
        timestamps: false,
        indexes: [
            {unique: true, fields: ["currencyId"]}
        ],
        getterMethods: {
            key() {
                const encoded = this.getDataValue("key");
                if (!encoded) return null;

                return aes.decode(encoded);
            }
        },
        setterMethods: {
            key(value) {
                this.setDataValue("key", aes.encode(value));
            }
        }
    });
    Currencyprivatekey.associate = function (models) {
        // associations can be defined here
    };
    return Currencyprivatekey;
};
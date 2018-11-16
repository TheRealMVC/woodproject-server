module.exports = function (sequelize, DataTypes) {
    return sequelize.define('project', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            //unique: false
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        results: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_properties: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })
}




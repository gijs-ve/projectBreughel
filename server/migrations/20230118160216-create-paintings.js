'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('paintings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            painterId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'painter',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            width: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            height: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            isApproved: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
            },
            isPurchaseable: {
                type: Sequelize.BOOLEAN,
            },
            isSold: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('paintings');
    },
};

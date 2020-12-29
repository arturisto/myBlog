const Sequelize  = require('sequelize');
const db = require('../config/db');

const blogpost = db.define("blogpost",{

    title:{
        type: Sequelize.TEXT,
    },
    metatitle:{
        type: Sequelize.TEXT,
    },
    summary:{
        type: Sequelize.TEXT,
    },
    published:{
        type: Sequelize.BOOLEAN,
    },
    createdAt:{
        type: Sequelize.DATE,
    },
    publishedAt:{
        type: Sequelize.DATE,
    },
    content:{
        type: Sequelize.BLOB,
    },
    editedAt:{
        type: Sequelize.DATE,
    },
    editedBy:{
        type: Sequelize.INTEGER,
    },


})

module.exports = blogpost;
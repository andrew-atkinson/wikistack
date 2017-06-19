var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  //logging: false
});

let Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  urlTitle: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  status: { type: Sequelize.ENUM('open', 'closed') },
  date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
  getterMethods: {
    route: function() {
      return '/wiki/' + this.urlTitle;
    }
  }
});

Page.hook('beforeValidate', function(page, options) {
    console.log('was I called?');
  if (!page.title) {
    throw new Error("title required")
  } else {
    page.urlTitle = page.title.replace(/[^A-Za-z0-9]/g, "_")
  }
})

let User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  }
});

Page.belongsTo(User, {as:'author'});

module.exports = {
  db: db,
  Page: Page,
  User: User
};

(async () => {
  const { Sequelize, DataTypes } = require("sequelize");

  // const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "test.sqlite",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const User = sequelize.define(
      "User",
      {
        id: {
          type: DataTypes.NUMBER,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
        },
      },
      {}
    );

    // sync all models
    sequelize.sync();

    // create and save model instance in DB
    const jane = User.build({ id: 1, firstName: "Jane", lastName: "Doe" });
    await jane.save();

    const jeff = await User.create({
      id: 2,
      firstName: "Jeff",
      lastName: "TheBoss",
    });

    const pep = await User.create({
      id: 3,
      firstName: "Pep",
      lastName: "Bezos",
    });

    const users = await User.findAll();
    console.log(users[0].id === jane.id);
    console.log(JSON.stringify(users, null, 2));

    // migrations: https://sequelize.org/master/manual/migrations.html
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

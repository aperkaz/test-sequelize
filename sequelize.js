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
        // id: {
        //   type: DataTypes.NUMBER,
        //   primaryKey: true,
        //   allowNull: false,
        // },
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
    const jane = User.build({ firstName: "Jane", lastName: "Doe" });
    await jane.save();

    console.time("create");
    for (var i = 0; i < 1000; i++) {
      await User.create({
        firstName: "Jeff",
        lastName: "TheBoss",
      });
    }

    console.timeEnd("create");

    console.time("find");
    const users = await User.findAll();
    console.timeEnd("find");

    console.time("find2");
    const usersFiltered = await User.findAll({
      where: {
        firstName: "Alain",
      },
    });
    console.timeEnd("find2");

    // console.log(JSON.stringify(users, null, 2));

    // migrations: https://sequelize.org/master/manual/migrations.html
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

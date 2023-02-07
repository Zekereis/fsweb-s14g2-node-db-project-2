exports.up = function (knex) {

    return knex.schema.createTable("cars", (table) => {
      table.increments();
      table.string("vin",17).unique().notNullable();
      table.string("make",128).notNullable();
      table.string("model",128).notNullable();
      table.integer("mileage").notNullable().unsigned();
      table.string("title");
      table.string("transmissions");
    })
};

exports.down = function (knex) {

  return knex.schema.dropTableIfExists("cars");
};

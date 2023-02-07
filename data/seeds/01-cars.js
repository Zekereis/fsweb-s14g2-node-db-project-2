
exports.seed = async function(knex){
    await knex("cars").truncate();
    await knex("cars").insert([
        {
            vin:"JN1HS36P2LW140218",
            make:"Nissan",
            model:"240sx",
            mileage:"1990",
            title:"Az kullanılmış",
            transmissions:"Manuel"
        }
    ])
}

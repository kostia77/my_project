exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('teachers').del()
        .then(function () {
            // Inserts seed entries
            return knex('teachers').insert([
                {
                    id: 1,
                    name: 'Olena',
                    sname: 'Petrivna'
                },
                {
                    id: 2,
                    name: 'Stas',
                    sname: 'Ihorovych'
                },
                {
                    id: 3,
                    name: 'Adriy',
                    sname: 'Santjago'
                }
                
                
      ]);
        });
};

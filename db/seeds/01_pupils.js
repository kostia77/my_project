exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('pupils').del()
        .then(function () {
            // Inserts seed entries
            return knex('pupils').insert([
                {
                    id: 1,
                    name: 'Petro',
                    sname: 'Kavaleridze',
                    classes_id: 1
                },
                {
                    id: 2,
                    name: 'Olena',
                    sname: 'Dguga',
                    classes_id: 2
                },
                {
                     id: 3,
                    name: 'Ihor',
                    sname: 'Pasuk',
                    classes_id: 3
                }
      ]);
        });
};
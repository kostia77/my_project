exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('classes').del()
        .then(function () {
            // Inserts seed entries
            return knex('classes').insert([
                {
                    id: 1,
                    name: '1-a',
                    teachers_id:1
                },
                {
                    id: 2,
                    name: '2-a',
                    teachers_id:2
                },
                {
                    id: 3,
                    name: '3-a',
                    teachers_id:3
                }
      ]);
        });
};
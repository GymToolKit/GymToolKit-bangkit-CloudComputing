exports.up = (pgm) => {
    pgm.createTable('users', {
      id: {
        type: 'VARCHAR(255)',
        primaryKey: true,
      },
      username: {
        type: 'VARCHAR(255)',
        notNull: true,
      },
      email: {
        type: 'VARCHAR(255)',
        notNull: true,
      },
      password: {
        type: 'VARCHAR(255)',
        notNull: true,
      },
    });
  };
  exports.down = (pgm) => {
    pgm.dropTable('users');
  };
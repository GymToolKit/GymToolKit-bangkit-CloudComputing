exports.up = (pgm) => {
  pgm.createTable('feedback', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    rating: {
      type: 'INT',
      notNull: true,
    },
    comment: {
      type: 'TEXT',
    },
  });

  pgm.addConstraint('feedback', 'fk_feedback_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('feedback');
};

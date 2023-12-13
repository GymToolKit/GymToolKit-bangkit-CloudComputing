exports.up = (pgm) => {
    pgm.createTable('tools', {
      id: {
        type: 'VARCHAR(255)',
        primaryKey: true,
      },
      tools_name: {
        type: 'VARCHAR(255)',
        notNull: true,
      },
      video_url: {
        type: 'TEXT',
        notNull: true,
      },
      headline: {
        type: 'TEXT[]',
        notNull: true,
      },
      tools_step: {
        type: 'TEXT[]',
        notNull: true,
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('tools');
  };
  
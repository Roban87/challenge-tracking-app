'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('commitments', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},  
    name: 'string',
    start_date: {
      type: 'datetime',
      notNull: true
    },
    end_date: {
      type: 'datetime',
      notNull: true,
    },
    is_done: {
      type: 'boolean',
      defaultValue: false,
    },
    user_id: 'int',
    challenge_id: 'int',
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('commitments', callback)
};

exports._meta = {
  "version": 1
};

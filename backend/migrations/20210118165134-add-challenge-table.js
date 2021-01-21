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
  db.createTable('challenge', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},  
    title: 'string',
    description: 'string',
    start_date: {
      type: 'timestamp',
      notNull: true,
    },
    end_date: {
      type: 'timestamp',
      notNull: true,
    },
    min_commitments: {
      type: 'int',
      notNull: true,
    },
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('challenge', callback);
};

exports._meta = {
  "version": 1
};

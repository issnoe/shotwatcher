'use strict'

const lodash = require('lodash')
const config = require('config')
const MongoClient = require('mongodb').MongoClient;
const url = config.get('dbMaster.url');
const urlAgent = config.get('db.url');
const chunkSizeDevices = 100

const dropCollection = (collectionName, db) => {
  return new Promise((resolve, reject) => {
    db
      .collection(collectionName)
      .drop(function (err, res) {
        err
          ? reject(err)
          : resolve(res);
      });
  });
};

const arrayInChunks = (collectionName, db) => {
  return new Promise((resolve, reject) => {
    db
      .collection(collectionName)
      .find({}, { projection: { _id: 1 } })
      .limit(10000)
      .toArray(function (err, data) {
        if (err) {
          reject(err)
        } else {
          const chunkedData = lodash.chunk(data, chunkSizeDevices)
          resolve(chunkedData);
        }
      });
  });
};


const insertIds = (data, collectionName, db) => {
  return new Promise((resolve, reject) => {
    db
      .collection(collectionName)
      .insertOne(data, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data);
        }
      });
  });
};

const insertDevicesOnChunks = (chunks, collectionName) => {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(urlAgent, { useNewUrlParser: true }, async (err, dbInstance) => {
        const db = dbInstance.db('notifications-dev');

        try {
          chunks.map((chunkItem, index) => {
            const myobj =
              collectionName === 'chunks' ?
                { devicesId: chunkItem }
                : { chunksId: chunkItem }

            insertIds(myobj, collectionName, db)
            if (index === chunks.length - 1) {
              resolve('exito');
            }
          })

        } catch (error) {
          reject(error)
          console.log('error');
        }
        dbInstance.close();
      });

    } catch (error) {
      reject(error)
    }

  });
};

const cleanCollections = () => {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(urlAgent, { useNewUrlParser: true }, async (err, dbInstance) => {
        const db = dbInstance.db('notifications-dev');

        try {
          await dropCollection('chunks', db);
        } catch (error) {
          console.log('Not exist Chunks collection');
        }

        try {
          await dropCollection('segments', db);
        } catch (error) {
          console.log('Not exist Segment collection');
        }
        dbInstance.close();
      });

    } catch (error) {
      reject(error)
    } finally {
      resolve('Clean collection successfull');
    }

  });
};

const insertChunks = () => {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, { useNewUrlParser: true }, async (err, dbInstance) => {
        const db = dbInstance.db('clients');

        try {
          const arrayChunks = await arrayInChunks('devices', db)
          const res = await insertDevicesOnChunks(arrayChunks, 'chunks')
          dbInstance.close()
          resolve(res);
        } catch (error) {
          console.log('Erro', error);
        }
      });

    } catch (error) {
      reject(error)
    }

  });
};

const insertSegments = () => {
  return new Promise((resolve, reject) => {
    try {
      MongoClient.connect(urlAgent, { useNewUrlParser: true }, async (err, dbInstance) => {
        const db = dbInstance.db('notifications-dev');
        try {
          const arrayChunks = await arrayInChunks('chunks', db);
          const res = await insertDevicesOnChunks(arrayChunks, 'segments')
          dbInstance.close();
          resolve(res);
        } catch (error) {
          console.log('Erro', error);
        }

      });

    } catch (error) {
      reject(error)
    }

  });
};


exports.populate = async (ctx, next) => {

  try {
    const cleanStatus = await cleanCollections();
    console.log(cleanStatus);
  } catch (error) {
    console.log(error);
  }

  try {
    const resChunks = await insertChunks();
    console.log(resChunks);

    if (resChunks === 'exito') {
      try {
        const resSegmets = await insertSegments();
        console.log(resSegmets);
        ctx.body = {
          success: true,
          data: resSegmets
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    ctx.body = {
      success: true,
      data: error
    }
  }

}



require('dotenv').config();
const Telegraf = require('telegraf');
const config = {
  telegram: { webhookReply: false } // default true, but need to set false
};
const bot = new Telegraf(process.env.TELEGRAM_API_KEY, config);
const firebase = require('firebase');
const scraper = require('./scraper');

var firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_API_KEY,
  authDomain: 'spyroomsforme.firebaseapp.com',
  databaseURL: 'https://spyroomsforme.firebaseio.com',
  projectId: 'spyroomsforme',
  storageBucket: 'spyroomsforme.appspot.com',
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CONFIG_APP_ID
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
});

const getFormattedBookingData = (room, callback) => {
  scraper.getBookingDataFor(room, (error, data) => {
    let [timings, reasons] = data;
    let formattedString = `Booking info for ${room.bold()}:`;
    for (let i = 0; i < timings.length; i++) {
      formattedString += `\n${timings[i]} ~ ${reasons[i]}`;
    }
    callback(formattedString);
  });
};

// Declare a route
fastify.get('/subscription', (request, reply) => {
  reply.send({ hello: 'subscription' });
  db.collection('room')
    .where('count', '>', 0)
    .get()
    .then(docs => {
      docs.forEach(doc => {
        let state = doc.data().state;
        getFormattedBookingData(doc.id, formattedString => {
          if (state !== formattedString) {
            db.collection(doc.id)
              .get()
              .then(userIdDocs => {
                userIdDocs.forEach(userIdDoc => {
                  bot.telegram.sendMessage(
                    userIdDoc.data().user_id,
                    formattedString
                  );
                });
              });

            db.collection('room')
              .doc(doc.id)
              .update({
                state: formattedString
              });
          }
        });
      });
      // for each of this doc --> scrape the pages. --> send to users --> update the db with new state.
    });
});

fastify.get('/clear', (request, reply) => {
  db.collection('room')
    .where('count', '>', 0)
    .get()
    .then(docs => {
      // Get a new write batch
      let batch = db.batch();
      docs.forEach(doc => {
        batch.update(doc.ref, { count: 0 });
      });
      batch.commit().catch(err => console.error(err));
    });

  let batch = db.batch();
  let dr1 = db
    .collection('DR1')
    .get()
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });

      return db.collection('DR2').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR3').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR4').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR6').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });

      return db.collection('DR7').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });

      return db.collection('DR8').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });

      return db.collection('DR9').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR10').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR11').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('DR12').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('ExecutiveClassRm').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR1').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR2').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR3').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR4').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR5').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR6').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR7').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR8').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('MR9').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
      return db.collection('VideoConf').get();
    })
    .then(docs => {
      docs.forEach(doc => {
        if (doc.exists) {
          batch.delete(doc.ref);
        }
      });
    })
    .finally(() => {
      reply.send({ hello: 'clear' });
      batch.commit().catch(err => console.error(err));
    });
});

fastify.get('/clear1', (request, reply) => {});

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});

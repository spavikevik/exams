const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.registerExamWithCourse = functions.database.ref('/exams/{pushId}').onCreate((event) => {
  const values = event.data.val();
  const { pushId } = event.params;
  console.log(`Registering exam ${pushId} with course ${values.course}`);
  return admin.database().ref(`/courses/${values.course}/exams`).set({
    [pushId]: true,
  });
});

exports.registerEnrollmentKey = functions.database.ref('/courses/{pushId}').onCreate((event) => {
  const values = event.data.val();
  const { pushId } = event.params;
  console.log(`Registering enrollment key ${values.secretKey} with course ${values.course}`);
  return admin.database().ref('/enrollmentKeys').update({
    [values.secretKey]: pushId,
  })
});

exports.processSignUp = functions.auth.user().onCreate(event => {
  const user = event.data;
  const customClaims = {
    admin: false,
    accessLevel: 0
  };
  return admin.auth().setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // Update real-time database to notify client to force refresh.
      const metadataRef = admin.database().ref("metadata/" + user.uid);
      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      return metadataRef.set({refreshTime: new Date().getTime()});
    })
    .catch(error => {
      console.log(error);
    });
});

exports.enrollCourse = functions.database.ref('/students/{studentId}').onWrite((event) => {
  const values = event.data.val();
  const { studentId } = event.params;
  if (values.enrolledCourses.enrollmentKey) {
    return admin.database().ref(`/enrollmentKeys/${values.enrolledCourses.enrollmentKey}`).once('value').then((snapshot) => {
      return snapshot.val();
    }).then((courseId) => {
      return Promise.all([admin.database().ref(`/courses/${courseId}`).once('value'), courseId])
    }).then(([snapshot, courseId]) => {
      const course = snapshot.val();
      return admin.database().ref(`students/${studentId}/enrolledCourses`).update({
        [courseId]: course,
        enrollmentKey: false
      })
    }).catch(error => { console.log(error) });
  }
  return false;
});
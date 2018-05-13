const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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
      const { code, name, semester, year } = snapshot.val();
      return admin.database().ref(`/students/${studentId}/enrolledCourses`).update({
        [courseId]: { code, name, semester, year },
        enrollmentKey: false
      })
    }).catch(error => { console.log(error) });
  }
  return false;
});

exports.registerStudent = functions.https.onCall((data, context) => {
  const {
    fullName,
    emailAddress,
    faculty,
    indexNumber,
  } = data;

  const { accessLevel } = context.auth.token || {};
  if (context.auth.token.admin && accessLevel === 9) {
    console.log('Registering student with: ', data);
    return admin.auth().createUser({
      displayName: fullName,
      email: emailAddress,
      emailVerified: true,
    }).then(user => {
      return admin.database().ref('/students').update({
        [user.uid]: {
          fullName,
          emailAddress,
          faculty,
          indexNumber,
        },
      });
    });
  }
  console.log('Permission denied for uid: ', context.auth.uid);
  return false;
});

exports.registerExamStudent = functions.https.onCall((data, context) => {
  const {
    examId,
    studentId,
    toggle,
  } = data;

  const { accessLevel } = context.auth.token || {};
  if (context.auth.token.admin && accessLevel === 9) {
    console.log(`(Un)registering student ${studentId} for exam: ${examId}`);
    console.log('Toggle: ', toggle);
    return admin.database().ref(`/exams/${examId}`).once('value').then((snapshot) => {
      const {
        name,
        date,
        duration,
        type,
      } = snapshot.val();
      const updatedExamData = {};
      let studentExamData = {};
      let examStudentData = {};
      if (toggle) {
        studentExamData = {
          name,
          date,
          duration,
          type,
        };
        examStudentData = toggle;
      }
      updatedExamData[`exams/${examId}/registeredStudents/${studentId}`] = examStudentData;
      updatedExamData[`students/${studentId}/exams/${examId}`] = studentExamData;
      return admin.database().ref('/').update(updatedExamData);
    }).catch(error => console.log(error));
  }
  console.log('Permission denied for uid: ', context.auth.uid);
  return false;
});

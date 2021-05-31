// provides a function to change the active status of a deal from True to False
// takes in dealId as a parameter

let firebase = require('./firebase')

exports.handler = async function(event) {

  //get query string parameters
  let dealId = event.queryStringParameters.dealId
 
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  //change the active field to false
  await db.collection('deals').doc(dealId).update({
    active: false
  })


  
  return {
    statusCode: 200,
  }
}
// provide a function to up vote a deal in firebase
// takes in userId and dealId as string parameters

let firebase = require('./firebase')

exports.handler = async function(event) {
  
  //get query string parameters
  let userId = event.queryStringParameters.userId
  let dealId = event.queryStringParameters.dealId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query to get the number of up votes for this post
  let upVotesQuery = await db.collection(`upVotes`).where(`dealId`, `==`, dealId).where(`userId`, `==`, userId).get()

  // perform a query to get the number of down votes for this post
  let downVotesQuery = await db.collection(`downVotes`).where(`dealId`, `==`, dealId).where(`userId`, `==`, userId).get()

  //checks to see if the user has previously up voted or down voted the deal.
  if (upVotesQuery.size == 0 && downVotesQuery.size == 0){
    // create a new post, wait for it to return
   await db.collection('downVotes').add({
    dealId: dealId,
    userId: userId
    
  })
  }
  
  return {
    statusCode: 200,
  }
}
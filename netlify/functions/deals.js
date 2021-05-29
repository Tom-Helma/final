//Provide a function to return all of the deals from the Firebase database.

// Allows us to use firebase
let firebase = require('./firebase')


exports.handler = async function(event) {
  //define an empty array to hold the return value of the lambda function
  let returnValue = []

  //establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let dealsQuery = await db.collection(`deals`).orderBy(`created`, `desc`).get()

  // retrieve the documents from the query
  let deals = dealsQuery.docs

  //loop through all of the posts
  for (let dealIndex = 0; dealIndex < deals.length; dealIndex++){
    // get the id from the document
    let dealId = deals[dealIndex].id

    // get the data from the document
    let dealData = deals[dealIndex].data()

    // perform a query to get the number of up votes for this deal
    let upVotesQuery = await db.collection(`upVotes`).where(`dealId`, `==`, dealId).get()

    // stores the number of up votes (number of documents returned) to memory
    let numberOfUpVotes = upVotesQuery.size

    // perform a query to get the number of down votes for this deal
    let downVotesQuery = await db.collection(`downVotes`).where(`dealId`, `==`, dealId).get()

    // stores the number of down votes (number of documents returned) to memory
    let numberOfDownVotes = downVotesQuery.size

    // store the business ID to memory
    let businessId = dealData.businessId

    // perform a query to get the busniness with the same business ID of the deal
    let businessQuery = await db.collection(`businesses`).doc(businessId).get()

    // get the data of the businessQuery
    let businessData = businessQuery.data()
    

    //create an object to add to the return value array of the lambda funtion
    let returnObject = {
      id: dealId,
      dealTitle: dealData.dealTitle,
      imageUrl: dealData.imgUrl,
      price: dealData.price,
      location: dealData.location,
      time: dealData.time,
      description: dealData.description,
      active: dealData.active,
      upVotes: numberOfUpVotes,
      downVotes: numberOfDownVotes,
      business: businessData.businessName
    }

    //push the return object to the return array
    returnValue.push(returnObject)

  }

  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
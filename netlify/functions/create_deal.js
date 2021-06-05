// provide a function to create new deals in the firebase
// takes in the following parameters: dealTitle, imgUrl, description, time, price, location, businessName

let firebase = require('./firebase')

exports.handler = async function(event) {
  
  // get the query sting parameters and store in memory
  let dealTitle = event.queryStringParameters.dealTitle
  let imgUrl = event.queryStringParameters.imgUrl
  let description = event.queryStringParameters.description
  let time = event.queryStringParameters.time
  let price = event.queryStringParameters.price
  let businessName = event.queryStringParameters.businessName
  let location = event.queryStringParameters.location

  // console.log(dealTitle)
  // console.log(imgUrl)
  // console.log(description)
  // console.log(time)
  // console.log(price)
  // console.log(businessName)

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new variable to hold the active status and set it to true
  let active = true

  //console.log(`hello from backend`)

  // perform a query to get the businesses with the same name as passed to the function
  let businessQuery = await db.collection(`businesses`).where(`businessName`, `==`, businessName).get()

  //console.log(businessQuery.size)

  // check to see if there are no other businesses with the parameter name
  if (businessQuery.size == 0){
    
    // add the business name to the businesses collection
    await db.collection('businesses').add({
      businessName: businessName      
    }).then(function(docRef) {businessId = docRef.id})


    // create a new deal, wait for it to return
   await db.collection('deals').add({
    dealTitle: dealTitle,
    imgUrl: imgUrl,
    description: description,
    price: price,
    time: time,
    location: location,
    active: active,
    businessId: businessId,
    created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  
  //create a new deal using the existing business' id
  else{
    // get the business data from the business query
    let business = businessQuery.docs
    
   // console.log(`business: %o`, business)
    //create a variable to store the busniness id
    let businessId

    //loop through the business data to get the id
    for (i=0;i<business.length;i++){
      //store the id to memory
      businessId = business[i].id
    }

   // console.log(businessId)
   

    // create a new deal, wait for it to return
   await db.collection('deals').add({
    dealTitle: dealTitle,
    imgUrl: imgUrl,
    description: description,
    price: price,
    location: location,
    time: time,
    active: active,
    businessId: businessId,
    created: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return {
    statusCode: 200,
  }
}
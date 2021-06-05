firebase.auth().onAuthStateChanged(async function(user) {
  
    if (user) {
        
        let signOutButton = document.querySelector(`.sign-in-or-sign-out`)

        // handle the sign out button click
   signOutButton.addEventListener(`click`, function(event) {
     // sign out of firebase authentication
     firebase.auth().signOut()

     // redirect to the sign out page
        document.location.href = `index.html`})
        
let submitButton = document.querySelector(`.post-deal-button`)

submitButton.addEventListener(`click`,async function(event) {
  event.preventDefault()

  let dealTitleInput = document.querySelector(`#dealTitle`)

  let dealTitle = dealTitleInput.value

  let descriptionInput = document.querySelector(`#description`)

  let description = descriptionInput.value

  let businessInput = document.querySelector(`#business`)

  let businessName = businessInput.value

  let locationInput = document.querySelector(`#location`)

  let location = locationInput.value

  let priceInput = document.querySelector(`#price`)

  let price = priceInput.value

  let timeInput = document.querySelector(`#time`)

  let time = timeInput.value

  let imageInput = document.querySelector(`#image`)

  let imgUrl = imageInput.value

 let url = `/.netlify/functions/create_deal?dealTitle=${dealTitle}&description=${description}&businessName=${businessName}&location=${location}&price=${price}&imgUrl=${imgUrl}&time=${time}`

 let response = await fetch(url)

 location.reload()

})
     } else {

      // build URL for deals API 
      let url = `/.netlify/functions/deals`
    
      // fetch url, wait for response, store in memory 
      let response = await fetch(url)
  
      // json 
      let json = await response.json()
  
      console.log(json)
  
      let dealsDiv = document.querySelector(`.deals`)
  
      for(let i=0; i<json.length; i++) {
        let deal = json[i]
  
        let dealId = deal.id
        let dealActive = deal.active
        let dealBusiness = deal.business
        let dealTitle = deal.dealTitle
        let dealDescription = deal.dealDescription
        let dealUpvotes = deal.upVotes
        let dealDownvotes = deal.downVotes
        let dealImage = deal.imageUrl 
        let dealLocation = deal.location
        let dealPrice = deal.price
        let dealTime = deal.time
  
  
      dealsDiv.insertAdjacentHTML(`beforeend`, 
      `<h1 class="text-gray-600 font-bold text-xl text-center mt-12">Deal Title: ${dealTitle} </h1> 
  
      <div><img class="mx-auto w-full my-8" src=${dealImage}></div>
  
      <div class="text-center font-bold border-4 rounded-xl p-2 border-blue-500 mt-4 mr-2 ">Name: ${dealBusiness}</div>
  
      <div class="text-center font-bold border-4 rounded-xl p-4 border-blue-500 mt-4 mr-2">Description: ${dealDescription}</div>
  
     <div class="text-center font-bold border-4 rounded-xl p-2 border-blue-500 mt-4 mr-2 ">Location: ${dealLocation}</div>
  
     <div class="text-center font-bold border-4 rounded-xl p-2 border-blue-500 mt-4 mr-2 ">Price: ${dealPrice}</div>
  
     <div class="text-center font-bold border-4 rounded-xl p-2 border-blue-500 mt-4 mr-2 ">Time Used: ${dealTime}</div>
     `
   )
  
   if(dealActive == true) {
    dealsDiv.insertAdjacentHTML(`beforeend`, 
    `<div class="text-center font-bold border-4 rounded-xl p-2 border-green-500 mt-4 mr-2 ">Deal is Active</div>`)
  
   } else {
    dealsDiv.insertAdjacentHTML(`beforeend`, 
    `<div class="text-center font-bold border-4 rounded-xl p-2 border-red-500 mt-4 mr-2 ">Deal is not Active</div>`)
   }
  
  }

  // Signed out
  console.log('signed out')

  // Initializes FirebaseUI Auth
  let ui = new firebaseui.auth.AuthUI(firebase.auth())

  // FirebaseUI configuration
  let authUIConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: 'index.html'
  }

  // Starts FirebaseUI Auth
  ui.start('.sign-in-or-sign-out', authUIConfig)
   }
   }      
 )
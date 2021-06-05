firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // Signed in
    console.log('signed in')

    //sign out button for signed in user
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-pink-500 underline sign-out">Sign Out</button>`

      //post deal button for signed in user
    document.querySelector(`.post-deal`).innerHTML = `<button class="text-white-500">Post Deal</button>`

    let linkToPostDeal = document.querySelector(`.post-deal`)

    //redirect to dealpost html
    linkToPostDeal.addEventListener(`click`, function(event) {
      document.location.href = `dealPosts.html`
    })

      let signOutButton = document.querySelector(`.sign-out`)

         // handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      // sign out of firebase authentication
      firebase.auth().signOut()

      // redirect to the sign out page
      document.location.href = `index.html`

    })

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
      let dealDescription = deal.description
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
   
   <div class="text-3xl md:mx-0 mx-4 mb-4">
   <button id="upvote-button-${dealId}">⬆</button>${dealUpvotes}</div>
 
    <div class="text-3xl md:mx-0 mx-4 mb-4">
  <button id="downvote-button-${dealId}">⬇</button>
  ${dealDownvotes}</div>`
 )

 if(dealActive == true) {
  dealsDiv.insertAdjacentHTML(`beforeend`, 
  `<div class="text-center font-bold border-4 rounded-xl p-2 border-green-500 mt-4 mr-2 ">Deal is Active</div>  
  
  <div class="md:mx-0 mx-4 mb-4">
  <button id="active-button-${dealId}" class = "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">Report Inactive Deal </button></div>`)

  let activeButton = document.querySelector(`#active-button-${dealId}`)

  activeButton.addEventListener(`click`, async function(event) {
    let url = `/.netlify/functions/notActive?dealId=${dealId}`
 
    let response = await fetch(url) 
 
    location.reload()
  })
 } else {
  dealsDiv.insertAdjacentHTML(`beforeend`, 
  `<div class="text-center font-bold border-4 rounded-xl p-2 border-red-500 mt-4 mr-2 ">Deal is not Active</div>`)
 }

 let upvoteButton = document.querySelector(`#upvote-button-${dealId}`)

 upvoteButton.addEventListener(`click`, async function(event) {
   let url = `/.netlify/functions/create_upVotes?userId=${user.uid}&dealId=${dealId}`

   let response = await fetch(url) 

   location.reload()
 })

 let downvoteButton = document.querySelector(`#downvote-button-${dealId}`)

 downvoteButton.addEventListener(`click`, async function(event) {
   let url = `/.netlify/functions/create_downVotes?userId=${user.uid}&dealId=${dealId}`

   let response = await fetch(url) 

   location.reload()
 })

}

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
})

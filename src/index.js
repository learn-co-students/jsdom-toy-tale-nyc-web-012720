let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  let getToyCollection = document.querySelector("#toy-collection")

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container"); 
  function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(function(json){
      json.forEach(function(toy) {
        getToyCollection.innerHTML += `<div class="card">
          <h2>${toy.name}</h2> 
          <img src=${toy.image} class="toy-avatar" /> 
          <p>${toy.likes} </p> 
          <button class="like-btn">Like 
        <3</button>
         </div>
         `
      })
    })
  }

  getToys()

  document.addEventListener('submit', function(event){
    event.preventDefault()
    let target = event.target
      
     fetch("http://localhost:3000/toys")
      method: 'POST', 
      headers: {
       "content-type": 'application/json',
        "accept": "application/json"
      },
      body: JSON.stringify( {
        "name": "${toy.name}",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSymPaxnEUi7u3TI94w496rbB2alTiO_w6CSroiMvS3GJpYEH7Jt9EmRCLbzjbjtR0y1RYeA2is&usqp=CAc"
      })
  })

  
 



  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

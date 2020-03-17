
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
    
  let parentDiv = document.getElementById("toy-collection")

  function addNewToy(toy)
  {
        const childDiv = document.createElement('div')
        childDiv.className="card"
        childDiv.dataset.id = toy.id
        childDiv.innerHTML = `
        <h2> ${toy.name} </h2>
        <img src= ${toy.image} class="toy-avatar" </>
        <p> ${toy.likes} </p>
        <button class="like-btn">Like </button> `  
        parentDiv.append(childDiv)
        
  }
  // likes 
  function likeButton(){
    const likesBtn = document.getElementsByClassName("like-btn")
    for (const btn of likesBtn){
      btn.addEventListener('click', function(event){   
              let likesNumber = event.target.parentNode.querySelector('p')
              let newLikes = parseInt(likesNumber.innerText)
              newLikes++
              likesNumber.innerText = newLikes
              let id = event.target.parentNode.dataset.id
              console.log(id)
              let config1 = {
                method: "PATCH",
                headers: {"Content-Type": "application/json",
                           Accept: "application/json"},
                body: JSON.stringify({likes: newLikes})}
              fetch(`http://localhost:3000/toys/${id}`,config1)
              .then(res => res.json())
              .then(function(toy){console.log}) 
      }) 
    }
  }
  // fetch all toys 
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(function(toys){
    toys.forEach((toy) => {
      addNewToy(toy) });
    likeButton() 
  })
  // add new toy to collection
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {toyForm.style.display = "block";
      toyForm.addEventListener('submit',(event) =>{
            // create new toy
            event.preventDefault()
            let name = event.target.name.value
            let image = event.target.image.value
            let likes = 0
            let newToy = {name: name, image: image, likes: likes}
          // update db
          let config = {
            method: "POST", 
            headers: 
              {"Content-Type": "application/json",
                Accept: "application/json"},
            body: JSON.stringify(newToy)
          }
          fetch('http://localhost:3000/toys',config)
          .then(res => res.json())
          .then(function(toy){
              addNewToy(newToy) // add new toy to browser
              likeButton()
          }) 
        }) 
      } else {
        toyForm.style.display = "none";
      } 
    });   
});





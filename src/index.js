let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  //ADD TOY INFO TO THE CARD
  const toyCollection = document.getElementById("toy-collection")
  
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => {
    json.forEach(toy => {
      let div = document.createElement("div")
      div.class = "card"
      div.dataset.id = `${toy.id}`
      toyCollection.append(div)
      div.innerHTML = `
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
      `
    })
  })

  let form = document.querySelector("form.add-toy-form")
  form.addEventListener("submit", function(event){
  // ADD A NEW TOY
  // if (event.target.class == 'submit'){
    event.preventDefault()
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      
      body: JSON.stringify({
        "name": `${event.target.name.value}`,
        "image": `${event.target.image.value}`,
        "likes": 0
      })
      
    }) 
    .then(response => response.json()) //just need a refresh
    .then(console.log('refresh'))
  }) // event listener submit
  
  document.addEventListener("click", function(event){
    console.log(event.target)
    if (event.target.className === "like-btn")
      {let target = event.target
      let parent = event.target.parentNode
      let id = parent.dataset.id
      let p = parent.querySelector("p")
      let likes = parseInt(p.innerText)
      likes++

      p.innerText = likes
        
      fetch(`http://localhost:3000/toys/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({ likes }) // <= { score } is an ES6 that is equivalent to { score: score }
      })
      .then(response => response.json())
      .then(console.log)
    
    }
  })// click event listener close
  
});//DomContentLoaded



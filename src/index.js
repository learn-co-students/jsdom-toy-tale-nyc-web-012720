let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const divCollect = document.querySelector('#toy-collection')
  
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  })

  function renderToys(toy){
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
  
    let img = document.createElement('img')
    img.setAttribute('scr', toy.image)
    img.setAttribute('class', 'toy-avatar' )
  
    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`
  
    let button = document.createElement('button')
    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', toy.id)
    button.innerText = "like"
    button.addEventListener('click', function(event){
      console.log(event.target.dataset)
    })
    const divCard = document.createElement('div')
    divCard.class = 'card'
    divCard.append(h2, img, p, button)
    divCollect.appendChild(divCard)
  }
  
  function getToys(){
    fetch('http://localhost:3000/toys')
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      object.forEach(function(toy){
        renderToys(toy)
      })
    })
  }
  
  function postToys(data){
    fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': data.name.value,
      'image': data.img.value,
      'likes': 0
    })
  })
  
    .then(function(response){
      response.json()
    })
    .then(function(object_toy){
      let new_toy = renderToys(object_toy)
      divCollect.append(new_toy)
    })
  
    function updateLikes(event){
      event.preventDefault()
      let moreLikes = parseInt(event.target.previousSilbiling.innerText) + 1
      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          'likes': moreLikes
        })
      })
      .then(function(response){
        response.json()
      })
      .then(function(objectLikes){
        event.target.previousSilbiling.innerText = `${moreLikes} likes`;
      })
    }
  
  }
})




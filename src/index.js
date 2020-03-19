let addToy = false;
const toysUrl = "http://localhost:3000/toys" 

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const newToyFrom = document.querySelector(".add-toy-form")
  const toyCollection = document.getElementById("toy-collection")
  
  fetchToys()
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  newToyFrom.addEventListener("submit", event =>{
    event.preventDefault()

    const target = event.target.querySelectorAll('input')
    let nameInput = target[0].value
    let imageInput = target[1].value

    createNewToy(nameInput, imageInput)
    newToyFrom.reset()
  })

  toyCollection.addEventListener("click", event => {
      if(event.target.className === "like-btn") {
        let target = event.target.parentNode
        numLikes(target)
      }
  })

});

const fetchToys = () => {
  fetch(toysUrl)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
}

const renderToys = toys =>{
  const toyCollection = document.getElementById("toy-collection")
  toys.forEach(toy => {
    let toyCard = renderToy(toy)
    toyCollection.appendChild(toyCard)
  });
}

const renderToy = toy => {
  let card = document.createElement('div')
  card.className = "card"

  card.innerHTML = `
    <h2 id=${toy.id}>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  `
  return card
}

const createNewToy = (name, image) => {
  fetch(toysUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      "name": `${name}`,
      "image": `${image}`,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    renderNewToy(toy)
  })
}

const renderNewToy = (toy) => {
  const toyCollection = document.getElementById("toy-collection")
  let toyCard = renderToy(toy)
  toyCollection.appendChild(toyCard)
}

const numLikes = target =>{
  let toyId = target.querySelector('h2').id
  let likes = target.querySelector('p').innerText.split(" ")[0]
  let num =  parseInt(likes)
  num ++

  likes.innerText = `${num} Likes`
  updateLikes(num, toyId)
}

const updateLikes = (num, toyId) =>{
  fetch(`${toysUrl}/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": num
    })
  })
  .then(resp => resp.json())
  .then(toy => updateToy(toy))
}

const updateToy = toy => {
  let updateCard = document.querySelector(`[id="${toy.id}"]`).parentNode
  updateCard.querySelector('p').innerText = `${toy.likes} Likes`
}
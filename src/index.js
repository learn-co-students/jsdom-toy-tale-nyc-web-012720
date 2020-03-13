let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys();
  addNewToy();
  updateLikes();

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

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => json.forEach(toy => {
    addToyHmtl(toy)
  }))
}

function addToyHmtl(json) {
  const toyDiv = document.createElement("div")
  toyDiv.innerHTML = `
    <div class="card" data-id="${json.id}">
      <h2>${json.name}</h2>
      <img src=${json.image} class="toy-avatar" />
      <p>${json.likes} likes</p>
      <button class="like-btn">Like <3</button>
    </div>
  `
  const toyCollection = document.getElementById("toy-collection")
  toyCollection.appendChild(toyDiv)
}

function addNewToy() {
  const form = document.getElementsByClassName("add-toy-form")[0]
  form.addEventListener("submit", function (event) {
    event.preventDefault()
    form.reset()
    const formattedObject = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }
    addToyHmtl(formattedObject)
    fetch("http://localhost:3000/toys",
    {
      method: "POST",
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify({
        "name": `${event.target.name.value}`,
        "image": `${event.target.image.value}`,
        "likes": 0
      })
    }
  )
  })
}

function updateLikes() {
  document.addEventListener("click", function (event) {
    if (event.target.className === "like-btn") {
      const toyCard = event.target.parentNode
      const likesElement = toyCard.getElementsByTagName("p")
      let numOfLikes = likesElement[0].innerText.split(" ")[0]
      likesElement[0].innerText = `${++numOfLikes} likes`

      const toyId = toyCard.dataset.id

      fetch(`http://localhost:3000/toys/${toyId}`,
    {
      method: "PATCH",
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify({likes: numOfLikes})
    }
  )
    }
  })
}

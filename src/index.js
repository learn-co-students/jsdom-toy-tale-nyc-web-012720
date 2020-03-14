let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection")
  const form =  document.getElementById("form-new");
  const likeBtn = document.getElementsByClassName("like-btn");

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(toys){
    return getToys(toys);
  })
  
  function getToys(toys) {
    console.log(toys[0].name)
    toys.forEach(function(toy) {
    let div = document.createElement('div')
    div.className = "card"
    div.innerHTML = `
  <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p data-number=${toy.id}>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>`
    toyCollection.append(div);
    })
  }

  document.addEventListener('click', function(event){
    if(event.target.className === "like-btn"){
      likesIncretment(event.target); 
      }
  });
  
  addBtn.addEventListener("click", () => {
    event.preventDefault()
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }

    form.addEventListener("submit", function(event){
      let newName = document.getElementsByClassName("input-text")[0].value;
      let newImgUrl = document.getElementsByClassName("input-text")[1].value;
  
      fetch('http://localhost:3000/toys', { 
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({'name': newName, 'image': newImgUrl, 'likes': 0})
      })
      .then(response => response.json())
      .then(console.log);
    });
  });

  function likesIncretment(button){
   
    let parentTag = button.parentNode;
    let pTag = parentTag.getElementsByTagName("p")[0] 
    let splitText = parseInt(pTag.innerText.split(" ")[0]);
    pTag.innerText = `${++splitText}` + " Likes";
  
    fetch(`http://localhost:3000/toys/${pTag.dataset.number}`, { 
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({'likes': `${pTag.innerText}`})
    })
    .then(response => response.json())
    .then(console.log);

  }

  });
  
  




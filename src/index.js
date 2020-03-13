let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.getElementById("toy-collection")
  
  function renderHomepage() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    json.forEach(element => {
      let node = document.createElement("DIV")
      node.className = "card"

      nameNode = document.createElement("H2")
      nameNode.innerText = element.name
      node.append(nameNode)

      imageNode = document.createElement("IMG")
      imageNode.src = element.image
      imageNode.className = "toy-avatar"
      node.append(imageNode)

      likesNode = document.createElement("P")
      likesNode.innerText = element.likes
      likesNode.id = `${element.id}-likes`
      node.append(likesNode)

      likesBtnNode = document.createElement("BUTTON")
      likesBtnNode.innerText = "Like <3"
      likesBtnNode.className = "like-btn"
      likesBtnNode.id = `${element.id}-like-btn`
      node.append(likesBtnNode)

      toyCollection.append(node)
    });
  });
  }

  renderHomepage()

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

  document.addEventListener("submit", event => {

    event.preventDefault()

    fetch("http://localhost:3000/toys", 
    {
       method: "POST",
       headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
       body: JSON.stringify({
                    "name": toyForm.getElementsByClassName("input-text")[0].value                    ,
                    'image': toyForm.getElementsByClassName("input-text")[1].value                    ,
                    "likes": 0,
                            })
    })
    .then(function(response) {
          console.log(response)
          return response.json();
    })
    .then(function(object) {
      renderHomepage()
      console.log(object)
      return object;
    })
  })

    document.addEventListener("click", event => {
      if (event.target.className === "like-btn" ) {
        let id = event.target.id.split(/-/g)[0]
        let likesNode = document.getElementById(`${id}-likes`)
        let likes = parseInt(likesNode.innerText)
        likes++
        likesNode.innerText = likes
        
        fetch(`http://localhost:3000/toys/${id}`, 
    {
       method: "PATCH",
       headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
       body: JSON.stringify({"likes": likes})
    })
    .then(function(response) {
          console.log(response)
          return response.json();
    })
    .then(function(object) {
      console.log(object)
      return object;
     })
      }
    })
    
});

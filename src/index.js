let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCol = document.querySelector("#toy-collection");
  const createBtn = document.querySelector("input[name='submit']");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  //RENDER TOY FUNCTION
  const renderToy = (toy) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');
    const h2 = document.createElement('h2');
    h2.innerHTML = toy.name;
    const img = document.createElement('img');
    img.setAttribute('src', toy.image);
    img.setAttribute('class', 'toy-avatar');
    const p = document.createElement('p');
    p.innerHTML = `${toy.likes} Likes`
    const btn = document.createElement('button');
    btn.setAttribute('id', toy.id);
    btn.setAttribute('class', 'like-btn');
    btn.innerHTML = "Like <3";

    toyCol.appendChild(div);
    div.appendChild(h2);        
    div.appendChild(img);        
    div.appendChild(p);        
    div.appendChild(btn);  
  };

  //GET TOYS
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => {
      json.forEach(toy => renderToy(toy));
    });
  
  // ADD A NEW TOY
  const addNewToy = (name, img) => {
    const postObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({name: name, image: img, likes: 0})
    }

    fetch('http://localhost:3000/toys', postObj)
      .then(res => res.json())
      .then(json => renderToy(json))
      .catch(err => {
        console.log(err.message);
      });
  };

  createBtn.onclick = (e) => {
    e.preventDefault();
    const name = document.querySelector("input[name='name']").value;
    const img = document.querySelector("input[name='image']").value;
    addNewToy(name, img);
  };

  //UPDATE TOY
  const updateToy = (likes, id) => {
    const patchObj = {
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({"likes": likes})
    };
    fetch(`http://localhost:3000/toys/${id}`, patchObj)
      .then(res => res.json())
      .then(json => {
        let toyLikes = document.getElementById(`${id}`).parentElement.children[2];
        let likes = parseInt(toyLikes.innerText, 10);
        likes++;
        toyLikes.innerText = `${likes} Likes`;

      })
      .catch(err => console.log(err.message));
  }

  document.addEventListener("click", e => {
    if(e.target.className === "like-btn"){
      e.preventDefault();
      const id = e.target.id;
      const likesHTML = e.target.parentElement.children[2].innerText;
      let likes = parseInt(likesHTML, 10);
      likes++;
      updateToy(likes, id);
    }
  });

});

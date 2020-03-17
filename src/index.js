let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
	const addBtn = document.querySelector('#new-toy-btn');
	const toyForm = document.querySelector('.container');

	addBtn.addEventListener('click', () => {
		// Hide & seek with the form
		addToy = !addToy;
		if (addToy) {
			toyForm.style.display = 'block';
		} else {
			toyForm.style.display = 'none';
		}
	});

	loadToys();
	addNewToy();
	bindLikeClickListener();
});

function loadToys() {
	fetch('http://localhost:3000/toys')
		.then(response => response.json())
		.then(result =>
			result.forEach(element => {
				makeToyCard(element);
			})
		);
}

function makeToyCard(toyObject) {
	// eslint-disable-next-line unicorn/prefer-query-selector
	const toyCollection = document.getElementById('toy-collection');
	const toyDiv = document.createElement('div');
	toyDiv.class = 'card';
	toyDiv.dataset.id = toyObject.id;
	toyDiv.innerHTML = `
  <h2>${toyObject.name}</h2>
  <img src="${toyObject.image}" class="toy-avatar">
  <p class="numLikes">${toyObject.likes}</p>
  <button class="like-button">Like <3</button>`;
	toyCollection.append(toyDiv);
}

function addNewToy() {
	const newForm = document.querySelectorAll('.add-toy-form')[0];
	newForm.addEventListener('submit', function() {
		const configObject = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: newForm.name.value,
				image: newForm.image.value,
				likes: '0'
			})
		};

		fetch('http://localhost:3000/toys', configObject)
			.then(function(response) {
				response.json();
			})
			.then(result => console.log(result));
	});
}

// function addLike() {
// 	document.addEventListener('click', function(event) {
// 		if (event.target.className === 'like-button') {
// 			console.log(event.target);
// 			const id = event.target.parentNode.dataset.id;
// 			event.target.parentNode.querySelector('p').textContent++;
// 			const likes = event.target.parentNode.querySelector('p').textContent;
// 			const configObject = {
// 				method: 'PATCH',
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: 'application/json'
// 				},
// 				body: JSON.stringify({likes: parseInt(likes, 10)})
// 			};

// 			fetch(`http://localhost:3000/toys/${id}`, configObject)
// 				.then(function(response) {
// 					response.json();
// 				})
// 				.then(result => console.log(result));
// 		}
// 	});
// }

const patchToyLikes = (id, likes) => {
	const configObject = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({likes})
	};

	return new Promise(resolve => {
		fetch(`http://localhost:3000/toys/${id}`, configObject).then(response => {
			response.json().then(json => {
				resolve(json);
			});
		});
	});
};

function bindLikeClickListener() {
	document.addEventListener('click', async function(event) {
		if (event.target.className === 'like-button') {
			console.log(event.target);
			const id = event.target.parentNode.dataset.id;
			const likes = event.target.parentNode.querySelector('p').textContent;

			// start a spinner
			const json = await patchToyLikes(id, parseInt(likes));
			console.log(json);
			// stop spinner
			event.target.parentNode.querySelector('p').textContent++;
		}
	});
}

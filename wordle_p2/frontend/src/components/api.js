// Get my username

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://www.stackhawk.com/blog/react-cors-guide-what-it-is-and-how-to-enable-it/
function api_getUsername(cb){
	let url="/api/username";
	fetch(url, {
		method: "GET",
		mode: "same-origin",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	})
	.then(response=>response.json())
	.then(data=>cb(data))
	.catch(error=>console.log(error));
}

function api_getWords(cb){
	let url="/api/words";
	fetch(url, {
		method: "GET",
		mode: "same-origin",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	})
	.then(response=>response.json())
	.then(data=>cb(data))
	.catch(error=>console.log(error));
}

function api_guess(username, guess, cb){
	let url="/api/username/"+username+"/guess/"+guess;
	fetch(url, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
	  })
	  .then(response => response.json())
	  .then(data => {
		cb(data); 
	  })
	  .catch(error => {
		console.error('Error:', error);
		cb({ error: 'Failed to make the guess.' });
	  });
}

function api_newgame(username, cb){
	let url="/api/username/"+username+"/newgame";
	fetch(url, {
		method: 'PUT',
		headers: {
		  'Content-Type': 'application/json'
		}
	  })
	  .then(response => response.json())
	  .then(data => {
		cb(data); // Pass the response data to the callback function
	  })
	  .catch(error => {
		console.error('Error:', error);
		cb({ status: 'error' }); // Pass an error status to the callback function
	  });
}

export { api_getUsername, api_guess, api_newgame, api_getWords };

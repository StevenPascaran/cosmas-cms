var _firebase = require("firebase");

class auth {
	init(){
		const loggedOutLinks = document.querySelectorAll('.logged-out');
		const loggedInLinks = document.querySelectorAll('.logged-in');
		// Listen for Auth Status Changes
		_firebase.auth().onAuthStateChanged(user => {
			if(user){	
				loggedInLinks.forEach(item => item.style.display = 'block');
				loggedOutLinks.forEach(item => item.style.display = 'none');
			} else {
				loggedInLinks.forEach(item => item.style.display = 'none');
				loggedOutLinks.forEach(item => item.style.display = 'block')
			}
		});
		// Log in Fucntion
		const loginForm = document.querySelector('#login-form');
		const formModal = document.querySelector('#modal-login');
		loginForm.addEventListener('submit', (e) => {
			const email = loginForm['login-email'].value;
			const password = loginForm['login-password'].value;
			// Log ins the User 
			_firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
				loginForm.reset();
				formModal.classList.remove('is-active');
				window.location.reload(true);
			});
			// Creates Users
			//_firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
			//	console.log(cred); 
			//});	
		});
		// Log out Users
		const logout = document.querySelector('#logout');
		logout.addEventListener('click', (e) => {
			e.preventDefault();
			_firebase.auth().signOut().then(() => {
				alert("User has signed out");
			});
		});
		
	}
}

module.exports = auth;
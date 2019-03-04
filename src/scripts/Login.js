class Login {
  init() {
	const loginBtn = document.querySelector('#login-btn');
    const loginModal = document.querySelector('#modal-login');
    const formModalCloseBtn = loginModal.querySelector('.modal__close');
    const formModalCancelBtn = loginModal.querySelector('.btn-cancel');
    const body = document.body;
	
	loginBtn.addEventListener('click', () => {
      loginModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      formModalCloseBtn.focus();
    });

    formModalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
    });

    formModalCancelBtn.addEventListener('click', () => {
      loginModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
    });
  }
}

module.exports = Login;
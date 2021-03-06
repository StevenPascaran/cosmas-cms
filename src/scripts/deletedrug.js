var firebase = require("./firebase");

class DeleteDrug {
  init() {
    const deleteDrugBtn = document.querySelector('.delete-drug-btn');
    const delModal = document.querySelector('#delete-modal');
    const formModalCloseBtn = delModal.querySelector('.modal__close');
    const formModalCancelBtn = delModal.querySelector('.btn-cancel');
    const body = document.body;
    const formModalDeleteBtn = delModal.querySelector('.btn-delete');

    deleteDrugBtn.addEventListener('click', (e) => {
      e.preventDefault();
      delModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      formModalCloseBtn.focus();
    });

    formModalCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      delModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      deleteDrugBtn.focus();
    });

    formModalCancelBtn.addEventListener('click', () => {
      delModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      deleteDrugBtn.focus();
    });
  }
}

module.exports = DeleteDrug;
import * as _firebase from 'firebase';

class UpdateDrug {
  init() {
    const editDrugBtn = document.querySelector('.edit-drug-btn');
    const formUpdateModal= document.querySelector('#form-update-modal');
    const formModalCloseBtn = formUpdateModal.querySelector('.modal__close');
    const formModalCancelBtn = formUpdateModal.querySelector('.btn-cancel');
    const formModalUpdateBtn = formUpdateModal.querySelector('.btn-update');
    const body = document.body;
  
    editDrugBtn.addEventListener('click', () => {
      formUpdateModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      formModalCloseBtn.focus();
    });
  
    formModalCloseBtn.addEventListener('click', () => {
      formUpdateModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      editDrugBtn.focus();
    });
  
    formModalCancelBtn.addEventListener('click', () => {
      formUpdateModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      editDrugBtn.focus();
    });
  }
}

export default UpdateDrug;
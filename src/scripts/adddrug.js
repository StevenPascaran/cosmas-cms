//import * as _firebase from 'firebase';
var firebase = require("./firebase");

if(typeof document !== "undefined")
{
	class AddDrug {
  init() {
    const addDrugBtn = document.querySelector('#add-new-drug-btn');
    const formModal = document.querySelector('#form-modal');
    const formModalCloseBtn = formModal.querySelector('.modal__close');
    const formModalCancelBtn = formModal.querySelector('.btn-cancel');
    const body = document.body;

    addDrugBtn.addEventListener('click', () => {
      formModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      formModalCloseBtn.focus();
    });

    formModalCloseBtn.addEventListener('click', () => {
      formModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      addDrugBtn.focus();
    });

    formModalCancelBtn.addEventListener('click', () => {
      formModal.classList.toggle('is-active');
      body.classList.toggle('modal-open');
      addDrugBtn.focus();
    });

    const dynamicInputIndications = document.querySelector('#indications');

    const dynamicInputDosages = document.querySelector('#dosages');
  }
}

}

//export default AddDrug;
module.exports = AddDrug;
import * as _firebase from 'firebase';

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
    // const dIIMain = dynamicInputIndications.querySelector('.dynamic-input__item');
    // const dIIAddBtn = dynamicInputIndications.querySelector('.btn-new');
    // const dIIRemoveBtn = dynamicInputIndications.querySelector('.btn-remove');
    // let dIICount = 1;

    // dIIRemoveBtn.setAttribute('tabindex', -1);

    // dIIAddBtn.addEventListener('click', () => {
    //   const input = dIIMain.querySelector('input').cloneNode(true);
    //   input.value = '';
    //   dIIMain.appendChild(input);
    //   input.focus();
    //   dIICount++;

    //   if (dIICount > 1) {
    //     dIIRemoveBtn.removeAttribute('tabindex');
    //   }
    // });

    // dIIRemoveBtn.addEventListener('click', () => {
    //   if (dIICount > 1) {
    //     const inputs = Array.from(dIIMain.querySelectorAll('input'));
    //     inputs[inputs.length - 1].remove();
    //     inputs[inputs.length - 2].focus();
    //     dIICount--;

    //     if (dIICount === 1) {
    //       dIIRemoveBtn.setAttribute('tabindex', -1);
    //     }
    //   }
    // });

    const dynamicInputDosages = document.querySelector('#dosages');
    // const dIDMain = dynamicInputDosages.querySelector('.dynamic-input__item');
    // const dIDAddBtn = dynamicInputDosages.querySelector('.btn-new');
    // const dIDRemoveBtn = dynamicInputDosages.querySelector('.btn-remove');
    // let dIDCount = 1;

    // dIDRemoveBtn.setAttribute('tabindex', -1);

    // dIDAddBtn.addEventListener('click', () => {
    //   const input = dIDMain.querySelector('input').cloneNode(true);
    //   input.value = '';
    //   dIDMain.appendChild(input);
    //   input.focus();
    //   dIDCount++;

    //   if (dIDCount > 1) {
    //     dIDRemoveBtn.removeAttribute('tabindex');
    //   }
    // });

    // dIDRemoveBtn.addEventListener('click', () => {
    //   if (dIDCount > 1) {
    //     const inputs = Array.from(dIDMain.querySelectorAll('input'));
    //     inputs[inputs.length - 1].remove();
    //     inputs[inputs.length - 2].focus();
    //     dIDCount--;

    //     if (dIDCount === 1) {
    //       dIDRemoveBtn.setAttribute('tabindex', -1);
    //     }
    //   }
    // });
  }
}

export default AddDrug;
var firebase = require("./firebase");

class UpdateDrug {
  init() {
    const editDrugBtn = document.querySelector('.edit-drug-btn');
    const formUpdateModal= document.querySelector('#form-update-modal');
    const formModalCloseBtn = formUpdateModal.querySelector('.modal__close');
    const formModalCancelBtn = formUpdateModal.querySelector('.btn-cancel');
    const body = document.body;
    const formModalUpdateBtn = formUpdateModal.querySelector('.btn-update');
  
    editDrugBtn.addEventListener('click', (e) => {
      e.preventDefault();
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

  bindEvents(){
    cardBody = Array.from(document.querySelectorAll('.card__section'));
  
    const editForm = document.querySelector('#edit-form');
    const inputName = editForm.querySelector('#name');
    const inputCatBreast = editForm.querySelector('#breast');
    const inputIndications = editForm.querySelector('#indications');
    const inputDosages = editForm.querySelector('#dosages');

    var toxicityCheckboxes = document.getElementsByName('Toxicity');
  
    cardBody.forEach((key) => {
       key.addEventListener('click', () => {
          const id = key.getAttribute('data-id'); 
          var name = drugs[id].Name;
          const toxic_to = drugs[id].toxicity_to;
          const breastfeeding_category = drugs[id].breastfeeding_category;
          const pregnancy_category = drugs[id].pregnancy_category;
          const indications = drugs[id].indications;
          const dosages = drugs[id].dosages;
  
          if (toxic_to.includes("heart,kidney")){
            toxicityCheckboxes[0].checked = true;
            toxicityCheckboxes[1].checked = true;
           } else if (toxic_to.includes("heart")){
            toxicityCheckboxes[0].checked = true;
            toxicityCheckboxes[1].checked = false;
           } else if (toxic_to.includes("kidney")){
            toxicityCheckboxes[0].checked = false;
            toxicityCheckboxes[1].checked = true;
           } else {
            toxicityCheckboxes[0].checked = false;
            toxicityCheckboxes[1].checked = false;
           }
  
            activeID = id;
            inputName.value = name;
            inputCatBreast.value = breastfeeding_category;
            inputIndications.value = indications;
            inputDosages.value = dosages;
  
            const formUpdateModal= document.querySelector('#form-update-modal');
            const formModalCloseBtn = formUpdateModal.querySelector('.modal__close');
            const formModalCancelBtn = formUpdateModal.querySelector('.btn-cancel');
            const body = document.body;
            const formModalUpdateBtn = formUpdateModal.querySelector('.btn-update');
  
            formUpdateModal.classList.toggle('is-active');
            body.classList.toggle('modal-open');
  
            formModalCloseBtn.addEventListener('click', () => {
              formUpdateModal.classList.remove('is-active');
              body.classList.remove('modal-open');
            });
          
            formModalCancelBtn.addEventListener('click', () => {
              formUpdateModal.classList.remove('is-active');
              body.classList.remove('modal-open');
            });
  
            formModalUpdateBtn.addEventListener('click', (e) => {
              e.preventDefault();
              
              if(activeID) {
                  const Name = inputName.value;
                  const breastfeeding_category = inputCatBreast.value;
                  const indications = inputIndications.value;
                  const dosages = inputDosages.value;
          
                  var toxicityCheckboxes = document.getElementsByName('toxicity');
                  var pregnancyCheckboxes = document.getElementsByName('pregnancy');
                  var toxicity = "";var cat_pregnancy = "";
                  
                  for (var i=0, n=toxicityCheckboxes.length;i<n;i++) 
                    if (toxicityCheckboxes[i].checked) 
                      toxicity += ","+toxicityCheckboxes[i].value;
                  if (toxicity) toxicity = toxicity.substring(1);
                  
                  for (var i=0, n=pregnancyCheckboxes.length;i<n;i++) 
                    if (pregnancyCheckboxes[i].checked)
                      cat_pregnancy += ", "+pregnancyCheckboxes[i].value;
                  if (cat_pregnancy) cat_pregnancy = cat_pregnancy.substring(1);
  
                  database.ref(`drugs/${activeID}`).update({
                      'Name': Name,
                      'breastfeeding_category': breastfeeding_category,
                      'toxicity_to': toxicity,
                      'pregnancy_category': cat_pregnancy,
                      'indications':indications,
                      'dosages': dosages
                  }, (error) => {
                    if(!error){
                      database.ref().once("value", (snapshot) => {
                      drugs = snapshot.val().drugs;
                      keys = Object.keys(drugs);
  
                      // clearList();
  
                      displayDrugs();
  
                      window.alert("Update Successful!");
  
                      formUpdateModal.classList.remove('is-active');
                      body.classList.remove('modal-open');
                      
                      activeID = null;
                      });
                    }
                  });
                }
              });
       });
    });
  };
}

//export default UpdateDrug;
module.exports = UpdateDrug;
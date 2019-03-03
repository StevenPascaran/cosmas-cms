var AddDrug = require("./scripts/adddrug");
var DeleteDrug = require("./scripts/deletedrug");
var UpdateDrug = require("./scripts/updatedrug");
var firebase = require("./scripts/firebase");
require("../dist/styles.703cc3633356eefa8621.css");
//import AddDrug from './scripts/adddrug';
//import DeleteDrug from './scripts/deletedrug';
//import UpdateDrug from './scripts/updatedrug';
//import './styles/app.scss';
//import firebase from './scripts/firebase';

const _addDrug = new AddDrug();
_addDrug.init();

const _deleteDrug = new DeleteDrug();
const _updateDrug = new UpdateDrug();

const database = firebase.database();
let activeID;
let drugId;
let drugs, keys;
let cardBody;

const cards = Array.from(document.querySelectorAll('#card_body'));
const drugForm = document.querySelector('#drug-form');
const inputName = drugForm.querySelector('#name');
const inputCatBreast = drugForm.querySelector('#breast');
const inputIndications = drugForm.querySelector('#indications');
const inputDosages = drugForm.querySelector('#dosages');
const formModal = document.querySelector('#form-modal');
const formModalSaveBtn = formModal.querySelector('.btn-save');
const formModalDeleteBtn = document.querySelector('.btn-delete');
    
formModalSaveBtn.addEventListener('click', () => {
	
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

	 var rootRef = firebase.database().ref().child("drugs");
     rootRef.push().set({
       Name:inputName.value,
       breastfeeding_category:inputCatBreast.value,
	     toxicity_to:toxicity,
       pregnancy_category:cat_pregnancy,
       indications: inputIndications.value,
       dosages: inputDosages.value
     });
	 	 
    
    // let rootRef = this.database.ref('drugs/' + drugId);
    // rootRef.child('drug1').set({
      //     'Name': name,
      //     'breastfeeding_category': cat_breast,
      //     'pregnancy_category' : cat_pregnancy,
      //     'toxic_to': toxicity
      // });

      // rootRef.set({key: value}).then().catch();

      // rootRef.set(object).then().catch();

  
     
  });

const displayDrugs = () => {
  database.ref().once("value", (snapshot) => {
	drugs = snapshot.val().drugs;
	keys = Object.keys(drugs);

	keys.forEach((key) => {
	  var name = drugs[key].Name;
	  const toxic_to = drugs[key].toxicity_to;
	  const breastfeeding_category = drugs[key].breastfeeding_category;
	  const pregnancy_category = drugs[key].pregnancy_category;
	  const indications = drugs[key].indications;
	  const dosages = drugs[key].dosages;
	  drugId = key;

		// $("#card_body").append(`
		const div = `
			<div class="card">
			  <div class="card__section" data-id="${key}">
				<h5 class="card__title">${name}</h5>
				<div class="card__meta">
				  Toxic to: <span class="red">${toxic_to}</span>
				</div>
				<div class="card__meta">
				  Breast-Feeding Category: <span class="grey">${breastfeeding_category}</span>
				</div>
				<div class="card__meta">
				  Pregnancy Category: <span class="grey">${pregnancy_category}</span>
				</div>
				<div class="card__meta"> 
				  Indications: <span class="grey"> <pre> ${indications} </pre> </span>
				</div>
				<div class="card__meta">
				  Dosages: <span class="grey"> <pre> ${dosages} </pre> </span>
				</div>
			  </div>
			  <div class="card__section">
				<button class="btn btn--light edit-drug-btn">
				  Edit 
				</button>
				<button class="btn btn--danger delete-drug-btn">
				  Delete
				</button>
			  </div>
			</div>
		`;   
		card_body.innerHTML += div;
	   

		bindEvents();
	});

	const deleteDrugBtn = document.querySelector('.delete-drug-btn');
	const delModal = document.querySelector('#delete-modal');
	const formModalCloseBtn = delModal.querySelector('.modal__close');
	const formModalCancelBtn = delModal.querySelector('.btn-cancel');
	const body = document.body;
	const formModalDeleteBtn = delModal.querySelector('.btn-delete');

	deleteDrugBtn.addEventListener('click', () => {
	  delModal.classList.toggle('is-active');
	  body.classList.toggle('modal-open');
	  formModalCloseBtn.focus();

	  bindEvents();

	  cardBody = Array.from(document.querySelectorAll('.card__section'));
	  cardBody.forEach((key) => {
		key.addEventListener('click', () => {
		  const id = key.getAttribute('data-id'); 
		  var name = drugs[id].Name;

		  var drugname = document.getElementById("drugName");
		  drugname.innerText = name;
		});
	  });

	  if(activeID){
		database.ref(`drugs/${activeID}`).remove();
	  
		if(!error){
		  database.ref().once("value", (snapshot) => {
		  drugs = snapshot.val().drugs;
		  keys = Object.keys(drugs);

		  window.alert("Deleted Successfully!");

		  delModal.classList.remove('is-active');
		  body.classList.remove('modal-open');
		  
		  activeID = null;

		  displayDrugs();
		  });
		}
	};
	});

	formModalCloseBtn.addEventListener('click', () => {
	  delModal.classList.toggle('is-active');
	  body.classList.toggle('modal-open');
	  deleteDrugBtn.focus();
	});

	formModalCancelBtn.addEventListener('click', () => {
	  delModal.classList.toggle('is-active');
	  body.classList.toggle('modal-open');
	  deleteDrugBtn.focus();
	});

	// _updateDrug.init();
	// _deleteDrug.init();
	
  }); 
}; 

displayDrugs();

const clearList = () => {
  cardBody.forEach((card) => {
	  card.innerHTML = "";
  });
};

const bindEvents = () => {
  cardBody = Array.from(document.querySelectorAll('.card__section'));

  const drugForm = document.querySelector('#edit-form');
  const inputName = drugForm.querySelector('#name');
  const inputCatBreast = drugForm.querySelector('#breast');
  const inputIndications = drugForm.querySelector('#indications');
  const inputDosages = drugForm.querySelector('#dosages');
  const formModal = document.querySelector('#form-modal');
  const formModalSaveBtn = formModal.querySelector('.btn-save');

  
  cardBody.forEach((key) => {
	 key.addEventListener('click', () => {
		const id = key.getAttribute('data-id'); 
		var name = drugs[id].Name;
		const toxic_to = drugs[id].toxicity_to;
		const breastfeeding_category = drugs[id].breastfeeding_category;
		const pregnancy_category = drugs[id].pregnancy_category;
		const indications = drugs[id].indications;
		const dosages = drugs[id].dosages;

		  activeID = id;
		  inputName.value = name;
		  inputCatBreast.value = breastfeeding_category;
		  // toxicity = toxic_to;
		  // cat_pregnancy = pregnancy_category;
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
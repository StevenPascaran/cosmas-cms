import AddDrug from './scripts/adddrug';
import DeleteDrug from './scripts/deletedrug';
import './styles/app.scss';
import firebase from './scripts/firebase';

const _addDrug = new AddDrug();
_addDrug.init();

const _deleteDrug = new DeleteDrug();


const database = firebase.database();
let drugId;
let drugs, keys;

const content_card = Array.from(document.querySelectorAll('.card'));
const drugForm = document.querySelector('#drug-form');
const inputName = drugForm.querySelector('#name');
const inputCatBreast = drugForm.querySelector('#breast');
const inputIndications = drugForm.querySelector('#indications');
const inputDosages = drugForm.querySelector('#dosages');
const formModal = document.querySelector('#form-modal');
const formModalSaveBtn = formModal.querySelector('.btn-save');
    
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

  
    // $("#card_body").append(`<h5 class="card__title"> Drug Number </h5>
    $("#card_body").append(`
            <div class="card">
              <div class="card__section">
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
                <button class="btn btn--light">
                  Edit
                </button>
				<button class="btn btn--danger" id="delete-drug-btn">
                  Delete
                </button>
              </div>
            </div>
        `);
	}); _deleteDrug.init();
  }); 
};

displayDrugs();
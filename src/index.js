var AddDrug = require("./scripts/adddrug");
var DeleteDrug = require("./scripts/deletedrug");
var UpdateDrug = require("./scripts/updatedrug");
var LogIn = require("./scripts/Login");
var firebase = require("./scripts/firebase");
var auth = require("./scripts/auth");
require("../dist/styles.49139058785690f0c68d.css");
//require("./styles/global.scss");

const _addDrug = new AddDrug();
_addDrug.init();

const _deleteDrug = new DeleteDrug();
const _updateDrug = new UpdateDrug();
const _Login = new LogIn();
_Login.init();
const _Auth = new auth();
_Auth.init();

const database = firebase.database();
var rootRef = firebase.database().ref().child("drugs");
let activeID;
let drugId;
let drugs, keys, key;
let cardBody;

// CMS LOG IN MODAL
const loginformModal = document.querySelector('#modal-login');
const formModalLoginBtn = loginformModal.querySelector('.btn-login');

// CMS TO ADD NEW DRUG
const cards = Array.from(document.querySelectorAll('#card_body'));
const drugForm = document.querySelector('#drug-form');
const inputName = drugForm.querySelector('#name');
const inputCatBreast = drugForm.querySelector('#breast');
const inputIndications = drugForm.querySelector('#indications');
const inputDosages = drugForm.querySelector('#dosages');
const formModal = document.querySelector('#form-modal');
const formModalSaveBtn = formModal.querySelector('.btn-save');

formModalSaveBtn.addEventListener('click', (e) => {
	e.preventDefault();

	var toxicityCheckboxes = document.getElementsByName('toxicity');
	var pregnancyCheckboxes = document.getElementsByName('pregnancy');
	var toxicity = "";
	var cat_pregnancy = "";
	var counter = 0;

	for (var i=0, n=toxicityCheckboxes.length;i<n;i++)
		if (toxicityCheckboxes[i].checked)
			toxicity += ","+toxicityCheckboxes[i].value;
	if (toxicity) toxicity = toxicity.substring(1);

  for (var i=0, n=pregnancyCheckboxes.length;i<n;i++)
    if (pregnancyCheckboxes[i].checked)
			cat_pregnancy += ", "+pregnancyCheckboxes[i].value;
	if (cat_pregnancy) cat_pregnancy = cat_pregnancy.substring(1);
  if (inputName.value == "" || inputIndications.value  == "" || inputDosages.value == ""){
    alert("Please input values")
  }
  else {
     rootRef.push().set({
       Name:inputName.value,
       breastfeeding_category:inputCatBreast.value,
	     toxicity_to:toxicity,
       pregnancy_category:cat_pregnancy,
       indications: inputIndications.value,
       dosages: inputDosages.value
     }, (error) => {
      if(!error){
      window.alert("Saved Successfully!");
      formModal.classList.remove('is-active');
      window.location.reload(true); //CODE TO REFRESH PAGE
      }
    });
  }
});

// LOG ADDED DATA & SH0W TOTAL # OF DRUGS
  var count = 0;

  var ref= firebase.database().ref().child("drugs");

  //CMS TO DISPLAY LIST OF DRUGS
    const displayDrugs = () => {
      ref.orderByChild("Name").on("child_added", function(snapshot) {
				count++;
       // drugs = snapshot.val().drugs;
       // keys = Object.keys(drugs);

     //   keys.forEach((key) => {
      //    var name = drugs[key].Name;
		  var name = snapshot.val().Name;
          const toxic_to = snapshot.val().toxicity_to;
          const breastfeeding_category = snapshot.val().breastfeeding_category;
          const pregnancy_category = snapshot.val().pregnancy_category;
          const indications = snapshot.val().indications;
          const dosages = snapshot.val().dosages;
          key = snapshot.key;
          drugId = key;

            const div = `
              <div class="card" data-id="${key}">
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
                    Indications:
					<span class="grey"> <pre> ${indications} </pre> </span>
                  </div>
                  <div class="card__meta">
                    Dosages: <span class="grey"> <pre> ${dosages} </pre> </span>
                  </div>
                </div>
                <div class="card__section">
                </div>
              </div>
            `;
            card_body.innerHTML += div;

        bindEvents();
        // INSERT DELETE FUNCTION HERE
        deleteDrug();
      });
    };

    displayDrugs();

		ref.once("value", function(snap) {
			var drugsTotal = document.getElementById("countTotal");
			drugsTotal.innerText = count;
		});

// CMS UPDATE FUNCTION
const bindEvents = () => {
  cardBody = Array.from(document.querySelectorAll('.card'));

  const editForm = document.querySelector('#edit-form');
  const inputName = editForm.querySelector('#Name');
  const inputCatBreast = editForm.querySelector('#Breast');
  const inputIndications = editForm.querySelector('#Indications');
  const inputDosages = editForm.querySelector('#Dosages');
  const toxicityCheckboxes = document.getElementsByName('Toxicity');
  const pregnancyCheckboxes = document.getElementsByName('Pregnancy');

    database.ref().once("value", (snapshot) => {
    drugs = snapshot.val().drugs;

  cardBody.forEach((key) => {
     key.addEventListener('click', () => {
      const id = key.getAttribute('data-id');
      var name = drugs[id].Name;
      const toxic_to = drugs[id].toxicity_to;
      const breastfeeding_category = drugs[id].breastfeeding_category;
      const pregnancy_category = drugs[id].pregnancy_category;
      const indications = drugs[id].indications;
      const dosages = drugs[id].dosages;

      for (var i=0, n=toxicityCheckboxes.length;i<n;i++)
      if (toxic_to.includes(toxicityCheckboxes[i].value)){
        toxicityCheckboxes[i].checked = true;
      } else {
        toxicityCheckboxes[i].checked = false;
      }

      for (var i=0, n=pregnancyCheckboxes.length;i<n;i++)
      if (pregnancy_category.includes(pregnancyCheckboxes[i].value)){
        pregnancyCheckboxes[i].checked = true;
      } else {
        pregnancyCheckboxes[i].checked = false;
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

      formModalCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formUpdateModal.classList.remove('is-active');
        body.classList.remove('modal-open');
      });

      formModalCancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formUpdateModal.classList.remove('is-active');
        body.classList.remove('modal-open');
      });

      // INSERT DELETE BTN LISTENER
      formModalUpdateBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if(activeID) {
          const Name = inputName.value;
          const breastfeeding_category = inputCatBreast.value;
          const indications = inputIndications.value;
          const dosages = inputDosages.value;

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
              //window.alert("Update Successful!");
              formUpdateModal.classList.remove('is-active');
              window.location.reload(true); //CODE TO REFRESH PAGE
              activeID = null;
            }
          });
        }
      });
    });
  });
 });
};

// CMS DELETE FUNCTION
const deleteDrug = () => {
  const deleteDrugBtn = document.querySelector('#delete-drug-btn');
  const delModal = document.querySelector('#delete-modal');
  const formModalCloseBtn = delModal.querySelector('.modal__close');
  const formModalCancelBtn = delModal.querySelector('.btn-cancel');
  const body = document.body;
  const formModalDeleteBtn = delModal.querySelector('.btn-delete');
  const formUpdateModal= document.querySelector('#form-update-modal');

  deleteDrugBtn.addEventListener('click', (e) => {
    e.preventDefault();

    formUpdateModal.classList.remove('is-active');
    delModal.classList.toggle('is-active');

	var name = drugs[activeID].Name;
	var drugname = document.getElementById("drugName");
	drugname.innerText = name;

    formModalDeleteBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if(activeID){
        database.ref(`drugs/${activeID}`).remove();
		window.alert("Deleted Successfully!");
		delModal.classList.remove('is-active');
		window.location.reload(true); //CODE TO REFRESH PAGE
		activeID = null;
      };
    });
  });

  formModalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    delModal.classList.toggle('is-active');
    body.classList.toggle('modal-open');
    deleteDrugBtn.focus();
  });

  formModalCancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    delModal.classList.toggle('is-active');
    body.classList.toggle('modal-open');
    deleteDrugBtn.focus();
  });
}

//----- EXCEL BATCH FILE -----//

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

var JSONFile;
var ExcelToJSON = function() {

  this.parseExcel = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function(sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        JSONFile = json_object;
      })
    };

    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleFileSelect(evt) {

var files = evt.target.files; // FileList object
var xl2json = new ExcelToJSON();
xl2json.parseExcel(files[0]);
}

//----- UPLOAD JSON FILE -----//

const saveJSON = document.querySelector('#saveJSONFile');

saveJSON.addEventListener('click', () => {
  var obj = JSON.parse(JSONFile);

    for (var i = 0; i < obj.length; i++) {
    var counter = obj[i];

     rootRef.push().set({
       Name: counter.Name,
       breastfeeding_category: counter.breastfeeding_category,
	     toxicity_to: counter.toxicity_to,
       pregnancy_category: counter.pregnancy_category,
       indications: counter.indications,
       dosages: counter.dosages
     });

    }
    window.alert("Uploaded Successfully!");
    window.location.reload(true);

    activeID = null;
});

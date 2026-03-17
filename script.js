/* ===============================
   HOSPITAL MANAGEMENT SYSTEM JS
================================= */

/* PATIENT STORAGE */
let patients = JSON.parse(localStorage.getItem("patients")) || [];

/* TABLE */
let table = document.getElementById("patientTable");

/* ===============================
   AUTO DATA FUNCTIONS
================================= */

function getMedicine(disease){
if(disease=="Fever") return "Paracetamol";
if(disease=="Heart Disease") return "Aspirin";
if(disease=="Cold") return "Cetirizine";
if(disease=="Cancer") return "Chemotherapy";
if(disease=="Fracture") return "Pain Killers";
return "General Medicine";
}

function getHistory(disease){
if(disease=="Fever") return "High fever for 3 days";
if(disease=="Heart Disease") return "Heart blockage treatment";
if(disease=="Cold") return "Severe cold and cough";
if(disease=="Cancer") return "Under chemotherapy";
if(disease=="Fracture") return "Bone fracture surgery";
return "General checkup";
}

function getBill(disease){
if(disease=="Fever") return 500;
if(disease=="Heart Disease") return 3000;
if(disease=="Cold") return 400;
if(disease=="Cancer") return 15000;
if(disease=="Fracture") return 7000;
return 1000;
}

/* ===============================
   ADD PATIENT
================================= */

function addPatient(){

let name=document.getElementById("patientName").value;
let disease=document.getElementById("disease").value;
let doctor=document.getElementById("doctor").value;

let medicine=getMedicine(disease);
let history=getHistory(disease);

patients.push({name,disease,doctor,medicine,history});

localStorage.setItem("patients",JSON.stringify(patients));

loadPatients();

}

/* ===============================
   LOAD PATIENTS
================================= */

function loadPatients(data = patients){

table.innerHTML="";

data.forEach((p)=>{

let index = patients.indexOf(p);

let bill = getBill(p.disease);

table.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.disease}</td>
<td>${p.doctor}</td>
<td>${p.medicine}</td>
<td>${p.history}</td>
<td>₹${bill}</td>
<td><button class="deleteBtn" onclick="deletePatient(${index})">Delete</button></td>
</tr>
`;

});

}

/* ===============================
   DELETE PATIENT
================================= */

function deletePatient(i){
patients.splice(i,1);
localStorage.setItem("patients",JSON.stringify(patients));
loadPatients();
}

/* ===============================
   SEARCH PATIENT
================================= */

function searchPatient(){

let value=document.getElementById("searchPatient").value.toLowerCase();

let filtered=patients.filter(p =>
p.name.toLowerCase().includes(value) ||
p.disease.toLowerCase().includes(value)
);

loadPatients(filtered);

}

/* ===============================
   EXCEL DOWNLOAD
================================= */

function downloadExcel(){

const worksheet = XLSX.utils.json_to_sheet(patients);
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"Patients");

XLSX.writeFile(workbook,"Patients.xlsx");

}

/* ===============================
   APPOINTMENTS
================================= */

const appointmentList=document.getElementById("appointmentList");

const autoAppointments=[
"Ramesh appointment with Dr John Smith on 2026-03-12",
"Suresh appointment with Dr Ravi Kumar on 2026-03-12",
"Priya appointment with Dr Priya Sharma on 2026-03-13",
"Kiran appointment with Dr David Lee on 2026-03-13",
"Anitha appointment with Dr Anjali Mehta on 2026-03-14",
"Rahul appointment with Dr Rahul Das on 2026-03-14",
"Sneha appointment with Dr Neha Kapoor on 2026-03-15",
"Arjun appointment with Dr Arjun Patel on 2026-03-15",
"Fatima appointment with Dr Sara Khan on 2026-03-16",
"David appointment with Dr Michael Brown on 2026-03-16"
];

autoAppointments.forEach(a=>{
let li=document.createElement("li");
li.innerText=a;
appointmentList.appendChild(li);
});

function bookAppointment(){

let pname=document.getElementById("pname").value;
let dname=document.getElementById("dname").value;
let date=document.getElementById("date").value;

let li=document.createElement("li");

li.innerText=pname+" appointment with "+dname+" on "+date;

appointmentList.appendChild(li);

}

/* ===============================
   INITIAL LOAD
================================= */

loadPatients();

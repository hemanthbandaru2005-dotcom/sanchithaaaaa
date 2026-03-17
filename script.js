/* LOGIN */

function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u==="admin" && p==="1234"){
document.getElementById("loginPage").style.display="none";
document.getElementById("mainSystem").classList.remove("hidden");
}else{
document.getElementById("error").innerText="Invalid Login";
}
}

/* PAGE SWITCH */

function showPage(page){
["dashboard","doctors","patients","appointments"].forEach(p=>{
document.getElementById(p).classList.add("hidden");
});
document.getElementById(page).classList.remove("hidden");
}

/* DOCTORS */

const doctors=[
{name:"Dr John Smith",spec:"Cardiologist",exp:"12 years",phone:"9876543210",photo:"https://randomuser.me/api/portraits/men/11.jpg"},
{name:"Dr Ravi Kumar",spec:"Neurologist",exp:"10 years",phone:"9876543211",photo:"https://randomuser.me/api/portraits/men/12.jpg"},
{name:"Dr Priya Sharma",spec:"Dermatologist",exp:"8 years",phone:"9876543212",photo:"https://randomuser.me/api/portraits/women/13.jpg"},
{name:"Dr David Lee",spec:"Orthopedic",exp:"15 years",phone:"9876543213",photo:"https://randomuser.me/api/portraits/men/14.jpg"},
{name:"Dr Anjali Mehta",spec:"Pediatrician",exp:"7 years",phone:"9876543214",photo:"https://randomuser.me/api/portraits/women/15.jpg"},
{name:"Dr Rahul Das",spec:"Dentist",exp:"9 years",phone:"9876543215",photo:"https://randomuser.me/api/portraits/men/16.jpg"},
{name:"Dr Neha Kapoor",spec:"Psychiatrist",exp:"11 years",phone:"9876543216",photo:"https://randomuser.me/api/portraits/women/17.jpg"},
{name:"Dr Arjun Patel",spec:"Radiologist",exp:"6 years",phone:"9876543217",photo:"https://randomuser.me/api/portraits/men/18.jpg"},
{name:"Dr Sara Khan",spec:"ENT Specialist",exp:"8 years",phone:"9876543218",photo:"https://randomuser.me/api/portraits/women/19.jpg"},
{name:"Dr Michael Brown",spec:"Oncologist",exp:"14 years",phone:"9876543219",photo:"https://randomuser.me/api/portraits/men/20.jpg"}
];

const doctorList=document.getElementById("doctorList");

doctors.forEach((d,i)=>{
doctorList.innerHTML+=`
<div class="card">
<img src="${d.photo}">
<h3>${d.name}</h3>
<p>${d.spec}</p>
<button onclick="viewDoctor(${i})">View Details</button>
</div>
`;
});

function viewDoctor(i){
const d=doctors[i];
document.getElementById("doctorDetails").classList.remove("hidden");
document.getElementById("doctorDetails").innerHTML=`
<img src="${d.photo}">
<h2>${d.name}</h2>
<p><b>Specialization:</b> ${d.spec}</p>
<p><b>Experience:</b> ${d.exp}</p>
<p><b>Phone:</b> ${d.phone}</p>
`;
}

/* PATIENT DATA */

const medicines={
"Fever":"Paracetamol",
"Heart Disease":"Aspirin",
"Cold":"Cetirizine",
"Cancer":"Chemotherapy",
"Fracture":"Pain Killers"
};

const illness=["Fever","Heart Disease","Cold","Cancer","Fracture"];

let patients=[];

for(let i=1;i<=20;i++){
patients.push({
name:"Patient "+i,
disease:illness[i%5],
doctor:doctors[i%5].name,
medicine:medicines[illness[i%5]],
history:"Treatment done and under observation."
});
}

const table=document.getElementById("patientTable");

function loadPatients(data=patients){
table.innerHTML="";
data.forEach((p,index)=>{
let bill=Math.floor(Math.random()*3000)+500;
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

loadPatients();

function deletePatient(i){
patients.splice(i,1);
loadPatients();
}

/* SEARCH */

function searchPatient(){
let value=document.getElementById("searchPatient").value.toLowerCase();
let filtered=patients.filter(p =>
p.name.toLowerCase().includes(value) ||
p.disease.toLowerCase().includes(value)
);
loadPatients(filtered);
}

/* EXCEL */

function downloadExcel(){
const worksheet=XLSX.utils.json_to_sheet(patients);
const workbook=XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook,worksheet,"Patients");
XLSX.writeFile(workbook,"Patients.xlsx");
}

/* APPOINTMENTS */

const appointmentList=document.getElementById("appointmentList");

const autoAppointments=[
"Ramesh appointment with Dr John Smith",
"Suresh appointment with Dr Ravi Kumar",
"Priya appointment with Dr Priya Sharma"
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

let doctors = JSON.parse(localStorage.getItem("doctors")) || []
let patients = JSON.parse(localStorage.getItem("patients")) || []

function login(){

let u=document.getElementById("username").value
let p=document.getElementById("password").value

if(u=="admin" && p=="1234"){
window.location="dashboard.html"
}
else{
alert("Wrong Login")
}

}

/* DOCTOR */

function addDoctor(){

let name=document.getElementById("doctorName").value
let spec=document.getElementById("specialization").value

doctors.push({name,spec})

localStorage.setItem("doctors",JSON.stringify(doctors))

displayDoctors()

}

function displayDoctors(){

let table=document.getElementById("doctorTable")

doctors.forEach(d=>{
let row=table.insertRow()
row.insertCell(0).innerText=d.name
row.insertCell(1).innerText=d.spec
})

}

/* PATIENT */

function addPatient(){

let name=document.getElementById("patientName").value
let age=document.getElementById("patientAge").value
let illness=document.getElementById("illness").value

patients.push({name,age,illness})

localStorage.setItem("patients",JSON.stringify(patients))

displayPatients()

}

function displayPatients(){

let table=document.getElementById("patientTable")

patients.forEach(p=>{
let row=table.insertRow()
row.insertCell(0).innerText=p.name
row.insertCell(1).innerText=p.age
row.insertCell(2).innerText=p.illness
})

}
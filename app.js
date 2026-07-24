const db =
supabase.createClient(

"https://ukxxmxnubxjezkwbbxdr.supabase.co",

"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ"

);



async function loadStudents(){


let {data}=await db

.from("students")

.select("*")

.order("id");



let html="";



data.forEach(s=>{


html+=`

<div class="card">


<h3>

${s.name}

</h3>


<p>
学校：
${s.school||""}
</p>


<p>
专业：
${s.major||""}
</p>


<p>
层次：
${s.level||""}
</p>


<p>
入学：
${s.year||""}
</p>



<button onclick="editStudent(${s.id})">

编辑

</button>



</div>

`;


});



document.getElementById("list")
.innerHTML=html;


}



function openAdd(){

document.getElementById("modal")
.style.display="block";

}



function closeModal(){

document.getElementById("modal")
.style.display="none";

}




async function saveStudent(){


await db.from("students")
.insert({

name:name.value,

school:school.value,

phone:phone.value,

major:major.value,

level:level.value,

year:year.value

});


closeModal();

loadStudents();


}




function openYearFilter(){

document.getElementById("yearModal")
.style.display="block";

}



function closeYearFilter(){

document.getElementById("yearModal")
.style.display="none";

}




async function filterByYear(year){


let {data}=await db

.from("students")

.select("*")

.ilike(
"year",
`%${year}%`
);



let html="";


data.forEach(s=>{


html+=`

<div class="card">

<h3>${s.name}</h3>

<p>
学校:${s.school}
</p>

<p>
入学:${s.year}
</p>


</div>

`;

});


document.getElementById("list")
.innerHTML=html;


closeYearFilter();


}



function searchStudent(){

loadStudents();

}



loadStudents();

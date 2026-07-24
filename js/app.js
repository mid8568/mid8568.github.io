const db =
supabase.createClient(

"https://ukxxmxnubxjezkwbbxdr.supabase.co",

"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ"

);



let editId=null;



//====================
//加载学生
//====================

async function loadStudents(){


let {data,error}=await db

.from("students")

.select("*")

.order("id");


if(error){

alert(error.message);

return;

}



let html="";



data.forEach(s=>{


html+=`

<div class="card">


<h3>
${s.name||""}
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



document.getElementById("list").innerHTML=html;


}






//====================
//打开添加
//====================

function openAdd(){

editId=null;


document.getElementById("modal")
.style.display="block";


}






function closeModal(){

document.getElementById("modal")
.style.display="none";


}








//====================
//保存学生
//====================

async function saveStudent(){



let obj={


name:
document.getElementById("name").value,


school:
document.getElementById("school").value,


phone:
document.getElementById("phone").value,


major:
document.getElementById("major").value,


level:
document.getElementById("level").value,


year:
document.getElementById("year").value


};




let result;



//编辑

if(editId){


result=
await db

.from("students")

.update(obj)

.eq("id",editId);



}



//新增

else{


result=
await db

.from("students")

.insert(obj);


}




if(result.error){


alert(result.error.message);


return;


}



alert("保存成功");


closeModal();


loadStudents();


}









//====================
//编辑学生
//====================


async function editStudent(id){


if(!id){


alert("学生ID为空");


return;


}



let {data,error}=await db

.from("students")

.select("*")

.eq("id",id)

.single();



if(error){


alert(error.message);


return;


}



editId=id;



document.getElementById("name").value=
data.name||"";


document.getElementById("school").value=
data.school||"";


document.getElementById("phone").value=
data.phone||"";


document.getElementById("major").value=
data.major||"";


document.getElementById("level").value=
data.level||"";


document.getElementById("year").value=
data.year||"";



document.getElementById("modal")
.style.display="block";


}








//====================
//年份筛选
//====================


function openYearFilter(){

document.getElementById("yearModal")
.style.display="block";


}



function closeYearFilter(){

document.getElementById("yearModal")
.style.display="none";


}




async function filterByYear(year){


let {data,error}=await db

.from("students")

.select("*")

.ilike(
"year",
`%${year}%`
);



if(error){

alert(error.message);

return;

}



let html="";



data.forEach(s=>{


html+=`

<div class="card">


<h3>
${s.name||""}
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

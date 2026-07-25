//====================
// Supabase
//====================

const SUPABASE_URL =
"https://ukxxmxnubxjezkwbbxdr.supabase.co";


const SUPABASE_KEY =
"sb_publishable_2IFHfms3ombozpvZCvaeEg_2VZ2z5hJ";


const db =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);




//====================
// 全局
//====================

let editId=null;

let currentPage=1;

let pageSize=10;

let totalPages=1;


let currentType="成高";

let graduateMode=false;





//====================
// 登录检查
//====================


async function checkLogin(){


let {data}=await db.auth.getSession();


if(!data.session){

location.href="login.html";

return;

}


loadStudents();


}







//====================
// 成高学生
//====================


function showNormal(){


currentType="成高";

graduateMode=false;

currentPage=1;


document.getElementById("pageTitle").innerHTML=
"成高学生管理";


loadStudents();


}







//====================
// 自考学生
//====================


function showSelfStudy(){


currentType="自考";

graduateMode=false;

currentPage=1;


document.getElementById("pageTitle").innerHTML=
"自考学生管理";


loadStudents();


}








//====================
// 加载学生
//====================


async function loadStudents(){


let keyword=
document.getElementById("search").value.trim();



let start=
(currentPage-1)*pageSize;


let end=
start+pageSize-1;



let query=db

.from("students")

.select("*",{count:"exact"})

.eq("type",currentType)

.order("id");



if(keyword){


query=query.or(

`name.ilike.%${keyword}%,phone.ilike.%${keyword}%,major.ilike.%${keyword}%`

);


}



let {data,count,error}=

await query.range(start,end);



if(error){

alert(error.message);

return;

}



totalPages=
Math.ceil(count/pageSize)||1;



let html="";



data.forEach(s=>{


html+=`

<tr>


<td>

<span
class="name-text"
onclick="showStudent(${s.id})">

${s.name||""}

</span>


</td>



<td>

${s.school||""}

</td>



<td>

${s.phone||""}

</td>



<td>

${s.major||""}

</td>



<td>

${s.level||""}

</td>



<td>

${s.year||""}

</td>



<td>


<button onclick="editStudent(${s.id})">

编辑

</button>



<button onclick="graduateStudent(${s.id})">

毕业

</button>



</td>


</tr>


`;


});



document.getElementById("list").innerHTML=html;



document.getElementById("pageInfo").innerHTML=

`第 ${currentPage}/${totalPages} 页`;



document.getElementById("totalInfo").innerHTML=

`人数：${count}`;


}









//====================
// 搜索
//====================


function searchStudent(){

currentPage=1;

loadStudents();

}








//====================
// 分页
//====================


function nextPage(){


if(currentPage<totalPages){

currentPage++;

loadStudents();

}


}




function prevPage(){


if(currentPage>1){

currentPage--;

loadStudents();

}


}










//====================
// 添加
//====================


function openAdd(){


editId=null;


document.getElementById("title").innerHTML=
"添加学生";


document.getElementById("modal").style.display=
"block";


}






function closeModal(){


document.getElementById("modal").style.display=
"none";


}









//====================
// 保存
//====================


async function saveStudent(){


let obj={


name:
name.value,


school:
school.value,


phone:
phone.value,


major:
major.value,


level:
level.value,


year:
year.value,


type:
currentType,


status:"在读"


};



let result;


if(editId){


result=
await db

.from("students")

.update(obj)

.eq("id",editId);



}else{


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
// 编辑
//====================


async function editStudent(id){


let {data}=await db

.from("students")

.select("*")

.eq("id",id)

.single();



editId=id;



name.value=data.name;

school.value=data.school;

phone.value=data.phone;

major.value=data.major;

level.value=data.level;

year.value=data.year;



document.getElementById("title").innerHTML=
"编辑学生";


document.getElementById("modal").style.display=
"block";


}








//====================
// 毕业
//====================


async function graduateStudent(id){


await db

.from("students")

.update({

status:"毕业"

})

.eq("id",id);



alert("已进入毕业名单");


loadStudents();


}









//====================
// 已毕业
//====================


async function showGraduated(){


graduateMode=true;


document.getElementById("pageTitle").innerHTML=
"已毕业学生";


let {data,count}=await db

.from("students")

.select("*",{count:"exact"})

.eq("status","毕业")

.order("id");



let html="";



data.forEach(s=>{


html+=`

<tr>

<td onclick="showStudent(${s.id})">

${s.name}

</td>

<td>${s.school||""}</td>

<td>${s.phone||""}</td>

<td>${s.major||""}</td>

<td>${s.level||""}</td>

<td>${s.year||""}</td>

<td></td>

</tr>


`;

});



document.getElementById("list").innerHTML=html;



document.getElementById("totalInfo").innerHTML=
"毕业人数："+count;


}








//====================
// 查看详情
//====================


async function showStudent(id){


let {data}=await db

.from("students")

.select("*")

.eq("id",id)

.single();



d_name.innerHTML=data.name;

d_school.innerHTML=data.school;

d_phone.innerHTML=data.phone;

d_major.innerHTML=data.major;

d_level.innerHTML=data.level;

d_year.innerHTML=data.year;



detailModal.style.display="block";


}




function closeDetail(){


detailModal.style.display="none";


}








//====================
// 退出
//====================


async function logout(){


await db.auth.signOut();


location.href="login.html";


}








//启动


checkLogin();

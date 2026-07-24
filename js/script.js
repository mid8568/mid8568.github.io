//====================
// Supabase配置
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
// 全局变量
//====================

let editId = null;

let currentPage = 1;

let pageSize = 50;

let totalPages = 1;



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
// 加载学生
//====================

async function loadStudents(){


let keyword =
document.getElementById("search").value.trim();



let start =
(currentPage-1)*pageSize;


let end =
start+pageSize-1;



let query =
db
.from("students")
.select("*",{count:"exact"})
.order("id");



if(keyword){

query=query.or(
`name.ilike.%${keyword}%,school.ilike.%${keyword}%,phone.ilike.%${keyword}%,major.ilike.%${keyword}%,gender.ilike.%${keyword}%,year.ilike.%${keyword}%`
);

}



let {data,count,error}=

await query.range(start,end);



if(error){

alert(error.message);

return;

}



totalPages=Math.ceil(count/pageSize)||1;



let html="";



data.forEach(s=>{


html+=`

<tr>


<td>

<button 
class="name-btn"
onclick="showStudent(${s.id})">

${s.name||""}

</button>

</td>



<td class="pc-col">
${s.school||""}
</td>



<td class="pc-col">
${s.idcard||""}
</td>



<td>
${s.phone||""}
</td>



<td class="pc-col">
${s.gender||""}
</td>



<td>
${s.major||""}
</td>



<td>
${s.level||""}
</td>



<td class="pc-col">
${s.year||""}
</td>



<td class="pc-col">

<button 
class="edit"
onclick="editStudent(${s.id})">

编辑

</button>

</td>


</tr>

`;

});



document.getElementById("list").innerHTML=html;



document.getElementById("pageInfo").innerHTML=

`第 ${currentPage} / ${totalPages} 页`;


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
// 添加学生
//====================

function openAdd(){


editId=null;


clearForm();


document.getElementById("title").innerHTML="添加学生";


document.getElementById("modal").style.display="block";


}



function closeModal(){


document.getElementById("modal")
.style.display="none";


}



function clearForm(){


document.querySelectorAll("#modal input")
.forEach(i=>i.value="");


}



//====================
// 编辑学生
//====================

async function editStudent(id){


let {data,error}=await client
.from("students")
.select("*");


if(error){

console.log(error);
return;

}


//显示学生总人数
document.getElementById("totalInfo").innerHTML =
"总人数：" + (data ? data.length : 0) + "人";

.eq("id",id)

.single();



if(error){

alert(error.message);

return;

}



editId=id;



[
"name",
"school",
"idcard",
"phone",
"gender",
"major",
"level",
"year"

].forEach(k=>{


document.getElementById(k).value=data[k]||"";


});



document.getElementById("title")
.innerHTML="编辑学生";


document.getElementById("modal")
.style.display="block";


}



//====================
// 保存学生
//====================

async function saveStudent(){



let obj={


name:document.getElementById("name").value,

school:document.getElementById("school").value,

idcard:document.getElementById("idcard").value,

phone:document.getElementById("phone").value,

gender:document.getElementById("gender").value,

major:document.getElementById("major").value,

level:document.getElementById("level").value,

year:document.getElementById("year").value


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


}else{


alert("保存成功");


closeModal();


loadStudents();


}


}



//====================
// 查看详情
//====================

async function showStudent(id){
  
if(!id){

alert("学生ID不存在");

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



d_name.innerHTML=data.name||"";

d_school.innerHTML=data.school||"";

d_idcard.innerHTML=data.idcard||"";

d_phone.innerHTML=data.phone||"";

d_gender.innerHTML=data.gender||"";

d_major.innerHTML=data.major||"";

d_level.innerHTML=data.level||"";

d_year.innerHTML=data.year||"";



detailModal.style.display="block";


}



function closeDetail(){


detailModal.style.display="none";


}




//====================
// Excel导入
//====================

async function importExcel(){


let file=

document.getElementById("excelFile")
.files[0];


if(!file){

alert("请选择Excel文件");

return;

}



let reader=new FileReader();



reader.onload=async function(e){


let workbook=XLSX.read(

new Uint8Array(e.target.result),

{type:"array"}

);



let sheet=

workbook.Sheets[
workbook.SheetNames[0]
];



let rows=

XLSX.utils.sheet_to_json(sheet);



let list=rows.map(r=>({


name:String(r["姓名"]||""),

school:String(r["学校"]||""),

idcard:String(r["身份证号码"]||""),

phone:String(r["手机号"]||""),

gender:String(r["性别"]||""),

major:String(r["专业"]||""),

level:String(r["层次"]||""),

year:String(r["入学时间"]||"")


}));



let {error}=await db

.from("students")

.insert(list);



if(error){

alert(error.message);


}else{


alert("导入成功："+list.length+"条");


loadStudents();


}


};



reader.readAsArrayBuffer(file);


}



//====================
// Excel导出
//====================

async function exportExcel(){


let {data,error}=await db

.from("students")

.select("*")

.order("id");



if(error){

alert(error.message);

return;

}



let list=data.map(s=>({


ID:s.id,

姓名:s.name,

学校:s.school,

身份证号码:s.idcard,

手机号:s.phone,

性别:s.gender,

专业:s.major,

层次:s.level,

入学时间:s.year


}));



let ws=

XLSX.utils.json_to_sheet(list);


let wb=

XLSX.utils.book_new();



XLSX.utils.book_append_sheet(

wb,

ws,

"学生名单"

);



XLSX.writeFile(

wb,

"学生名单.xlsx"

);


}



//====================
// 年份筛选
//====================

async function openYearFilter(){


let {data,error}=await db

.from("students")

.select("year");



if(error){

alert(error.message);

return;

}



let years=[

...new Set(

data

.map(x=>x.year)

.filter(Boolean)

)

];



let html="";


years.forEach(y=>{


html+=`

<button onclick="filterByYear('${y}')">

${y}

</button>

<br><br>

`;

});



yearList.innerHTML=html;


yearModal.style.display="block";


}



function closeYearFilter(){


yearModal.style.display="none";


}



//====================
// 按年份筛选
//====================

async function filterByYear(year){


let {data,error}=await db
.from("students")
.select("*")
.eq("year",year)
.order("id");


if(error){

alert(error.message);

return;

}



let html="";


data.forEach(s=>{


html+=`

<tr>

<td>

<button 
class="name-btn"
onclick="showStudent(${s.id})">

${s.name||""}

</button>

</td>


<td class="pc-col">
${s.school||""}
</td>


<td class="pc-col">
${s.idcard||""}
</td>


<td>
${s.phone||""}
</td>


<td class="pc-col">
${s.gender||""}
</td>


<td>
${s.major||""}
</td>


<td>
${s.level||""}
</td>


<td class="pc-col">
${s.year||""}
</td>


<td class="pc-col">

<button 
class="edit"
onclick="editStudent(${s.id})">

编辑

</button>

</td>


</tr>

`;

});


document.getElementById("list").innerHTML=html;


document.getElementById("pageInfo").innerHTML=
`筛选：${year} 共 ${data.length} 人`;


closeYearFilter();


}


//====================
// 退出登录
//====================

async function logout(){


await db.auth.signOut();


location.href="login.html";


}



//====================
// 启动
//====================

checkLogin();
//====================
// 首页
//====================

// 当前网站首页
function goHome(){

    // 返回网站首页 index.html
    window.location.href = "students.html";

}

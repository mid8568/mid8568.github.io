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

let currentTable="students_chenggao";

let currentPage=1;

let pageSize=10;

let totalPages=1;


let graduatePage=1;

let graduateTotalPages=1;


let showGraduate=false;


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
// 分类切换
//====================

function loadCategory(type){


showGraduate=false;

currentPage=1;


if(type=="成高"){


currentTable="students_chenggao";


document.getElementById("pageTitle").innerHTML=
"成高学生";


}



if(type=="自考"){


currentTable="students_zikao";


document.getElementById("pageTitle").innerHTML=
"自考学生";


}


loadStudents();


}



//====================
// 成高
//====================

function loadAdult(){


currentTable="students_chenggao";

showGraduate=false;

currentPage=1;


loadStudents();


}



//====================
// 自考
//====================

function loadSelf(){


currentTable="students_zikao";

showGraduate=false;

currentPage=1;


loadStudents();


}




//====================
// 表头切换
//====================

function changeTableHead(){


let head=document.getElementById("tableHead");



if(!head)return;



if(currentTable=="students_chenggao"){


head.innerHTML=`

<tr>

<th>
姓名
</th>


<th class="pc-col">
学校
</th>


<th class="pc-col">
身份证
</th>


<th>
手机号
</th>


<th>
专业
</th>


<th>
层次
</th>

<th>
状态
</th>

<th class="pc-col">
入学时间
</th>


<th class="pc-col">
操作
</th>


</tr>

`;



}else{


head.innerHTML=`

<tr>


<th class="pc-col">
旧准考证
</th>


<th class="pc-col">
准考证
</th>


<th>
姓名
</th>


<th class="pc-col">
身份证
</th>


<th>
手机号
</th>


<th>
专业
</th>


</tr>

`;

}


}




//====================
// 加载学生
//====================

async function loadStudents(){


showGraduate=false;


changeTableHead();



let keyword=
document.getElementById("search").value.trim();



let start=
(currentPage-1)*pageSize;


let end=
start+pageSize-1;




let query=db

.from(currentTable)

.select("*",{count:"exact"});





if(currentTable=="students_chenggao"){

query=query.eq(
"status",
"在读"
);

}




query=query.order("id");





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


${
currentTable=="students_zikao"
?
`

<td class="pc-col">

${s.oldidno||""}

</td>


<td class="pc-col">

${s.idno||""}

</td>

`
:
""
}



<td>

<span

class="name-text"

onclick="showStudent(${s.id})">

${s.name||""}

</span>

</td>





${
currentTable=="students_chenggao"
?
`

<td class="pc-col">

${s.school||""}

</td>

`
:
""
}




<td class="pc-col">

${s.idcard||""}

</td>





<td>

${s.phone||""}

</td>





<td>

${s.major||""}

</td>





${
currentTable=="students_chenggao"
?
`

<td>

${s.level||""}

</td>

<td>

${s.status||"在读"}

</td>

<td class="pc-col">

${s.year||""}

</td>


<td class="pc-col">

<button onclick="graduateStudent(${s.id})">

毕业

</button>

</td>

`
:
""
}



</tr>

`;

});



document.getElementById("list").innerHTML=html;



document.getElementById("pageInfo").innerHTML=

`第 ${currentPage}/${totalPages} 页`;



document.getElementById("totalInfo").innerHTML=

`总人数：${count}人`;



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


if(showGraduate){


if(graduatePage < graduateTotalPages){

graduatePage++;

showGraduated(false);

}


return;

}




if(currentPage < totalPages){

currentPage++;

loadStudents();

}


}





function prevPage(){


if(showGraduate){


if(graduatePage>1){

graduatePage--;

showGraduated(false);

}


return;

}




if(currentPage>1){

currentPage--;

loadStudents();

}


}





//====================
// 编辑学生
//====================

async function editStudent(id){


let {data,error}=await db

.from(currentTable)

.select("*")

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
"major",
"level",
"year"

].forEach(k=>{


let el=document.getElementById(k);


if(el){

el.value=data[k]||"";

}


});




document.getElementById("title").innerHTML="编辑学生";


document.getElementById("modal").style.display="block";


}





//====================
// 关闭编辑
//====================

function closeModal(){


document.getElementById("modal")
.style.display="none";


}






//====================
// 查看详情
//====================

async function showStudent(id){



let {data,error}=await db

.from(currentTable)

.select("*")

.eq("id",id)

.single();




if(error){

alert(error.message);

return;

}




document.getElementById("d_name").innerHTML=
data.name||"";



document.getElementById("d_school").innerHTML=
data.school||"";



document.getElementById("d_idcard").innerHTML=
data.idcard||"";



document.getElementById("d_phone").innerHTML=
data.phone||"";



document.getElementById("d_major").innerHTML=
data.major||"";



document.getElementById("d_level").innerHTML=
data.level||"";



document.getElementById("d_year").innerHTML=
data.year||"";





document.getElementById("detailModal")
.style.display="block";



}





function closeDetail(){


document.getElementById("detailModal")
.style.display="none";


}





//====================
// Excel导入
//====================

async function importExcel(){



let file=
document.getElementById("excelFile").files[0];



if(!file){

alert("请选择Excel文件");

return;

}



let reader=new FileReader();



reader.onload=async function(e){



let workbook=XLSX.read(

new Uint8Array(e.target.result),

{
type:"array"
}

);




let sheet=

workbook.Sheets[
workbook.SheetNames[0]
];




let rows=

XLSX.utils.sheet_to_json(sheet);




let list=[];




//====================
// 成高
//====================

if(currentTable=="students_chenggao"){



list=rows.map(r=>({


name:String(r["姓名"]||""),


school:String(r["学校"]||""),


idcard:String(r["身份证号码"]||""),


phone:String(r["手机号"]||""),


major:String(r["专业"]||""),


level:String(r["层次"]||""),


year:String(r["入学时间"]||""),


status:"在读"


}));


}




//====================
// 自考
//====================

if(currentTable=="students_zikao"){



list=rows.map(r=>({


oldidno:String(r["旧准考证"]||""),


idno:String(r["准考证"]||""),


name:String(r["姓名"]||""),


idcard:String(r["身份证号码"]||""),


phone:String(r["手机号"]||""),


major:String(r["专业"]||"")


}));


}





let {error}=await db

.from(currentTable)

.insert(list);




if(error){

alert(error.message);

return;

}



alert(

(currentTable=="students_chenggao"
?
"成高"
:
"自考")

+

"导入成功："+list.length+"条"

);




loadStudents();



};



reader.readAsArrayBuffer(file);



}





//====================
// Excel导出
//====================

async function exportExcel(){



let {data,error}=await db

.from(currentTable)

.select("*")

.order("id");




if(error){

alert(error.message);

return;

}




let list=[];




if(currentTable=="students_chenggao"){



list=data.map(s=>({


姓名:s.name,

学校:s.school,

身份证号码:s.idcard,

手机号:s.phone,

专业:s.major,

层次:s.level,

入学时间:s.year,

状态:s.status||"在读"


}));



}else{



list=data.map(s=>({


旧准考证:s.oldidno,

准考证:s.idno,

姓名:s.name,

身份证号码:s.idcard,

手机号:s.phone,

专业:s.major


}));



}





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
// 学生毕业
//====================

async function graduateStudent(id){


let ok=confirm(

"确定移动到毕业名单吗？"

);



if(!ok){

return;

}




let {error}=await db

.from(currentTable)

.update({

status:"毕业"

})

.eq("id",id);





if(error){

alert(error.message);

return;

}



alert("已进入毕业名单");



loadStudents();



}





//====================
// 按年份筛选
//====================

async function filterByYear(year){



let {data,error}=await db

.from(currentTable)

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



${
currentTable=="students_zikao"
?
`

<td class="pc-col">

${s.oldidno||""}

</td>


<td class="pc-col">

${s.idno||""}

</td>

`
:
""
}




<td>

<span

class="name-text"

onclick="showStudent(${s.id})">

${s.name||""}

</span>

</td>




${
currentTable=="students_chenggao"
?
`

<td class="pc-col">

${s.school||""}

</td>

`
:
""
}




<td class="pc-col">

${s.idcard||""}

</td>




<td>

${s.phone||""}

</td>




<td>

${s.major||""}

</td>




${
currentTable=="students_chenggao"
?
`

<td>

${s.level||""}

</td>


<td class="pc-col">

${s.year||""}

</td>


<td class="pc-col">

<button onclick="graduateStudent(${s.id})">

毕业

</button>

</td>

`
:
""
}



</tr>

`;

});





document.getElementById("list").innerHTML=html;



document.getElementById("pageInfo").innerHTML=

`筛选：${year} 共 ${data.length} 人`;



document.getElementById("totalInfo").innerHTML=

`总人数：${data.length}人`;



document.getElementById("yearList").innerHTML="";



}





//====================
// 展开成高年份
//====================

async function toggleChenggao(){



currentTable="students_chenggao";



document.getElementById("pageTitle").innerHTML=

"成高学生";



let box=

document.getElementById("chenggaoYears");





if(box.innerHTML!=""){


box.innerHTML="";


return;


}




let {data,error}=await db

.from("students_chenggao")

.select("year");




if(error){

alert(error.message);

return;

}




let years=[

...new Set(

data

.map(s=>s.year)

.filter(Boolean)

)

];





years.sort((a,b)=>Number(b)-Number(a));





let html="";



years.forEach(y=>{


html+=`

<li onclick="filterByYear('${y}')">

${y}级

</li>

`;


});




box.innerHTML=html;



loadStudents();



}







//====================
// 显示年份
//====================

async function showYearList(){



let {data,error}=await db

.from(currentTable)

.select("year");




if(error){

alert(error.message);

return;

}





let years=[

...new Set(

data

.map(s=>s.year)

.filter(Boolean)

)

];




years.sort((a,b)=>Number(b)-Number(a));




let html="";



years.forEach(y=>{


html+=`

<button

onclick="filterByYear('${y}')">

${y}

</button>

`;


});




document.getElementById("yearFilter").innerHTML=html;



}





//====================
// 已毕业名单
//====================

async function showGraduated(reset=true){



if(reset){

graduatePage=1;

}





let start=

(graduatePage-1)*pageSize;



let end=

start+pageSize-1;





let {data,count,error}=await db

.from(currentTable)

.select("*",{count:"exact"})

.eq("status","毕业")

.order("id")

.range(start,end);





if(error){

alert(error.message);

return;

}





graduateTotalPages=

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



<td class="pc-col">

${s.school||""}

</td>



<td class="pc-col">

${s.idcard||""}

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



<td class="pc-col">

${s.year||""}

</td>



</tr>

`;

});






document.getElementById("list").innerHTML=html;



document.getElementById("pageInfo").innerHTML=

`毕业名单 第 ${graduatePage}/${graduateTotalPages} 页`;



document.getElementById("totalInfo").innerHTML=

`毕业人数：${count}人`;



}





//====================
// 退出登录
//====================

async function logout(){



await db.auth.signOut();



location.href="login.html";



}







//====================
// 首页
//====================

function goHome(){


location.href="students_chenggao.html";


}





//====================
// 返回
//====================

function goBack(){


history.back();


}







//====================
// 启动
//====================

checkLogin();

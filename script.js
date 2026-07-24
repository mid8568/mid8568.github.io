//====================
// 打开入学时间筛选
//====================

async function openYearFilter(){


let {data,error}=await db
.from("students")
.select("year");


if(error){

alert(error.message);

return;

}


// 获取数据库已有年份

let years=[

...new Set(

data
.map(s=>s.year)
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


document.getElementById("yearList").innerHTML=html;



document.getElementById("yearModal")
.style.display="block";


}




//====================
// 关闭入学时间筛选
//====================


function closeYearFilter(){


document.getElementById("yearModal")
.style.display="none";


}




//====================
// 按年份筛选
//====================


async function filterByYear(year){



let {data,error}=await db

.from("students")

.select("*")

.ilike(
"year",
`%${year}%`
)

.order("id");



if(error){

alert(error.message);

return;

}



let html="";


data.forEach(s=>{


html+=`

<tr>

<td>${s.id||""}</td>


<td>

<a onclick="showStudent(${s.id})">

${s.name||""}

</a>

</td>


<td>${s.school||""}</td>


<td>${s.idcard||""}</td>


<td>${s.phone||""}</td>


<td>${s.gender||""}</td>


<td>${s.major||""}</td>


<td>${s.level||""}</td>


<td>${s.year||""}</td>


<td>

<button onclick="editStudent(${s.id})">

编辑

</button>

</td>


</tr>

`;

});



document.getElementById("list").innerHTML=html;



closeYearFilter();


}

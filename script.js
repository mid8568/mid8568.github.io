// 打开入学时间筛选

async function openYearFilter(){


let {data,error}=await db

.from("students")

.select("year");



if(error){

alert(error.message);

return;

}


// 去重

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

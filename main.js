// main.js - optimized version

let searchTimeout;

// تعريف البيانات مرة واحدة
const defaultSummaries = [
{ name:"ملخص الوحدة الأولى - الأحياء",course:"biology"},
{ name:"ملخص الوحدة الثانية - الأحياء",course:"biology"},
{ name:"ملخص الوحدة الأولى - الكيمياء",course:"chemistry"},
{ name:"ملخص الوحدة الثانية - الكيمياء",course:"chemistry"},
{ name:"ملخص الوحدة الأولى - الفيزياء",course:"physics"},
{ name:"ملخص الوحدة الأولى - التشريح",course:"anatomy"},
{ name:"ملخص المصطلحات الطبية",course:"med_terms"},
{ name:"ملخص العقيدة الإسلامية",course:"physiology"},
{ name:"ملخص اللغة العربية",course:"biochemistry"},
{ name:"ملخص القضية الفلسطينية",course:"anatomy"}
];

const defaultExams = [
{ name:"اختبار قصير 1 - الأحياء",course:"biology"},
{ name:"اختبار منتصف الفصل - الأحياء",course:"biology"},
{ name:"اختبار نهائي - الأحياء",course:"biology"},
{ name:"اختبار قصير 1 - الكيمياء",course:"chemistry"},
{ name:"اختبار منتصف الفصل - الكيمياء",course:"chemistry"},
{ name:"اختبار قصير 1 - الفيزياء",course:"physics"},
{ name:"اختبار عملي - التشريح",course:"anatomy"},
{ name:"اختبار نظري - التشريح",course:"anatomy"},
{ name:"اختبار شامل - المصطلحات الطبية",course:"med_terms"},
{ name:"اختبار منتصف الفصل - العقيدة",course:"physiology"}
];

window.globalSearch=function(val){
clearTimeout(searchTimeout);

searchTimeout=setTimeout(()=>{
performSearch(val)
},300)
}

function performSearch(val){

val=val.toLowerCase().trim()

if(!val||val.length<2){
showDashboard()
return
}

let results=[]
let booksResults=[]
let lecturesResults=[]
let summariesResults=[]
let examsResults=[]

const courseKeys=Object.keys(courses)

for(let key of courseKeys){

const course=courses[key]

if(
course.title.toLowerCase().includes(val)||
course.code.toLowerCase().includes(val)
){
results.push({
type:"course",
courseKey:key,
title:course.title,
code:course.code,
icon:course.icon,
semester:course.semester,
match:`المساق: ${course.title}`
})
}

if(course.books){
for(let book of course.books){
if(book.name.toLowerCase().includes(val)){
booksResults.push({
type:"book",
courseKey:key,
courseTitle:course.title,
title:book.name,
link:book.link,
coming:book.coming||false,
match:`📚 كتاب: ${book.name}`
})
}
}
}

if(course.lectures){
for(let lecture of course.lectures){
if(lecture.name.toLowerCase().includes(val)){
lecturesResults.push({
type:"lecture",
courseKey:key,
courseTitle:course.title,
title:lecture.name,
link:lecture.link,
lectureType:lecture.type,
match:`🎥 محاضرة: ${lecture.name}`
})
}
}
}

}

for(let summary of defaultSummaries){
if(summary.name.toLowerCase().includes(val)){
summariesResults.push({
type:"summary",
courseKey:summary.course,
courseTitle:courses[summary.course]?.title||"مساق عام",
title:summary.name,
match:`📝 ملخص: ${summary.name}`
})
}
}

for(let exam of defaultExams){
if(exam.name.toLowerCase().includes(val)){
examsResults.push({
type:"exam",
courseKey:exam.course,
courseTitle:courses[exam.course]?.title||"مساق عام",
title:exam.name,
match:`📋 اختبار: ${exam.name}`
})
}
}

const totalResults=[
...results,
...booksResults,
...lecturesResults,
...summariesResults,
...examsResults
]

let htmlParts=[]

htmlParts.push(getBackButton(getDashboardLink()))
htmlParts.push(getWhatsAppLink())

htmlParts.push(`
<h2 class="course-title">
<i class="fas fa-search"></i>
نتائج البحث عن "${val}" (${totalResults.length})
</h2>
`)

if(totalResults.length===0){

htmlParts.push(`
<div class="card" style="text-align:center;padding:40px 20px;">
<i class="fas fa-frown" style="font-size:4rem;color:#95a5a6;margin-bottom:20px;"></i>
<h3 style="color:#7f8c8d;margin-bottom:10px;font-size:1.5rem;">لا توجد نتائج</h3>
<p style="color:#95a5a6;font-size:1.1rem;">جرب كلمات بحث أخرى</p>
</div>
`)

}else{

htmlParts.push(`<div class="search-results">`)

results.forEach(result=>{
htmlParts.push(`
<a href="${getCourseLink(result.courseKey,"books")}" class="course-card-link">
<div class="course-card">
<i class="fas ${result.icon}"></i>
<h4>${result.title}</h4>
<span class="code">${result.code}</span>
<div class="match-badge">${result.match}</div>
</div>
</a>
`)
})

htmlParts.push(`</div>`)

}

animatePage(htmlParts.join(""))
}

function getSiteStats(){

let totalBooks=0
let totalLectures=0
let totalCourses=Object.keys(courses).length

Object.keys(courses).forEach(key=>{
totalBooks+=courses[key].books?.length||0
totalLectures+=courses[key].lectures?.length||0
})

return{
courses:totalCourses,
books:totalBooks,
lectures:totalLectures,
summaries:15,
exams:12
}

}

document.addEventListener("DOMContentLoaded",function(){

addAdditionalStyles()
setupSearchInput()
handleInitialLoad()

})

function setupSearchInput(){

const searchInput=document.getElementById("search")

if(!searchInput)return

searchInput.addEventListener("keyup",function(e){

if(e.key==="Escape"){
this.value=""
showDashboard()
}

})

searchInput.setAttribute("autocomplete","off")
searchInput.setAttribute("spellcheck","false")

}

window.getSiteStats=getSiteStats
window.performSearch=performSearch

// app.js - النسخة المحسنة
// تحسين الأداء وإزالة التكرار

'use strict';

// ===================== تحديث الصفحة =====================
function animatePage(html) {
    const mainElement = document.getElementById("main");
    if (!mainElement) return;

    mainElement.innerHTML = html;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ===================== لوحة التحكم =====================
function showDashboard() {

    const stats = getSiteStats();

    const html = `
    <h1 class="page-title">
        <i class="fas fa-crown"></i>
        جامعة الأقصى
        <i class="fas fa-crown"></i>
    </h1>

    <div class="quick-stats">
        <div class="stat-item">
            <i class="fas fa-book"></i>
            <span>${stats.books} كتاب</span>
        </div>

        <div class="stat-item">
            <i class="fas fa-video"></i>
            <span>${stats.lectures} محاضرة</span>
        </div>

        <div class="stat-item">
            <i class="fas fa-university"></i>
            <span>${stats.courses} مساق</span>
        </div>
    </div>

    ${getWhatsAppLink()}
    ${getMartyrDedication()}

    <div class="card" style="margin-bottom:20px" onclick="showDashboard()">
        <i class="fas fa-user-nurse"></i>
        <h2>تمريض - سنة أولى</h2>
        <span class="code">البرنامج التمريضي</span>
    </div>

    <div class="grid">

        <a href="${getSemesterLink(1)}" class="card-link">
            <div class="card">
                <i class="fas fa-calendar-alt"></i>
                <h3>الفصل الأول</h3>
                <span class="code">7 مساقات</span>
            </div>
        </a>

        <a href="${getSemesterLink(2)}" class="card-link">
            <div class="card">
                <i class="fas fa-calendar-check"></i>
                <h3>الفصل الثاني</h3>
                <span class="code">7 مساقات</span>
            </div>
        </a>

    </div>
    `;

    animatePage(html);
}

// ===================== عرض الفصل =====================
function showSemester(sem) {

    const list = sem === 1 ? semester1Courses : semester2Courses;
    const semesterName = sem === 1 ? "الأول" : "الثاني";

    let html = `
    ${getBackButton(getDashboardLink())}
    ${getWhatsAppLink()}

    <h2 class="course-title">
        <i class="fas ${sem === 1 ? "fa-calendar-alt" : "fa-calendar-check"}"></i>
        الفصل ${semesterName}
    </h2>

    <div class="grid">
    `;

    list.forEach(key => {

        const course = courses[key];

        const hasBooks = course.books && course.books.length > 0;
        const hasLectures = course.lectures && course.lectures.length > 0;

        const available = [];

        if (hasBooks) available.push("📚 كتب");
        if (hasLectures) available.push("🎥 محاضرات");

        html += `
        <a href="${getCourseLink(key,"books")}" class="card-link">

            <div class="card">

                <i class="fas ${course.icon}"></i>

                <h3>${course.title}</h3>

                <span class="code">${course.code}</span>

                ${
                    available.length
                    ? `<div class="course-meta">${available.join(" • ")}</div>`
                    : `<div class="course-meta coming">⏳ قريباً</div>`
                }

            </div>

        </a>
        `;
    });

    html += `</div>`;

    animatePage(html);
}

// ===================== عرض المساق =====================
function showCourse(key, tab) {

    const course = courses[key];

    const semester = course.semester === 1 ? "1" : "2";

    const booksCount =
        course.books?.filter(b => !b.coming).length || 0;

    const lecturesCount =
        course.lectures?.length || 0;

    const totalContent =
        booksCount + lecturesCount;

    const html = `
    ${getBackButton(getSemesterLink(semester))}
    ${getWhatsAppLink()}

    <h2 class="course-title">
        <i class="fas ${course.icon}"></i>
        ${course.title}
    </h2>

    <div class="course-info">

        <div>
            <i class="fas fa-book"></i>
            <strong>${booksCount}</strong> كتاب
        </div>

        <div>
            <i class="fas fa-video"></i>
            <strong>${lecturesCount}</strong> محاضرة
        </div>

        <div>
            <i class="fas fa-layer-group"></i>
            <strong>${totalContent}</strong> مادة
        </div>

    </div>

    ${getTabs(key,tab)}

    <div id="tabContent"></div>
    `;

    animatePage(html);

    loadTabContent(key,tab);
}

// ===================== تحميل التبويب =====================
function loadTabContent(courseKey,type){

    const course = courses[courseKey];
    if(!course) return;

    let html="";

    if(type==="books"){

        html+=`<div class="books-section">`;

        if(course.books?.length){

            course.books.forEach(book=>{

                if(book.coming){

                    html+=`
                    <div class="book-button coming">
                        <i class="fas fa-book-open"></i>
                        <span>${book.name}</span>
                        <span>قريباً</span>
                    </div>
                    `;

                }else{

                    html+=`
                    <a href="${book.link}"
                    class="book-button"
                    target="_blank"
                    rel="noopener">

                    <i class="fas fa-book-open"></i>
                    <span>${book.name}</span>

                    <span>تحميل</span>

                    </a>
                    `;
                }

            });

        }else{

            html+=`
            <div class="empty">
            لا توجد كتب حالياً
            </div>
            `;
        }

        html+=`</div>`;
    }

    const tabContent=document.getElementById("tabContent");

    if(tabContent){
        tabContent.innerHTML=html;
    }
}

// ===================== البحث =====================
window.globalSearch=function(val){

    if(typeof performSearch==="function"){

        const input=document.getElementById("search");

        if(input) input.value=val;

        performSearch(val);

    }else{

        showNotification("سيتم تفعيل البحث قريباً");

    }
};

// ===================== إشعارات =====================
function showNotification(message,type="info"){

    const notification=document.createElement("div");

    notification.className=`notification notification-${type}`;

    notification.innerHTML=`
    <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(()=>{
        notification.remove();
    },3000);
}

// ===================== أدوات =====================
function formatDate(date){

    const options={
        year:"numeric",
        month:"long",
        day:"numeric"
    };

    return new Date(date).toLocaleDateString("ar-EG",options);
}

function getGreeting(){

    const hour=new Date().getHours();

    if(hour<12) return "صباح الخير";

    if(hour<18) return "مساء الخير";

    return "مساء الخير";
}

// ===================== مشاركة =====================
function shareContent(title,url){

    if(navigator.share){

        navigator.share({
            title,
            url
        });

    }else{

        navigator.clipboard.writeText(url);

        showNotification("تم نسخ الرابط");
    }
}

// ===================== تصدير =====================
function exportToPDF(){

    showNotification("سيتم إضافة التصدير لاحقاً");

}

// ===================== تصدير الدوال =====================
window.showDashboard=showDashboard;
window.showSemester=showSemester;
window.showCourse=showCourse;
window.loadTabContent=loadTabContent;

window.showNotification=showNotification;
window.shareContent=shareContent;
window.exportToPDF=exportToPDF;
window.formatDate=formatDate;
window.getGreeting=getGreeting;

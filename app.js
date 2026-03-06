// app.js - منطق التطبيق الرئيسي

// دالة التمرير لأعلى وتحديث المحتوى
function animatePage(html) {
    document.getElementById("main").innerHTML = html;
    
    // التمرير لأعلى الصفحة عند تغيير الصفحة
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// عرض لوحة التحكم الرئيسية
function showDashboard() {
    animatePage(`
        <h1 class="page-title">
            <i class="fas fa-crown"></i>
            جامعة الاقصى
            <i class="fas fa-crown"></i>
        </h1>

        ${getWhatsAppLink()}
        ${getMartyrDedication()}

        <div class="card" style="margin-bottom: 20px;">
            <i class="fas fa-user-nurse"></i>
            <h2>تمريض - سنة أولى</h2>
        </div>

        <div class="grid">
            <a href="${getSemesterLink(1)}" class="card-link" style="text-decoration: none;">
                <div class="card">
                    <i class="fas fa-calendar-alt"></i>
                    <h3>الفصل الأول</h3>
                    <span class="code">7 مساقات</span>
                </div>
            </a>

            <a href="${getSemesterLink(2)}" class="card-link" style="text-decoration: none;">
                <div class="card">
                    <i class="fas fa-calendar-check"></i>
                    <h3>الفصل الثاني</h3>
                    <span class="code">7 مساقات</span>
                </div>
            </a>
        </div>
    `);
}

// عرض الفصل الدراسي
function showSemester(sem) {
    const list = sem === 1 ? semester1Courses : semester2Courses;

    let html = getBackButton(getDashboardLink()) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            الفصل ${sem === 1 ? "الأول" : "الثاني"}
        </h2>
        <div class="grid">
    `;

    list.forEach(key => {
        html += `
            <a href="${getCourseLink(key, 'books')}" class="card-link" style="text-decoration: none;">
                <div class="card">
                    <i class="fas ${courses[key].icon}"></i>
                    <h3>${courses[key].title}</h3>
                    <span class="code">${courses[key].code}</span>
                </div>
            </a>
        `;
    });

    html += `</div>`;
    animatePage(html);
}

// عرض المساق
function showCourse(key, tab) {
    const course = courses[key];
    const semester = course.semester === 1 ? '1' : '2';
    
    let html = getBackButton(getSemesterLink(semester)) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            <i class="fas ${course.icon}"></i>
            ${course.title}
        </h2>

        ${getTabs(key, tab)}

        <div id="tabContent" class="tab-content"></div>
    `;

    animatePage(html);
    loadTabContent(key, tab);
}

// تحميل محتوى التبويب
function loadTabContent(courseKey, type) {
    const course = courses[courseKey];
    let html = '';

    if (type === 'books') {
        html = `
            <div class="books-section">
                <div class="section-title">
                    <i class="fas fa-book"></i>
                    <span>الكتب الدراسية</span>
                </div>
        `;

        course.books.forEach(book => {
            if (book.coming) {
                html += `
                    <div class="book-button" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                        <i class="fas fa-book-open"></i>
                        <span>${book.name}</span>
                        <div class="click-here">
                            <i class="fas fa-clock"></i>
                            قريباً
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <a href="${book.link}" class="book-button" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-book-open"></i>
                        <span>${book.name}</span>
                        <div class="click-here">
                            <i class="fas fa-hand-pointer"></i>
                            تحميل
                        </div>
                    </a>
                `;
            }
        });

        html += `</div>`;
    } 
    else if (type === 'lectures') {
        html = `
            <div class="books-section">
                <div class="section-title">
                    <i class="fas fa-video"></i>
                    <span>المحاضرات المسجلة</span>
                </div>
        `;

        if (course.lectures && course.lectures.length > 0) {
            course.lectures.forEach(lecture => {
                const icon = lecture.type === 'youtube' ? 'fa-youtube' : 'fa-google-drive';
                html += `
                    <a href="${lecture.link}" class="book-button" target="_blank" rel="noopener noreferrer">
                        <i class="fab ${icon}" style="color: ${lecture.type === 'youtube' ? '#FF0000' : '#34A853'};"></i>
                        <span>${lecture.name}</span>
                        <div class="click-here">
                            <i class="fas fa-hand-pointer"></i>
                            مشاهدة
                        </div>
                    </a>
                `;
            });
        } else {
            html += `
                <div class="content-card" style="justify-content: center; text-align: center;">
                    <div class="content-info">
                        <i class="fas fa-video-slash" style="font-size: 2rem; color: #95a5a6;"></i>
                        <h4 style="color: #7f8c8d;">لا توجد محاضرات متاحة حالياً</h4>
                    </div>
                </div>
            `;
        }

        html += `</div>`;
    }
    else {
        const items = {
            summaries: [
                { name: "ملخص الوحدة الأولى", file: "#" },
                { name: "ملخص الوحدة الثانية", file: "#" },
                { name: "ملخص الوحدة الثالثة", file: "#" }
            ],
            exams: [
                { name: "اختبار قصير 1", file: "#" },
                { name: "اختبار منتصف الفصل", file: "#" },
                { name: "اختبار نهائي", file: "#" }
            ]
        }[type] || [];

        html = '<div class="books-section">';
        html += `<div class="section-title">
                    <i class="fas ${type === 'summaries' ? 'fa-file-alt' : 'fa-question-circle'}"></i>
                    <span>${type === 'summaries' ? 'الملخصات' : 'الاختبارات'}</span>
                </div>`;

        items.forEach(item => {
            html += `
                <div class="content-card">
                    <div class="content-info">
                        <i class="fas fa-file-pdf"></i>
                        <h4>${item.name}</h4>
                    </div>
                    <a href="#" class="download-btn" onclick="alert('سيتم إضافة الرابط قريباً'); return false;">
                        <i class="fas fa-download"></i>
                        تحميل
                    </a>
                </div>
            `;
        });

        html += '</div>';
    }

    document.getElementById("tabContent").innerHTML = html;
}

// دالة البحث الشامل
window.globalSearch = function(val) {
    val = val.toLowerCase().trim();
    
    if (!val) {
        showDashboard();
        return;
    }

    let results = Object.keys(courses).filter(key => 
        courses[key].title.toLowerCase().includes(val) ||
        courses[key].code.toLowerCase().includes(val)
    );

    let html = getBackButton(getDashboardLink()) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            <i class="fas fa-search"></i>
            نتائج البحث (${results.length})
        </h2>
    `;

    if (results.length === 0) {
        html += `
            <div class="card" style="text-align: center; padding: 30px;">
                <i class="fas fa-frown" style="font-size: 2rem;"></i>
                <h3>لا توجد نتائج</h3>
            </div>
        `;
    } else {
        html += '<div class="grid">';
        results.forEach(key => {
            html += `
                <a href="${getCourseLink(key, 'books')}" class="card-link" style="text-decoration: none;">
                    <div class="card">
                        <i class="fas ${courses[key].icon}"></i>
                        <h3>${courses[key].title}</h3>
                        <span class="code">${courses[key].code}</span>
                    </div>
                </a>
            `;
        });
        html += '</div>';
    }

    animatePage(html);
};

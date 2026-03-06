// main.js - نقطة الدخول الرئيسية للتطبيق
// آخر تحديث: إضافة نظام البحث الشامل والمحسن

// متغير للتحكم في تأخير البحث
let searchTimeout;

// ========== دالة البحث الشامل في كل محتوى الموقع ==========
window.globalSearch = function(val) {
    'use strict';
    
    // إلغاء البحث السابق إذا كان المستخدم لا يزال يكتب
    clearTimeout(searchTimeout);
    
    // تأخير البحث 300ms بعد توقف المستخدم عن الكتابة لتحسين الأداء
    searchTimeout = setTimeout(() => {
        performSearch(val);
    }, 300);
};

// دالة تنفيذ البحث الفعلية
function performSearch(val) {
    'use strict';
    
    val = val.toLowerCase().trim();
    
    if (!val || val.length < 2) {
        showDashboard();
        return;
    }

    let results = [];
    let booksResults = [];
    let lecturesResults = [];
    let summariesResults = [];
    let examsResults = [];

    // البحث في المساقات
    Object.keys(courses).forEach(key => {
        const course = courses[key];
        
        // البحث في عنوان المساق والكود
        if (course.title.toLowerCase().includes(val) || 
            course.code.toLowerCase().includes(val)) {
            results.push({
                type: 'course',
                courseKey: key,
                title: course.title,
                code: course.code,
                icon: course.icon,
                semester: course.semester,
                match: `المساق: ${course.title}`
            });
        }
        
        // البحث في الكتب
        if (course.books && course.books.length > 0) {
            course.books.forEach(book => {
                if (book.name.toLowerCase().includes(val)) {
                    booksResults.push({
                        type: 'book',
                        courseKey: key,
                        courseTitle: course.title,
                        title: book.name,
                        link: book.link,
                        coming: book.coming || false,
                        match: `📚 كتاب: ${book.name}`
                    });
                }
            });
        }
        
        // البحث في المحاضرات
        if (course.lectures && course.lectures.length > 0) {
            course.lectures.forEach(lecture => {
                if (lecture.name.toLowerCase().includes(val)) {
                    lecturesResults.push({
                        type: 'lecture',
                        courseKey: key,
                        courseTitle: course.title,
                        title: lecture.name,
                        link: lecture.link,
                        lectureType: lecture.type,
                        match: `🎥 محاضرة: ${lecture.name}`
                    });
                }
            });
        }
    });

    // البحث في الملخصات (الافتراضية)
    const defaultSummaries = [
        { name: "ملخص الوحدة الأولى - الأحياء", course: "biology" },
        { name: "ملخص الوحدة الثانية - الأحياء", course: "biology" },
        { name: "ملخص الوحدة الأولى - الكيمياء", course: "chemistry" },
        { name: "ملخص الوحدة الثانية - الكيمياء", course: "chemistry" },
        { name: "ملخص الوحدة الأولى - الفيزياء", course: "physics" },
        { name: "ملخص الوحدة الأولى - التشريح", course: "anatomy" },
        { name: "ملخص المصطلحات الطبية", course: "med_terms" },
        { name: "ملخص العقيدة الإسلامية", course: "physiology" },
        { name: "ملخص اللغة العربية", course: "biochemistry" },
        { name: "ملخص القضية الفلسطينية", course: "anatomy" }
    ];

    defaultSummaries.forEach(summary => {
        if (summary.name.toLowerCase().includes(val)) {
            summariesResults.push({
                type: 'summary',
                courseKey: summary.course,
                courseTitle: courses[summary.course]?.title || 'مساق عام',
                title: summary.name,
                match: `📝 ملخص: ${summary.name}`
            });
        }
    });

    // البحث في الاختبارات (الافتراضية)
    const defaultExams = [
        { name: "اختبار قصير 1 - الأحياء", course: "biology" },
        { name: "اختبار منتصف الفصل - الأحياء", course: "biology" },
        { name: "اختبار نهائي - الأحياء", course: "biology" },
        { name: "اختبار قصير 1 - الكيمياء", course: "chemistry" },
        { name: "اختبار منتصف الفصل - الكيمياء", course: "chemistry" },
        { name: "اختبار قصير 1 - الفيزياء", course: "physics" },
        { name: "اختبار عملي - التشريح", course: "anatomy" },
        { name: "اختبار نظري - التشريح", course: "anatomy" },
        { name: "اختبار شامل - المصطلحات الطبية", course: "med_terms" },
        { name: "اختبار منتصف الفصل - العقيدة", course: "physiology" }
    ];

    defaultExams.forEach(exam => {
        if (exam.name.toLowerCase().includes(val)) {
            examsResults.push({
                type: 'exam',
                courseKey: exam.course,
                courseTitle: courses[exam.course]?.title || 'مساق عام',
                title: exam.name,
                match: `📋 اختبار: ${exam.name}`
            });
        }
    });

    // تجميع كل النتائج
    const totalResults = [
        ...results,
        ...booksResults,
        ...lecturesResults,
        ...summariesResults,
        ...examsResults
    ];

    // عرض النتائج
    let html = getBackButton(getDashboardLink()) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            <i class="fas fa-search"></i>
            نتائج البحث عن "${val}" (${totalResults.length})
        </h2>
    `;

    if (totalResults.length === 0) {
        html += `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-frown" style="font-size: 4rem; color: #95a5a6; margin-bottom: 20px;"></i>
                <h3 style="color: #7f8c8d; margin-bottom: 10px; font-size: 1.5rem;">لا توجد نتائج</h3>
                <p style="color: #95a5a6; font-size: 1.1rem;">جرب كلمات بحث أخرى</p>
                <div style="margin-top: 20px; color: #bdc3c7; font-size: 0.9rem;">
                    <i class="fas fa-lightbulb"></i> 
                    اقتراحات: أحياء، كيمياء، كتاب، محاضرة، اختبار
                </div>
            </div>
        `;
    } else {
        // تجميع النتائج حسب النوع
        const hasCourses = results.length > 0;
        const hasBooks = booksResults.length > 0;
        const hasLectures = lecturesResults.length > 0;
        const hasSummaries = summariesResults.length > 0;
        const hasExams = examsResults.length > 0;
        
        html += '<div class="search-results">';
        
        // عرض المساقات
        if (hasCourses) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-university"></i>
                        <span>المساقات (${results.length})</span>
                    </div>
                    <div class="courses-grid">
            `;
            
            results.forEach(result => {
                html += `
                    <a href="${getCourseLink(result.courseKey, 'books')}" class="course-card-link" style="text-decoration: none;">
                        <div class="course-card">
                            <i class="fas ${result.icon}"></i>
                            <h4>${result.title}</h4>
                            <span class="code">${result.code}</span>
                            <div class="match-badge">${result.match}</div>
                        </div>
                    </a>
                `;
            });
            
            html += `</div></div>`;
        }
        
        // عرض الكتب
        if (hasBooks) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-book"></i>
                        <span>الكتب (${booksResults.length})</span>
                    </div>
                    <div class="items-list">
            `;
            
            booksResults.forEach(result => {
                if (result.coming) {
                    html += `
                        <div class="item-card" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                            <i class="fas fa-book-open"></i>
                            <div class="item-info">
                                <div class="item-title">${result.title}</div>
                                <div class="item-course">من مساق: ${result.courseTitle}</div>
                            </div>
                            <div class="item-badge coming-soon">
                                <i class="fas fa-clock"></i>
                                قريباً
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <a href="${result.link}" class="item-card" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-book-open"></i>
                            <div class="item-info">
                                <div class="item-title">${result.title}</div>
                                <div class="item-course">من مساق: ${result.courseTitle}</div>
                            </div>
                            <div class="item-badge download">
                                <i class="fas fa-hand-pointer"></i>
                                تحميل
                            </div>
                        </a>
                    `;
                }
            });
            
            html += `</div></div>`;
        }
        
        // عرض المحاضرات
        if (hasLectures) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-video"></i>
                        <span>المحاضرات (${lecturesResults.length})</span>
                    </div>
                    <div class="items-list">
            `;
            
            lecturesResults.forEach(result => {
                const icon = result.lectureType === 'youtube' ? 'fa-youtube' : 'fa-google-drive';
                const color = result.lectureType === 'youtube' ? '#FF0000' : '#34A853';
                
                html += `
                    <a href="${result.link}" class="item-card" target="_blank" rel="noopener noreferrer">
                        <i class="fab ${icon}" style="color: ${color};"></i>
                        <div class="item-info">
                            <div class="item-title">${result.title}</div>
                            <div class="item-course">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="item-badge watch">
                            <i class="fas fa-hand-pointer"></i>
                            مشاهدة
                        </div>
                    </a>
                `;
            });
            
            html += `</div></div>`;
        }
        
        // عرض الملخصات
        if (hasSummaries) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-file-alt"></i>
                        <span>الملخصات (${summariesResults.length})</span>
                    </div>
                    <div class="items-list">
            `;
            
            summariesResults.forEach(result => {
                html += `
                    <div class="item-card" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                        <i class="fas fa-file-pdf"></i>
                        <div class="item-info">
                            <div class="item-title">${result.title}</div>
                            <div class="item-course">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="item-badge coming-soon">
                            <i class="fas fa-clock"></i>
                            قريباً
                        </div>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        // عرض الاختبارات
        if (hasExams) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-question-circle"></i>
                        <span>الاختبارات (${examsResults.length})</span>
                    </div>
                    <div class="items-list">
            `;
            
            examsResults.forEach(result => {
                html += `
                    <div class="item-card" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                        <i class="fas fa-file-alt"></i>
                        <div class="item-info">
                            <div class="item-title">${result.title}</div>
                            <div class="item-course">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="item-badge coming-soon">
                            <i class="fas fa-clock"></i>
                            قريباً
                        </div>
                    </div>
                `;
            });
            
            html += `</div></div>`;
        }
        
        html += `</div>`;
    }

    animatePage(html);
}

// ========== دالة إحصائيات الموقع ==========
function getSiteStats() {
    let totalBooks = 0;
    let totalLectures = 0;
    let totalCourses = Object.keys(courses).length;
    
    Object.keys(courses).forEach(key => {
        totalBooks += courses[key].books?.length || 0;
        totalLectures += courses[key].lectures?.length || 0;
    });
    
    return {
        courses: totalCourses,
        books: totalBooks,
        lectures: totalLectures,
        summaries: 15, // تقريبي
        exams: 12      // تقريبي
    };
}

// ========== تهيئة الصفحة عند التحميل ==========
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // إضافة الـ CSS الإضافي
    addAdditionalStyles();
    
    // إضافة مستمع حدث للبحث المباشر (اختياري)
    setupSearchInput();
    
    // معالجة التحميل الأول
    handleInitialLoad();
});

// ========== إعداد مدخل البحث ==========
function setupSearchInput() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        // إضافة زر مسح للبحث
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                showDashboard();
            }
        });
        
        // إضافة خصائص تحسينية
        searchInput.setAttribute('autocomplete', 'off');
        searchInput.setAttribute('spellcheck', 'false');
    }
}

// ========== إضافة الـ CSS الإضافي ==========
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تنسيقات البحث المحسنة */
        .search-results {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
        
        .search-section {
            background: var(--card-bg);
            border-radius: 25px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .search-section:hover {
            box-shadow: 0 15px 40px var(--shadow-color);
        }
        
        .search-section .section-title {
            margin-top: 0;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(74, 144, 226, 0.2);
        }
        
        .courses-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .course-card {
            background: rgba(255, 255, 255, 0.7);
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(74, 144, 226, 0.1);
            position: relative;
            overflow: hidden;
        }
        
        .course-card:hover {
            transform: translateY(-3px);
            background: white;
            box-shadow: 0 8px 20px var(--shadow-color);
            border-color: var(--primary-light);
        }
        
        .course-card i {
            font-size: 2rem !important;
            color: var(--primary-color);
            margin-bottom: 10px;
        }
        
        .course-card h4 {
            margin: 10px 0 5px;
            color: var(--text-color);
            font-size: 1rem;
        }
        
        .items-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .item-card {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 15px;
            text-decoration: none;
            color: var(--text-color);
            transition: all 0.3s ease;
            border: 1px solid rgba(74, 144, 226, 0.1);
            cursor: pointer;
        }
        
        .item-card:hover {
            background: white;
            transform: translateX(-5px);
            box-shadow: 0 8px 20px var(--shadow-color);
            border-color: var(--primary-light);
        }
        
        .item-card i {
            font-size: 1.8rem !important;
            margin-left: 15px;
            min-width: 40px;
            text-align: center;
        }
        
        .item-info {
            flex: 1;
        }
        
        .item-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--text-color);
        }
        
        .item-course {
            font-size: 0.8rem;
            color: var(--primary-color);
            opacity: 0.8;
        }
        
        .item-badge {
            margin-right: auto;
            padding: 6px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            white-space: nowrap;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
        }
        
        .item-badge.download {
            background: linear-gradient(135deg, #27ae60, #229954);
        }
        
        .item-badge.watch {
            background: linear-gradient(135deg, #e67e22, #d35400);
        }
        
        .item-badge.coming-soon {
            background: linear-gradient(135deg, #95a5a6, #7f8c8d);
        }
        
        .match-badge {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.7rem;
            margin-top: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }
        
        /* تنسيقات الشاشات الصغيرة */
        @media (max-width: 768px) {
            .courses-grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }
            
            .item-card {
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .item-badge {
                width: 100%;
                text-align: center;
                margin-right: 0;
            }
            
            .item-card i {
                font-size: 1.5rem !important;
                margin-left: 10px;
            }
            
            .match-badge {
                font-size: 0.65rem;
                padding: 3px 8px;
            }
        }
        
        /* تنسيقات للشاشات المتوسطة */
        @media (min-width: 769px) and (max-width: 1024px) {
            .courses-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* تنسيق الشاشات الكبيرة */
        @media (min-width: 1400px) {
            .courses-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        
        /* تحسين مظهر شريط البحث */
        .search-container {
            position: relative;
        }
        
        .search-input {
            padding-left: 40px !important;
            background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 20px;
        }
        
        /* إحصائيات سريعة (اختياري) */
        .quick-stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .stat-item {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(5px);
            padding: 8px 20px;
            border-radius: 30px;
            font-size: 0.9rem;
            color: var(--text-color);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .stat-item i {
            margin-left: 5px;
            color: var(--primary-color);
        }
    `;
    
    document.head.appendChild(style);
}

// ========== معالجة التحميل الأول ==========
function handleInitialLoad() {
    'use strict';
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        if (hash === 'dashboard' || !hash) {
            showDashboard();
        } else if (hash.startsWith('semester-')) {
            const sem = parseInt(hash.split('-')[1]);
            if (sem === 1 || sem === 2) {
                showSemester(sem);
            } else {
                showDashboard();
            }
        } else if (hash.startsWith('course-')) {
            const parts = hash.split('-');
            const courseKey = parts[1];
            const tab = parts[2] || 'books';
            
            if (courses[courseKey]) {
                showCourse(courseKey, tab);
            } else {
                showDashboard();
            }
        } else {
            showDashboard();
        }
    } else {
        showDashboard();
    }
}

// ========== تصدير الدوال للاستخدام العام ==========
// التأكد من توفر الدوال في النطاق العام
window.getSiteStats = getSiteStats;
window.performSearch = performSearch;

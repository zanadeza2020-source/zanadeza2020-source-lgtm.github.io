// main.js - نقطة الدخول الرئيسية للتطبيق
// آخر تحديث: تحسين نظام البحث الشامل ومعالجة التمرير

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

// ========== دالة تنفيذ البحث الفعلية ==========
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
                        year: book.year,
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
        { name: "ملخص القضية الفلسطينية", course: "anatomy" },
        { name: "ملخص أساسيات التمريض", course: "nursing1" },
        { name: "ملخص الأحياء الدقيقة", course: "microbio" }
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
        { name: "اختبار نهائي - الكيمياء", course: "chemistry" },
        { name: "اختبار قصير 1 - الفيزياء", course: "physics" },
        { name: "اختبار منتصف الفصل - الفيزياء", course: "physics" },
        { name: "اختبار عملي - التشريح", course: "anatomy" },
        { name: "اختبار نظري - التشريح", course: "anatomy" },
        { name: "اختبار شامل - المصطلحات الطبية", course: "med_terms" },
        { name: "اختبار منتصف الفصل - العقيدة", course: "physiology" },
        { name: "اختبار نهائي - اللغة العربية", course: "biochemistry" },
        { name: "اختبار عملي - تمريض", course: "nursing_practical" }
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

    // ترتيب النتائج حسب الصلة
    booksResults.sort((a, b) => a.title.length - b.title.length);
    lecturesResults.sort((a, b) => a.title.length - b.title.length);
    summariesResults.sort((a, b) => a.title.length - b.title.length);
    examsResults.sort((a, b) => a.title.length - b.title.length);

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
    
    // إضافة إحصائيات سريعة للبحث
    const stats = {
        courses: results.length,
        books: booksResults.length,
        lectures: lecturesResults.length,
        summaries: summariesResults.length,
        exams: examsResults.length
    };
    
    html += `
        <h2 class="course-title">
            <i class="fas fa-search"></i>
            نتائج البحث عن "${val}"
        </h2>
        
        <!-- إحصائيات البحث -->
        <div class="quick-stats">
            ${stats.courses > 0 ? `<div class="stat-item"><i class="fas fa-university"></i> ${stats.courses} مساق</div>` : ''}
            ${stats.books > 0 ? `<div class="stat-item"><i class="fas fa-book"></i> ${stats.books} كتاب</div>` : ''}
            ${stats.lectures > 0 ? `<div class="stat-item"><i class="fas fa-video"></i> ${stats.lectures} محاضرة</div>` : ''}
            ${stats.summaries > 0 ? `<div class="stat-item"><i class="fas fa-file-alt"></i> ${stats.summaries} ملخص</div>` : ''}
            ${stats.exams > 0 ? `<div class="stat-item"><i class="fas fa-question-circle"></i> ${stats.exams} اختبار</div>` : ''}
        </div>
    `;

    if (totalResults.length === 0) {
        html += `
            <div class="card" style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-frown" style="font-size: 4rem; color: #95a5a6; margin-bottom: 20px;"></i>
                <h3 style="color: #7f8c8d; margin-bottom: 10px; font-size: 1.5rem;">لا توجد نتائج</h3>
                <p style="color: #95a5a6; font-size: 1.1rem;">جرب كلمات بحث أخرى</p>
                <div style="margin-top: 20px; color: #bdc3c7; font-size: 0.9rem;">
                    <i class="fas fa-lightbulb"></i> 
                    اقتراحات: أحياء، كيمياء، كتاب، محاضرة، اختبار، ملخص
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
                        <div class="item-card" onclick="showNotification('سيتم إضافة الرابط قريباً', 'info')" style="cursor: pointer;">
                            <i class="fas fa-book-open"></i>
                            <div class="item-info">
                                <div class="item-title">${result.title}</div>
                                <div class="item-course">من مساق: ${result.courseTitle}</div>
                                ${result.year ? `<div class="item-year">سنة: ${result.year}</div>` : ''}
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
                                ${result.year ? `<div class="item-year">سنة: ${result.year}</div>` : ''}
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
                const platform = result.lectureType === 'youtube' ? 'يوتيوب' : 'جوجل درايف';
                
                html += `
                    <a href="${result.link}" class="item-card" target="_blank" rel="noopener noreferrer">
                        <i class="fab ${icon}" style="color: ${color};"></i>
                        <div class="item-info">
                            <div class="item-title">${result.title}</div>
                            <div class="item-course">من مساق: ${result.courseTitle}</div>
                            <div class="item-platform">منصة: ${platform}</div>
                        </div>
                        <div class="item-badge watch" style="background: ${color};">
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
                    <div class="item-card" onclick="showNotification('سيتم إضافة الملخص قريباً', 'info')" style="cursor: pointer;">
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
                    <div class="item-card" onclick="showNotification('سيتم إضافة الاختبار قريباً', 'info')" style="cursor: pointer;">
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
    'use strict';
    
    let totalBooks = 0;
    let totalLectures = 0;
    let totalCourses = Object.keys(courses).length;
    
    Object.keys(courses).forEach(key => {
        totalBooks += courses[key].books?.filter(b => !b.coming).length || 0;
        totalLectures += courses[key].lectures?.length || 0;
    });
    
    return {
        courses: totalCourses,
        books: totalBooks,
        lectures: totalLectures,
        summaries: 15, // تقريبي
        exams: 15      // تقريبي
    };
}

// ========== تهيئة الصفحة عند التحميل ==========
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // التمرير لأعلى الصفحة فوراً
    window.scrollTo(0, 0);
    
    // إضافة الـ CSS الإضافي
    addAdditionalStyles();
    
    // إضافة مستمع حدث للبحث المباشر
    setupSearchInput();
    
    // معالجة التحميل الأول
    handleInitialLoad();
    
    // إضافة مستمع لحدث popstate للتنقل الخلفي
    window.addEventListener('popstate', function() {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    });
});

// ========== إعداد مدخل البحث ==========
function setupSearchInput() {
    'use strict';
    
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
        
        // إضافة زر مسح
        const searchContainer = searchInput.parentElement;
        const clearButton = document.createElement('span');
        clearButton.className = 'search-clear';
        clearButton.innerHTML = '&times;';
        clearButton.style.cssText = `
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.5rem;
            color: var(--text-light);
            cursor: pointer;
            display: none;
            z-index: 10;
        `;
        
        clearButton.onclick = function() {
            searchInput.value = '';
            searchInput.focus();
            showDashboard();
            this.style.display = 'none';
        };
        
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(clearButton);
        
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value.length > 0 ? 'block' : 'none';
        });
    }
}

// ========== إضافة الـ CSS الإضافي ==========
function addAdditionalStyles() {
    'use strict';
    
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
            animation: fadeInUp 0.5s ease;
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
            font-weight: 600;
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
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(74, 144, 226, 0.1);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .item-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .item-card:hover::before {
            opacity: 1;
        }
        
        .item-card:hover {
            background: white;
            transform: translateX(-5px) translateY(-2px);
            box-shadow: 0 8px 20px var(--shadow-color);
            border-color: var(--primary-light);
        }
        
        .item-card i {
            font-size: 1.8rem !important;
            margin-left: 15px;
            min-width: 40px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .item-card:hover i {
            transform: scale(1.1);
        }
        
        .item-info {
            flex: 1;
        }
        
        .item-title {
            font-weight: 600;
            margin-bottom: 4px;
            color: var(--text-color);
            font-size: 1rem;
        }
        
        .item-course,
        .item-platform,
        .item-year {
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
            transition: all 0.3s ease;
        }
        
        .item-card:hover .item-badge {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(74, 144, 226, 0.4);
        }
        
        .item-badge.download {
            background: linear-gradient(135deg, var(--success-color), #229954);
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
            animation: fadeIn 0.5s ease;
        }
        
        /* تنسيق زر المسح */
        .search-clear {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.5rem;
            color: var(--text-light);
            cursor: pointer;
            display: none;
            z-index: 10;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .search-clear:hover {
            background: rgba(0, 0, 0, 0.1);
            color: var(--danger-color);
        }
        
        /* تحسينات للشاشات الصغيرة */
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
        
        /* أنيميشن */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ========== معالجة التحميل الأول ==========
function handleInitialLoad() {
    'use strict';
    
    // التمرير لأعلى الصفحة فوراً
    window.scrollTo(0, 0);
    
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
    
    // التمرير مرة أخرى بعد تحميل المحتوى
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 150);
}

// ========== تصدير الدوال للاستخدام العام ==========
window.getSiteStats = getSiteStats;
window.performSearch = performSearch;
window.setupSearchInput = setupSearchInput;

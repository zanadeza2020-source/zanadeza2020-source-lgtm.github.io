// app.js - تحديث دالة البحث الشامل

// دالة البحث الشامل في كل محتوى الموقع
window.globalSearch = function(val) {
    val = val.toLowerCase().trim();
    
    if (!val) {
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
                        coming: book.coming,
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
        { name: "ملخص الوحدة الأولى", course: "biology" },
        { name: "ملخص الوحدة الثانية", course: "chemistry" },
        { name: "ملخص الوحدة الثالثة", course: "physics" },
        { name: "ملخص التشريح", course: "anatomy" },
        { name: "ملخص المصطلحات الطبية", course: "med_terms" }
    ];

    defaultSummaries.forEach(summary => {
        if (summary.name.toLowerCase().includes(val)) {
            summariesResults.push({
                type: 'summary',
                courseKey: summary.course,
                courseTitle: courses[summary.course]?.title || '',
                title: summary.name,
                match: `📝 ملخص: ${summary.name}`
            });
        }
    });

    // البحث في الاختبارات (الافتراضية)
    const defaultExams = [
        { name: "اختبار قصير 1 - الأحياء", course: "biology" },
        { name: "اختبار منتصف الفصل - الكيمياء", course: "chemistry" },
        { name: "اختبار نهائي - الفيزياء", course: "physics" },
        { name: "اختبار عملي - التشريح", course: "anatomy" },
        { name: "اختبار شامل - المصطلحات", course: "med_terms" }
    ];

    defaultExams.forEach(exam => {
        if (exam.name.toLowerCase().includes(val)) {
            examsResults.push({
                type: 'exam',
                courseKey: exam.course,
                courseTitle: courses[exam.course]?.title || '',
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
            <div class="card" style="text-align: center; padding: 30px;">
                <i class="fas fa-frown" style="font-size: 3rem; color: #95a5a6; margin-bottom: 15px;"></i>
                <h3 style="color: #7f8c8d; margin-bottom: 10px;">لا توجد نتائج</h3>
                <p style="color: #95a5a6;">جرب كلمات بحث أخرى</p>
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
                    <div class="grid">
            `;
            
            results.forEach(result => {
                html += `
                    <a href="${getCourseLink(result.courseKey, 'books')}" class="card-link" style="text-decoration: none;">
                        <div class="card">
                            <i class="fas ${result.icon}"></i>
                            <h3>${result.title}</h3>
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
            `;
            
            booksResults.forEach(result => {
                if (result.coming) {
                    html += `
                        <div class="book-button" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                            <i class="fas fa-book-open"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${result.title}</div>
                                <div style="font-size: 0.8rem; color: var(--primary-color);">من مساق: ${result.courseTitle}</div>
                            </div>
                            <div class="click-here">
                                <i class="fas fa-clock"></i>
                                قريباً
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <a href="${result.link}" class="book-button" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-book-open"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${result.title}</div>
                                <div style="font-size: 0.8rem; color: var(--primary-color);">من مساق: ${result.courseTitle}</div>
                            </div>
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
        
        // عرض المحاضرات
        if (hasLectures) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-video"></i>
                        <span>المحاضرات (${lecturesResults.length})</span>
                    </div>
            `;
            
            lecturesResults.forEach(result => {
                const icon = result.lectureType === 'youtube' ? 'fa-youtube' : 'fa-google-drive';
                const color = result.lectureType === 'youtube' ? '#FF0000' : '#34A853';
                
                html += `
                    <a href="${result.link}" class="book-button" target="_blank" rel="noopener noreferrer">
                        <i class="fab ${icon}" style="color: ${color};"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">${result.title}</div>
                            <div style="font-size: 0.8rem; color: var(--primary-color);">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="click-here">
                            <i class="fas fa-hand-pointer"></i>
                            مشاهدة
                        </div>
                    </a>
                `;
            });
            
            html += `</div>`;
        }
        
        // عرض الملخصات
        if (hasSummaries) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-file-alt"></i>
                        <span>الملخصات (${summariesResults.length})</span>
                    </div>
            `;
            
            summariesResults.forEach(result => {
                html += `
                    <div class="book-button" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                        <i class="fas fa-file-pdf"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">${result.title}</div>
                            <div style="font-size: 0.8rem; color: var(--primary-color);">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="click-here">
                            <i class="fas fa-clock"></i>
                            قريباً
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        // عرض الاختبارات
        if (hasExams) {
            html += `
                <div class="search-section">
                    <div class="section-title">
                        <i class="fas fa-question-circle"></i>
                        <span>الاختبارات (${examsResults.length})</span>
                    </div>
            `;
            
            examsResults.forEach(result => {
                html += `
                    <div class="book-button" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                        <i class="fas fa-file-alt"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">${result.title}</div>
                            <div style="font-size: 0.8rem; color: var(--primary-color);">من مساق: ${result.courseTitle}</div>
                        </div>
                        <div class="click-here">
                            <i class="fas fa-clock"></i>
                            قريباً
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        html += `</div>`;
    }

    animatePage(html);
};

// app.js - منطق التطبيق الرئيسي
// آخر تحديث: إصلاح مشكلة التمرير وتحسين الأداء

// ========== دالة التمرير لأعلى وتحديث المحتوى ==========
function animatePage(html) {
    'use strict';
    
    const mainElement = document.getElementById("main");
    if (mainElement) {
        mainElement.innerHTML = html;
    }
    
    // التمرير لأعلى الصفحة بشكل فوري وليس smooth
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // تغيير من smooth إلى auto للحصول على تمرير فوري
    });
    
    // التأكد من التمرير مرة أخرى بعد تحميل المحتوى
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }, 50);
    
    // إعادة تفعيل أي سكريبتات ديناميكية إذا لزم الأمر
    executeScripts();
    
    // تحديث حالة الأزرار النشطة
    updateActiveStates();
}

// ========== تنفيذ السكريبتات داخل HTML ==========
function executeScripts() {
    'use strict';
    
    const scripts = document.querySelectorAll('#main script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

// ========== تحديث حالة الأزرار النشطة ==========
function updateActiveStates() {
    'use strict';
    
    // تحديث التبويبات النشطة
    const currentHash = window.location.hash.substring(1);
    if (currentHash.startsWith('course-')) {
        const parts = currentHash.split('-');
        const activeTab = parts[2] || 'books';
        
        document.querySelectorAll('.tab').forEach(tab => {
            if (tab.getAttribute('href')?.includes(activeTab)) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
}

// ========== عرض لوحة التحكم الرئيسية ==========
function showDashboard() {
    'use strict';
    
    const stats = getSiteStats();
    
    animatePage(`
        <h1 class="page-title">
            <i class="fas fa-crown"></i>
            جامعة الأقصى
            <i class="fas fa-crown"></i>
        </h1>

        <!-- إحصائيات سريعة -->
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

        <div class="card" style="margin-bottom: 20px;" onclick="showDashboard()">
            <i class="fas fa-user-nurse"></i>
            <h2>تمريض - سنة أولى</h2>
            <span class="code">البرنامج التمريضي</span>
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

// ========== عرض الفصل الدراسي ==========
function showSemester(sem) {
    'use strict';
    
    const list = sem === 1 ? semester1Courses : semester2Courses;
    const semesterName = sem === 1 ? "الأول" : "الثاني";

    let html = getBackButton(getDashboardLink()) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            <i class="fas ${sem === 1 ? 'fa-calendar-alt' : 'fa-calendar-check'}"></i>
            الفصل ${semesterName}
        </h2>
        
        <!-- شريط التقدم (نسبة المساقات المكتملة) -->
        <div style="background: var(--card-bg); border-radius: 15px; padding: 15px; margin-bottom: 20px; text-align: center;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><i class="fas fa-check-circle" style="color: var(--success-color);"></i> المساقات المتاحة</span>
                <span>${list.length} مساق</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;">
                <div style="width: 100%; height: 100%; background: linear-gradient(90deg, var(--success-color), var(--primary-color));"></div>
            </div>
        </div>
        
        <div class="grid">
    `;

    list.forEach(key => {
        const course = courses[key];
        const hasBooks = course.books && course.books.length > 0;
        const hasLectures = course.lectures && course.lectures.length > 0;
        const availableContent = [];
        
        if (hasBooks) availableContent.push('📚 كتب');
        if (hasLectures) availableContent.push('🎥 محاضرات');
        
        html += `
            <a href="${getCourseLink(key, 'books')}" class="card-link" style="text-decoration: none;">
                <div class="card">
                    <i class="fas ${course.icon}"></i>
                    <h3>${course.title}</h3>
                    <span class="code">${course.code}</span>
                    ${availableContent.length > 0 ? 
                        `<div style="font-size: 0.8rem; margin-top: 8px; color: var(--primary-color);">
                            ${availableContent.join(' • ')}
                        </div>` : 
                        `<div style="font-size: 0.8rem; margin-top: 8px; color: #95a5a6;">
                            ⏳ قريباً
                        </div>`
                    }
                </div>
            </a>
        `;
    });

    html += `</div>`;
    animatePage(html);
}

// ========== عرض المساق ==========
function showCourse(key, tab) {
    'use strict';
    
    const course = courses[key];
    const semester = course.semester === 1 ? '1' : '2';
    
    // حساب المحتوى المتاح
    const booksCount = course.books?.filter(b => !b.coming).length || 0;
    const lecturesCount = course.lectures?.length || 0;
    const totalContent = booksCount + lecturesCount;
    
    let html = getBackButton(getSemesterLink(semester)) + getWhatsAppLink();
    
    html += `
        <h2 class="course-title">
            <i class="fas ${course.icon}"></i>
            ${course.title}
        </h2>
        
        <!-- بطاقة معلومات المساق -->
        <div style="background: var(--card-bg); border-radius: 20px; padding: 20px; margin-bottom: 20px; text-align: center; backdrop-filter: blur(10px);">
            <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;">
                <div>
                    <i class="fas fa-book" style="color: var(--primary-color);"></i>
                    <div><strong>${booksCount}</strong> كتاب</div>
                </div>
                <div>
                    <i class="fas fa-video" style="color: var(--primary-color);"></i>
                    <div><strong>${lecturesCount}</strong> محاضرة</div>
                </div>
                <div>
                    <i class="fas fa-layer-group" style="color: var(--primary-color);"></i>
                    <div><strong>${totalContent}</strong> مادة</div>
                </div>
            </div>
        </div>

        ${getTabs(key, tab)}

        <div id="tabContent" class="tab-content"></div>
    `;

    animatePage(html);
    
    // تحميل محتوى التبويب بعد animation
    setTimeout(() => {
        loadTabContent(key, tab);
    }, 100);
}

// ========== تحميل محتوى التبويب ==========
function loadTabContent(courseKey, type) {
    'use strict';
    
    const course = courses[courseKey];
    if (!course) return;
    
    let html = '';

    if (type === 'books') {
        html = `
            <div class="books-section">
                <div class="section-title">
                    <i class="fas fa-book"></i>
                    <span>الكتب الدراسية</span>
                </div>
        `;

        if (course.books && course.books.length > 0) {
            course.books.forEach(book => {
                if (book.coming) {
                    html += `
                        <div class="book-button" onclick="alert('سيتم إضافة الرابط قريباً')" style="cursor: pointer;">
                            <i class="fas fa-book-open"></i>
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${book.name}</div>
                                ${book.year ? `<div style="font-size: 0.8rem; color: var(--text-light);">سنة: ${book.year}</div>` : ''}
                            </div>
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
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${book.name}</div>
                                ${book.year ? `<div style="font-size: 0.8rem; color: var(--text-light);">سنة: ${book.year}</div>` : ''}
                            </div>
                            <div class="click-here">
                                <i class="fas fa-hand-pointer"></i>
                                تحميل
                            </div>
                        </a>
                    `;
                }
            });
        } else {
            html += `
                <div class="content-card" style="justify-content: center; text-align: center; padding: 40px;">
                    <div class="content-info" style="flex-direction: column;">
                        <i class="fas fa-book-open" style="font-size: 3rem; color: #95a5a6;"></i>
                        <h4 style="color: #7f8c8d;">لا توجد كتب متاحة حالياً</h4>
                        <p style="color: #95a5a6; font-size: 0.9rem;">سيتم إضافة الكتب قريباً</p>
                    </div>
                </div>
            `;
        }

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
            course.lectures.forEach((lecture, index) => {
                const icon = lecture.type === 'youtube' ? 'fa-youtube' : 'fa-google-drive';
                const color = lecture.type === 'youtube' ? '#FF0000' : '#34A853';
                const platform = lecture.type === 'youtube' ? 'يوتيوب' : 'جوجل درايف';
                
                html += `
                    <a href="${lecture.link}" class="book-button" target="_blank" rel="noopener noreferrer">
                        <i class="fab ${icon}" style="color: ${color};"></i>
                        <div style="flex: 1;">
                            <div style="font-weight: 600;">${lecture.name}</div>
                            <div style="font-size: 0.8rem; color: var(--text-light);">منصة: ${platform}</div>
                        </div>
                        <div class="click-here" style="background: ${color};">
                            <i class="fas fa-hand-pointer"></i>
                            مشاهدة
                        </div>
                    </a>
                `;
            });
        } else {
            html += `
                <div class="content-card" style="justify-content: center; text-align: center; padding: 40px;">
                    <div class="content-info" style="flex-direction: column;">
                        <i class="fas fa-video-slash" style="font-size: 3rem; color: #95a5a6;"></i>
                        <h4 style="color: #7f8c8d;">لا توجد محاضرات متاحة حالياً</h4>
                        <p style="color: #95a5a6; font-size: 0.9rem;">سيتم إضافة المحاضرات قريباً</p>
                    </div>
                </div>
            `;
        }

        html += `</div>`;
    }
    else if (type === 'summaries') {
        html = `
            <div class="books-section">
                <div class="section-title">
                    <i class="fas fa-file-alt"></i>
                    <span>الملخصات</span>
                </div>
                
                <div class="content-card" style="justify-content: center; text-align: center; padding: 40px;">
                    <div class="content-info" style="flex-direction: column;">
                        <i class="fas fa-file-pdf" style="font-size: 3rem; color: #95a5a6;"></i>
                        <h4 style="color: #7f8c8d;">الملخصات قيد الإعداد</h4>
                        <p style="color: #95a5a6; font-size: 0.9rem;">سيتم إضافة الملخصات قريباً</p>
                    </div>
                </div>
            </div>
        `;
    }
    else if (type === 'exams') {
        html = `
            <div class="books-section">
                <div class="section-title">
                    <i class="fas fa-question-circle"></i>
                    <span>الاختبارات</span>
                </div>
                
                <div class="content-card" style="justify-content: center; text-align: center; padding: 40px;">
                    <div class="content-info" style="flex-direction: column;">
                        <i class="fas fa-file-alt" style="font-size: 3rem; color: #95a5a6;"></i>
                        <h4 style="color: #7f8c8d;">الاختبارات قيد الإعداد</h4>
                        <p style="color: #95a5a6; font-size: 0.9rem;">سيتم إضافة الاختبارات قريباً</p>
                    </div>
                </div>
            </div>
        `;
    }

    const tabContent = document.getElementById("tabContent");
    if (tabContent) {
        tabContent.innerHTML = html;
    }
}

// ========== دالة البحث الشامل (معرفة من main.js ولكن نضمن وجودها) ==========
window.globalSearch = function(val) {
    'use strict';
    
    // إذا كانت الدالة غير معرفة في main.js، نستخدم هذه
    if (typeof performSearch === 'function') {
        // البحث عنصر في main.js
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.value = val;
        }
        performSearch(val);
    } else {
        // نسخة احتياطية بسيطة
        console.log('Search for:', val);
        alert('جاري تحسين البحث... الرجاء المحاولة مرة أخرى');
    }
};

// ========== تصدير الدوال للاستخدام العام ==========
// التأكد من توفر الدوال في النطاق العام
window.showDashboard = showDashboard;
window.showSemester = showSemester;
window.showCourse = showCourse;
window.loadTabContent = loadTabContent;
window.animatePage = animatePage;
window.updateActiveStates = updateActiveStates;

// ========== دوال مساعدة إضافية ==========

// دالة للحصول على لون عشوائي من الثيم
function getRandomThemeColor() {
    const colors = [
        'var(--primary-color)',
        'var(--primary-dark)',
        'var(--primary-light)',
        'var(--accent-color)',
        'var(--success-color)',
        'var(--info-color)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// دالة لتنسيق التاريخ
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('ar-EG', options);
}

// دالة للحصول على رسالة ترحيب حسب الوقت
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
}

// دالة لعرض إشعار مؤقت
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--info-color)'};
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// دالة لتصدير المحتوى الحالي كـ PDF (للإصدارات المستقبلية)
function exportToPDF() {
    showNotification('جاري تجهيز التصدير...', 'info');
    // سيتم إضافة وظيفة التصدير لاحقاً
}

// دالة لمشاركة المحتوى
function shareContent(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).then(() => {
            showNotification('تم المشاركة بنجاح', 'success');
        }).catch(() => {
            showNotification('فشلت المشاركة', 'error');
        });
    } else {
        // نسخ الرابط للحافظة
        navigator.clipboard.writeText(url).then(() => {
            showNotification('تم نسخ الرابط', 'success');
        });
    }
}

// ========== إضافة CSS للإشعارات ==========
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    .notification {
        direction: rtl;
        font-family: 'Cairo', sans-serif;
        z-index: 9999;
    }
    
    .notification-success {
        background: linear-gradient(135deg, var(--success-color), #229954);
    }
    
    .notification-error {
        background: linear-gradient(135deg, var(--danger-color), #c0392b);
    }
    
    .notification-info {
        background: linear-gradient(135deg, var(--info-color), #2980b9);
    }
`;

document.head.appendChild(notificationStyles);

// ========== تصدير الدوال المساعدة ==========
window.getRandomThemeColor = getRandomThemeColor;
window.formatDate = formatDate;
window.getGreeting = getGreeting;
window.showNotification = showNotification;
window.shareContent = shareContent;
window.exportToPDF = exportToPDF;

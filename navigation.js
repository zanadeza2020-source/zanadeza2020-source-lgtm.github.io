// navigation.js - نظام التنقل بالروابط وإدارة المسارات
// آخر تحديث: تحسين معالجة التنقل والتمرير

// ========== دوال إنشاء الروابط ==========

// دالة لإنشاء رابط للصفحة الرئيسية
function getDashboardLink() {
    'use strict';
    return '#dashboard';
}

// دالة لإنشاء رابط للفصل الدراسي
function getSemesterLink(sem) {
    'use strict';
    if (sem === 1 || sem === 2) {
        return `#semester-${sem}`;
    }
    return '#dashboard';
}

// دالة لإنشاء رابط للمساق
function getCourseLink(key, tab = 'books') {
    'use strict';
    // التحقق من وجود المساق
    if (courses && courses[key]) {
        return `#course-${key}-${tab}`;
    }
    return '#dashboard';
}

// دالة لإنشاء رابط للتبويب داخل المساق
function getTabLink(courseKey, tab) {
    'use strict';
    return `#course-${courseKey}-${tab}`;
}

// ========== معالجة التغير في الـ Hash ==========

// مستمع حدث تغيير الـ Hash
window.addEventListener('hashchange', function() {
    'use strict';
    
    // التمرير لأعلى الصفحة فوراً
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
    
    // الحصول على الـ Hash الحالي
    const hash = window.location.hash.substring(1); // إزالة الـ #
    
    // معالجة التنقل
    handleNavigation(hash);
    
    // التمرير مرة أخرى بعد تغيير المحتوى
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto'
        });
    }, 100);
});

// ========== دالة معالجة التنقل الرئيسية ==========

function handleNavigation(hash) {
    'use strict';
    
    // إذا كان الـ Hash فارغ أو يساوي dashboard
    if (!hash || hash === 'dashboard') {
        showDashboard();
        updateActiveNavItem('dashboard');
        return;
    }
    
    // معالجة روابط الفصول الدراسية
    if (hash.startsWith('semester-')) {
        const sem = parseInt(hash.split('-')[1]);
        if (sem === 1 || sem === 2) {
            showSemester(sem);
            updateActiveNavItem(`semester-${sem}`);
        } else {
            // إذا كان رقم الفصل غير صحيح
            window.location.hash = getDashboardLink();
        }
        return;
    }
    
    // معالجة روابط المساقات
    if (hash.startsWith('course-')) {
        const parts = hash.split('-');
        const courseKey = parts[1];
        const tab = parts[2] || 'books';
        
        // التحقق من صحة التبويب
        const validTabs = ['books', 'lectures', 'summaries', 'exams'];
        const validTab = validTabs.includes(tab) ? tab : 'books';
        
        if (courses && courses[courseKey]) {
            showCourse(courseKey, validTab);
            updateActiveNavItem(`course-${courseKey}`);
            updateActiveTab(validTab);
        } else {
            // إذا كان المساق غير موجود
            window.location.hash = getDashboardLink();
        }
        return;
    }
    
    // إذا كان الرابط غير معروف
    window.location.hash = getDashboardLink();
}

// ========== تحديث عناصر التنقل النشطة ==========

// تحديث عنصر القائمة النشط
function updateActiveNavItem(activeId) {
    'use strict';
    
    // إزالة الكلاس النشط من جميع العناصر
    document.querySelectorAll('.nav-item, .card-link').forEach(item => {
        item.classList.remove('active');
    });
    
    // إضافة الكلاس النشط للعنصر المطابق
    if (activeId) {
        const activeElement = document.querySelector(`[data-nav="${activeId}"]`);
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }
}

// تحديث التبويب النشط داخل المساق
function updateActiveTab(tabName) {
    'use strict';
    
    // إزالة الكلاس النشط من جميع التبويبات
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // إضافة الكلاس النشط للتبويب المطابق
    const activeTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// ========== دوال التنقل المساعدة ==========

// العودة إلى الصفحة السابقة في التاريخ
function goBack() {
    'use strict';
    
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // إذا لم يكن هناك تاريخ سابق، نذهب للصفحة الرئيسية
        window.location.hash = getDashboardLink();
    }
}

// العودة إلى الصفحة الرئيسية
function goToDashboard() {
    'use strict';
    window.location.hash = getDashboardLink();
}

// الذهاب إلى فصل دراسي محدد
function goToSemester(sem) {
    'use strict';
    window.location.hash = getSemesterLink(sem);
}

// الذهاب إلى مساق محدد
function goToCourse(courseKey, tab = 'books') {
    'use strict';
    window.location.hash = getCourseLink(courseKey, tab);
}

// ========== الحصول على معلومات المسار الحالي ==========

// الحصول على نوع الصفحة الحالية
function getCurrentPageType() {
    'use strict';
    
    const hash = window.location.hash.substring(1);
    
    if (!hash || hash === 'dashboard') {
        return 'dashboard';
    }
    if (hash.startsWith('semester-')) {
        return 'semester';
    }
    if (hash.startsWith('course-')) {
        return 'course';
    }
    return 'unknown';
}

// الحصول على معلومات المسار الحالي
function getCurrentNavigationInfo() {
    'use strict';
    
    const hash = window.location.hash.substring(1);
    const info = {
        type: 'unknown',
        hash: hash,
        params: {}
    };
    
    if (!hash || hash === 'dashboard') {
        info.type = 'dashboard';
    }
    else if (hash.startsWith('semester-')) {
        info.type = 'semester';
        info.params.semester = parseInt(hash.split('-')[1]);
    }
    else if (hash.startsWith('course-')) {
        const parts = hash.split('-');
        info.type = 'course';
        info.params.courseKey = parts[1];
        info.params.tab = parts[2] || 'books';
    }
    
    return info;
}

// ========== إنشاء مسار للتنقل ==========

// إنشاء مسار كامل مع الحفاظ على المعلمات
function buildPath(type, params = {}) {
    'use strict';
    
    switch(type) {
        case 'dashboard':
            return getDashboardLink();
            
        case 'semester':
            if (params.sem) {
                return getSemesterLink(params.sem);
            }
            break;
            
        case 'course':
            if (params.courseKey) {
                return getCourseLink(params.courseKey, params.tab || 'books');
            }
            break;
    }
    
    return getDashboardLink();
}

// ========== التحقق من صحة الروابط ==========

// التحقق من صحة رابط الفصل
function isValidSemesterLink(hash) {
    'use strict';
    
    if (!hash.startsWith('semester-')) return false;
    
    const sem = parseInt(hash.split('-')[1]);
    return sem === 1 || sem === 2;
}

// التحقق من صحة رابط المساق
function isValidCourseLink(hash) {
    'use strict';
    
    if (!hash.startsWith('course-')) return false;
    
    const parts = hash.split('-');
    const courseKey = parts[1];
    const tab = parts[2] || 'books';
    
    // التحقق من وجود المساق
    if (!courses || !courses[courseKey]) return false;
    
    // التحقق من صحة التبويب
    const validTabs = ['books', 'lectures', 'summaries', 'exams'];
    return validTabs.includes(tab);
}

// ========== تصدير الدوال للاستخدام العام ==========

// تصدير دوال التنقل الأساسية
window.getDashboardLink = getDashboardLink;
window.getSemesterLink = getSemesterLink;
window.getCourseLink = getCourseLink;
window.getTabLink = getTabLink;

// تصدير دوال التنقل المساعدة
window.goBack = goBack;
window.goToDashboard = goToDashboard;
window.goToSemester = goToSemester;
window.goToCourse = goToCourse;

// تصدير دوال المعلومات
window.getCurrentPageType = getCurrentPageType;
window.getCurrentNavigationInfo = getCurrentNavigationInfo;
window.buildPath = buildPath;

// تصدير دوال التحقق
window.isValidSemesterLink = isValidSemesterLink;
window.isValidCourseLink = isValidCourseLink;

// ========== إضافة كلاسات CSS للتنقل ==========

// إضافة الأنماط الخاصة بالتنقل
const navigationStyles = document.createElement('style');
navigationStyles.textContent = `
    /* أنماط عناصر التنقل النشطة */
    .nav-item.active,
    .card-link.active {
        position: relative;
        box-shadow: 0 0 0 2px var(--primary-color);
    }
    
    .nav-item.active::after,
    .card-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 3px;
        background: var(--primary-color);
        border-radius: 3px;
        animation: slideIn 0.3s ease;
    }
    
    /* أنماط التبويبات النشطة */
    .tab.active {
        position: relative;
        overflow: hidden;
    }
    
    .tab.active::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: white;
        animation: slideIn 0.3s ease;
    }
    
    /* أنيميشن للعناصر النشطة */
    @keyframes slideIn {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 30px;
            opacity: 1;
        }
    }
    
    @keyframes slideInFull {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 100%;
            opacity: 1;
        }
    }
    
    /* تحسينات للشاشات الصغيرة */
    @media (max-width: 768px) {
        .nav-item.active::after {
            width: 20px;
        }
    }
`;

document.head.appendChild(navigationStyles);

// ========== معالجة التحميل الأول للصفحة ==========

// التأكد من معالجة التنقل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // التمرير لأعلى الصفحة
    window.scrollTo(0, 0);
    
    // معالجة الـ Hash الحالي
    const hash = window.location.hash.substring(1);
    handleNavigation(hash);
    
    // إضافة مستمع لروابط التنقل
    setupNavigationLinks();
});

// ========== إعداد روابط التنقل ==========

function setupNavigationLinks() {
    'use strict';
    
    // إضافة معالج نقر لجميع الروابط الداخلية
    document.addEventListener('click', function(e) {
        // البحث عن الرابط الذي تم النقر عليه
        const link = e.target.closest('a');
        
        if (link && link.getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            window.location.hash = href.substring(1);
        }
    });
}

// ========== حفظ حالة التنقل ==========

// حفظ الحالة الحالية في sessionStorage
function saveNavigationState() {
    'use strict';
    
    const state = {
        hash: window.location.hash,
        timestamp: Date.now()
    };
    
    try {
        sessionStorage.setItem('navigationState', JSON.stringify(state));
    } catch (e) {
        console.warn('فشل في حفظ حالة التنقل:', e);
    }
}

// استعادة الحالة السابقة
function restoreNavigationState() {
    'use strict';
    
    try {
        const saved = sessionStorage.getItem('navigationState');
        if (saved) {
            const state = JSON.parse(saved);
            // التحقق من أن الحالة لم تتجاوز 30 دقيقة
            if (Date.now() - state.timestamp < 30 * 60 * 1000) {
                if (state.hash && state.hash !== window.location.hash) {
                    window.location.hash = state.hash;
                }
            }
        }
    } catch (e) {
        console.warn('فشل في استعادة حالة التنقل:', e);
    }
}

// حفظ الحالة عند تغيير التنقل
window.addEventListener('hashchange', saveNavigationState);

// ========== تصدير دوال إضافية ==========
window.handleNavigation = handleNavigation;
window.updateActiveNavItem = updateActiveNavItem;
window.updateActiveTab = updateActiveTab;
window.saveNavigationState = saveNavigationState;
window.restoreNavigationState = restoreNavigationState;

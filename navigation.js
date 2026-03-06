// navigation.js (نسخة موحدة ومحسنة)

// ===================== روابط الموقع =====================
function getDashboardLink() { return '#dashboard'; }
function getSemesterLink(sem) { return `#semester-${sem}`; }
function getCourseLink(key, tab = 'books') { return `#course-${key}-${tab}`; }

// ===================== معالجة التنقل =====================
function handleNavigation() {
    'use strict';
    const hash = window.location.hash.substring(1);

    if (!hash || hash === 'dashboard') {
        showDashboard();
    } else if (hash.startsWith('semester-')) {
        const sem = parseInt(hash.split('-')[1]);
        if ([1, 2].includes(sem)) {
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
}

// ===================== استدعاء عند التغير والتحميل =====================
window.addEventListener('hashchange', handleNavigation);
document.addEventListener('DOMContentLoaded', handleNavigation);

// ===================== البحث الشامل =====================
let searchTimeout;

window.globalSearch = function(val) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(val), 300);
};

// ===================== إحصائيات الموقع =====================
function getSiteStats() {
    let totalBooks = 0, totalLectures = 0;
    const totalCourses = Object.keys(courses).length;

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

// تصدير الدوال للاستخدام العام
window.getSiteStats = getSiteStats;
window.performSearch = performSearch;

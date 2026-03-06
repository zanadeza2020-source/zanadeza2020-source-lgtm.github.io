// navigation.js - نظام التنقل بالروابط

// دوال إنشاء الروابط
function getDashboardLink() {
    return '#dashboard';
}

function getSemesterLink(sem) {
    return `#semester-${sem}`;
}

function getCourseLink(key, tab = 'books') {
    return `#course-${key}-${tab}`;
}

// معالجة التغير في الـ Hash
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1); // إزالة الـ #
    
    if (!hash || hash === 'dashboard') {
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
});

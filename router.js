/**
 * نظام التنقل بالروابط (Router)
 * يدير تغيير الصفحات بناءً على الـ Hash
 */

// ===== إنشاء الروابط =====

/**
 * الحصول على رابط الصفحة الرئيسية
 * @returns {string} رابط الصفحة الرئيسية
 */
function getDashboardLink() {
    return '#dashboard';
}

/**
 * الحصول على رابط فصل دراسي
 * @param {number} sem - رقم الفصل (1 أو 2)
 * @returns {string} رابط الفصل
 */
function getSemesterLink(sem) {
    return `#semester-${sem}`;
}

/**
 * الحصول على رابط مساق
 * @param {string} key - مفتاح المساق
 * @param {string} tab - التبويب (books, lectures, summaries, exams)
 * @returns {string} رابط المساق
 */
function getCourseLink(key, tab = 'books') {
    return `#course-${key}-${tab}`;
}

// ===== معالجة التنقل =====

/**
 * معالجة تغيير الـ Hash
 */
function handleHashChange() {
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
        
        if (getCourseByKey(courseKey)) {
            showCourse(courseKey, tab);
        } else {
            showDashboard();
        }
    } else {
        showDashboard();
    }
}

/**
 * التمرير لأعلى الصفحة بسلاسة
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * تحديث محتوى الصفحة مع التمرير لأعلى
 * @param {string} html - مح

/**
 * ملف مكونات الواجهة
 * يحتوي على دوال لإنشاء عناصر HTML قابلة لإعادة الاستخدام
 */

// ===== مكونات ثابتة تتكرر في كل الصفحات =====

/**
 * إنشاء رابط الواتساب
 * @returns {string} HTML رابط الواتساب
 */
function createWhatsAppLink() {
    return `
        <a href="https://chat.whatsapp.com/E3ldyioYKau6briyiP8lCB?mode=gi_t" target="_blank" class="whatsapp-link" style="text-decoration: none;">
            <i class="fab fa-whatsapp"></i>
            <span class="whatsapp-text">انضم إلى مجموعتنا على واتساب</span>
            <span class="whatsapp-badge"><i class="fas fa-plus"></i> انضم الآن</span>
        </a>
    `;
}

/**
 * إنشاء إهداء الشهيد
 * @returns {string} HTML إهداء الشهيد
 */
function createMartyrDedication() {
    return `
        <div class="martyr-dedication">
            <div class="martyr-icon">
                <i class="fas fa-star-and-crescent"></i>
                <i class="fas fa-heart"></i>
                <i class="fas fa-dove"></i>
            </div>
            <div class="martyr-title">إهداء لروح الشهيد الطاهرة</div>
            <div class="martyr-name">ياسر عطيه المصري (ابو مصعب)</div>
            <div class="martyr-dua">
                <i class="fas fa-quote-right"></i>
                نسأل الله أن يتقبله في الشهداء، وأن يرفع درجته في عليين، 
                وأن يجعل هذا العمل صدقة جارية له إلى يوم الدين 
                <i class="fas fa-quote-left"></i>
                <br>
                <span>🤲</span>
            </div>
        </div>
    `;
}

// ===== مكونات الكروت والعناصر =====

/**
 * إنشاء كارت مساق
 * @param {string} key - مفتاح المساق
 * @param {Object} course - بيانات المساق
 * @returns {string} HTML كارت المساق
 */
function createCourseCard(key, course) {
    return `
        <a href="#course-${key}-books" class="card-link" style="text-decoration: none;">
            <div class="card">
                <i class="fas ${course.icon}"></i>
                <h3>${course.title}</h3>
                <span class="code">${course.code}</span>
            </div>
        </a>
    `;
}

/**
 * إنشاء كارت كتاب
 * @param {Object} book - بيانات الكتاب
 * @returns {string} HTML كارت الكتاب
 */
function createBookCard(book) {
    if (book.coming) {
        return `
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
        return `
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
}

/**
 * إنشاء كارت محاضرة
 * @param {Object} lecture - بيانات المحاضرة
 * @returns {string} HTML كارت المحاضرة
 */
function createLectureCard(lecture) {
    const icon = lecture.type === 'youtube' ? 'fa-youtube' : 'fa-google-drive';
    const iconColor = lecture.type === 'youtube' ? '#FF0000' : '#34A853';
    
    return `
        <a href="${lecture.link}" class="book-button" target="_blank" rel="noopener noreferrer">
            <i class="fab ${icon}" style="color: ${iconColor};"></i>
            <span>${lecture.name}</span>
            <div class="click-here">
                <i class="fas fa-hand-pointer"></i>
                مشاهدة
            </div>
        </a>
    `;
}

/**
 * إنشاء كارت محتوى عام (ملخصات واختبارات)
 * @param {string} name - اسم المحتوى
 * @returns {string} HTML كارت المحتوى
 */
function createContentCard(name) {
    return `
        <div class="content-card">
            <div class="content-info">
                <i class="fas fa-file-pdf"></i>
                <h4>${name}</h4>
            </div>
            <a href="#" class="download-btn" onclick="alert('سيتم إضافة الرابط قريباً'); return false;">
                <i class="fas fa-download"></i>
                تحميل
            </a>
        </div>
    `;
}

/**
 * إنشاء رسالة "لا توجد محتوى"
 * @param {string} type - نوع المحتوى (محاضرات، كتب، الخ)
 * @returns {string} HTML رسالة عدم وجود محتوى
 */
function createNoContentMessage(type) {
    const icons = {
        lectures: 'fa-video-slash',
        books: 'fa-book-open',
        summaries: 'fa-file-alt',
        exams: 'fa-question-circle'
    };
    
    const messages = {
        lectures: 'لا توجد محاضرات متاحة حالياً',
        books: 'لا توجد كتب متاحة حالياً',
        summaries: 'لا توجد ملخصات متاحة حالياً',
        exams: 'لا توجد اختبارات متاحة حالياً'
    };
    
    const icon = icons[type] || 'fa-frown';
    const message = messages[type] || 'لا يوجد محتوى متاح';
    
    return `
        <div class="content-card" style="justify-content: center; text-align: center;">
            <div class="content-info">
                <i class="fas ${icon}" style="font-size: 2rem; color: #95a5a6;"></i>
                <h4 style="color: #7f8c8d;">${message}</h4>
            </div>
        </div>
    `;
}

// ===== دوال مساعدة لإنشاء أقسام كاملة =====

/**
 * إنشاء تبويبات المساق
 * @param {string} key - مفتاح المساق
 * @param {string} activeTab - التبويب النشط
 * @returns {string} HTML التبويبات
 */
function createTabs(key, activeTab) {
    const tabs = [
        { id: 'books', icon: 'fa-book', name: 'كتب' },
        { id: 'summaries', icon: 'fa-file-alt', name: 'ملخصات' },
        { id: 'exams', icon: 'fa-question-circle', name: 'اختبارات' },
        { id: 'lectures', icon: 'fa-video', name: 'محاضرات' }
    ];
    
    return tabs.map(tab => `
        <a href="#course-${key}-${tab.id}" class="tab ${activeTab === tab.id ? 'active' : ''}" style="text-decoration: none; color: inherit;">
            <i class="fas ${tab.icon}"></i> ${tab.name}
        </a>
    `).join('');
}

/**
 * إنشاء قسم الكتب
 * @param {Array} books - مصفوفة الكتب
 * @returns {string} HTML قسم الكتب
 */
function createBooksSection(books) {
    let html = `
        <div class="books-section">
            <div class="section-title">
                <i class="fas fa-book"></i>
                <span>الكتب الدراسية</span>
            </div>
    `;
    
    if (books && books.length > 0) {
        books.forEach(book => {
            html += createBookCard(book);
        });
    } else {
        html += createNoContentMessage('books');
    }
    
    html += '</div>';
    return html;
}

/**
 * إنشاء قسم المحاضرات
 * @param {Array} lectures - مصفوفة المحاضرات
 * @returns {string} HTML قسم المحاضرات
 */
function createLecturesSection(lectures) {
    let html = `
        <div class="books-section">
            <div class="section-title">
                <i class="fas fa-video"></i>
                <span>المحاضرات المسجلة</span>
            </div>
    `;
    
    if (lectures && lectures.length > 0) {
        lectures.forEach(lecture => {
            html += createLectureCard(lecture);
        });
    } else {
        html += createNoContentMessage('lectures');
    }
    
    html += '</div>';
    return html;
}

/**
 * إنشاء قسم عام (ملخصات/اختبارات)
 * @param {string} type - نوع القسم (summaries/exams)
 * @param {Array} items - مصفوفة العناصر
 * @returns {string} HTML القسم
 */
function createGenericSection(type, items) {
    const titles = {
        summaries: 'الملخصات',
        exams: 'الاختبارات'
    };
    
    const icons = {
        summaries: 'fa-file-alt',
        exams: 'fa-question-circle'
    };
    
    let html = `
        <div class="books-section">
            <div class="section-title">
                <i class="fas ${icons[type]}"></i>
                <span>${titles[type]}</span>
            </div>
    `;
    
    if (items && items.length > 0) {
        items.forEach(item => {
            html += createContentCard(item.name);
        });
    } else {
        html += createNoContentMessage(type);
    }
    
    html += '</div>';
    return html;
}

/**
 * إنشاء زر الرجوع
 * @param {string} target - الهدف (مثلاً '#dashboard' أو '#semester-1')
 * @returns {string} HTML زر الرجوع
 */
function createBackButton(target) {
    return `
        <a href="${target}" class="back-button" style="display: inline-block; text-decoration: none;">
            <i class="fas fa-arrow-right"></i>
            رجوع
        </a>
    `;
}

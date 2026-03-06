// ui-components.js - المكونات المتكررة مع دعم الثيمات

// دالة لتغيير الثيم
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// رابط مجموعة الواتساب
function getWhatsAppLink() {
    return `
        <a href="https://chat.whatsapp.com/E3ldyioYKau6briyiP8lCB?mode=gi_t" target="_blank" class="whatsapp-link">
            <i class="fab fa-whatsapp"></i>
            <span class="whatsapp-text">انضم إلى مجموعتنا على واتساب</span>
            <span class="whatsapp-badge"><i class="fas fa-plus"></i> انضم الآن</span>
        </a>
    `;
}

// إهداء الشهيد
function getMartyrDedication() {
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

// التوقيع
function getSignature() {
    return `
        <div class="signature">
            <i class="fas fa-code"></i>
            <span class="engineer">مهندس</span>
            <span class="nader">نادر</span>
            <i class="fas fa-crown crown-icon"></i>
            <i class="fas fa-heart"></i>
        </div>
    `;
}

// التبويبات
function getTabs(courseKey, activeTab) {
    const tabs = ['books', 'summaries', 'exams', 'lectures'];
    const tabNames = {
        books: 'كتب',
        summaries: 'ملخصات',
        exams: 'اختبارات',
        lectures: 'محاضرات'
    };
    const tabIcons = {
        books: 'fa-book',
        summaries: 'fa-file-alt',
        exams: 'fa-question-circle',
        lectures: 'fa-video'
    };
    
    let html = '<div class="tabs">';
    
    tabs.forEach(tab => {
        html += `
            <a href="#course-${courseKey}-${tab}" class="tab ${activeTab === tab ? 'active' : ''}">
                <i class="fas ${tabIcons[tab]}"></i> ${tabNames[tab]}
            </a>
        `;
    });
    
    html += '</div>';
    return html;
}

// زر الرجوع
function getBackButton(target) {
    return `
        <a href="${target}" class="back-button">
            <i class="fas fa-arrow-right"></i>
            رجوع
        </a>
    `;
}

// دوال مساعدة لتغيير الثيم لكل مكون مباشرة
function applyThemeToComponents(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.style.setProperty('--primary-color', '#6BA5E8');
        root.style.setProperty('--primary-dark', '#2C3E50');
        root.style.setProperty('--card-bg', 'rgba(44, 62, 80, 0.95)');
        root.style.setProperty('--bg-gradient-start', '#1C2833');
        root.style.setProperty('--bg-gradient-end', '#2C3E50');
        root.style.setProperty('--text-color', '#ECF0F1');
        root.style.setProperty('--text-light', '#ABB2B9');
        root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.4)');
        root.style.setProperty('--hover-bg', 'rgba(44, 62, 80, 0.85)');
    } else {
        // ثيم فاتح
        root.style.setProperty('--primary-color', '#4A90E2');
        root.style.setProperty('--primary-dark', '#357ABD');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
        root.style.setProperty('--bg-gradient-start', '#E8F0FE');
        root.style.setProperty('--bg-gradient-end', '#D1E2FC');
        root.style.setProperty('--text-color', '#2C3E50');
        root.style.setProperty('--text-light', '#5D6D7E');
        root.style.setProperty('--shadow-color', 'rgba(74, 144, 226, 0.2)');
        root.style.setProperty('--hover-bg', '#F0F7FF');
    }
}

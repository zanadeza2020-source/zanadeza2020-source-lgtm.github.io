// ui-components.js - المكونات المتكررة في الواجهة

// رابط مجموعة الواتساب
function getWhatsAppLink() {
    return `
        <a href="https://chat.whatsapp.com/E3ldyioYKau6briyiP8lCB?mode=gi_t" target="_blank" class="whatsapp-link" style="text-decoration: none;">
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
            <i class="fas fa-heart" style="color: #e74c3c;"></i>
        </div>
    `;
}

// أزرار التبويبات
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
            <a href="#course-${courseKey}-${tab}" class="tab ${activeTab === tab ? 'active' : ''}" style="text-decoration: none; color: inherit;">
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
        <a href="${target}" class="back-button" style="display: inline-block; text-decoration: none;">
            <i class="fas fa-arrow-right"></i>
            رجوع
        </a>
    `;
}

// main.js - نقطة الدخول الرئيسية للتطبيق

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة الـ CSS الإضافي
    addAdditionalStyles();
    
    // معالجة التحميل الأول
    handleInitialLoad();
});

// إضافة الـ CSS الإضافي
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تنسيقات إضافية */
        .whatsapp-link {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 20px;
            background: rgba(37, 211, 102, 0.1);
            border-radius: 15px;
            margin-bottom: 15px;
            text-decoration: none;
            color: var(--text-color);
            transition: all 0.3s ease;
            border: 1px solid rgba(37, 211, 102, 0.3);
            backdrop-filter: blur(5px);
            font-size: clamp(0.9rem, 3vw, 1rem);
        }
        
        .whatsapp-link:hover {
            background: rgba(37, 211, 102, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(37, 211, 102, 0.2);
            border-color: var(--whatsapp-color);
        }
        
        .whatsapp-link i {
            font-size: 1.4rem !important;
            color: var(--whatsapp-color);
            margin-left: 10px;
        }
        
        .whatsapp-text {
            flex: 1;
            font-weight: 600;
            color: #075E54;
        }
        
        .whatsapp-badge {
            background: var(--whatsapp-color);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            white-space: nowrap;
        }
        
        .whatsapp-badge i {
            color: white !important;
            font-size: 0.8rem !important;
            margin-left: 3px;
        }
        
        .martyr-dedication {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            padding: 15px 20px;
            margin: 20px auto 30px auto;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 8px 20px var(--shadow-color);
            transition: all 0.3s ease;
        }
        
        .martyr-dedication:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px var(--shadow-color);
            background: var(--hover-bg);
        }
        
        .martyr-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .martyr-icon i {
            font-size: clamp(1rem, 3vw, 1.3rem) !important;
            color: var(--primary-color);
        }
        
        .martyr-icon i.fa-heart {
            color: #e74c3c;
        }
        
        .martyr-title {
            font-size: clamp(0.95rem, 3vw, 1.1rem);
            font-weight: 600;
            color: var(--text-color);
            margin-bottom: 5px;
            letter-spacing: 0.5px;
        }
        
        .martyr-name {
            font-size: clamp(1.1rem, 4vw, 1.3rem);
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 8px;
            background: rgba(74, 144, 226, 0.1);
            display: inline-block;
            padding: 3px 15px;
            border-radius: 30px;
            border: 1px solid rgba(74, 144, 226, 0.2);
        }
        
        .martyr-dua {
            font-size: clamp(0.85rem, 2.5vw, 0.95rem);
            color: var(--text-light);
            line-height: 1.6;
            padding: 0 5px;
        }
        
        .martyr-dua i {
            font-size: 0.8rem !important;
            color: var(--primary-color);
            margin: 0 3px;
            opacity: 0.7;
        }
        
        .martyr-dua span {
            font-size: 1.1rem !important;
            color: var(--primary-color);
            margin-top: 5px;
        }
        
        .book-button {
            display: flex;
            align-items: center;
            padding: 15px 20px;
            background: var(--card-bg);
            border-radius: 15px;
            margin-bottom: 12px;
            text-decoration: none;
            color: var(--text-color);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            font-size: clamp(0.9rem, 3vw, 1rem);
            backdrop-filter: blur(5px);
        }
        
        .book-button:hover {
            background: var(--hover-bg);
            transform: translateX(-5px);
            box-shadow: 0 8px 20px var(--shadow-color);
            border-color: var(--primary-light);
        }
        
        .book-button i {
            font-size: clamp(1rem, 3vw, 1.3rem) !important;
            margin-left: 10px;
            color: var(--primary-color);
        }
        
        .click-here {
            margin-right: auto;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark)) !important;
            color: white !important;
            padding: 6px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
        }
        
        .click-here i {
            color: white !important;
            font-size: 0.9rem !important;
            margin-left: 3px;
        }
        
        .books-section {
            background: var(--card-bg);
            border-radius: 25px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
            color: var(--text-color);
            font-size: clamp(1.1rem, 3.5vw, 1.3rem);
            border-bottom: 2px solid rgba(74, 144, 226, 0.2);
            padding-bottom: 12px;
        }
        
        .section-title i {
            font-size: clamp(1.1rem, 3.5vw, 1.5rem) !important;
            color: var(--primary-color);
        }
        
        .content-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 20px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 15px;
            margin-bottom: 12px;
            border: 1px solid rgba(74, 144, 226, 0.1);
            transition: all 0.3s ease;
        }
        
        .content-card:hover {
            background: white;
            box-shadow: 0 5px 15px rgba(74, 144, 226, 0.1);
        }
        
        .content-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .content-info i {
            font-size: clamp(1.1rem, 3.5vw, 1.5rem) !important;
        }
        
        .content-info h4 {
            font-size: clamp(0.9rem, 3vw, 1rem);
            color: var(--text-color);
            margin: 0;
        }
        
        .download-btn {
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            padding: 8px 18px;
            border-radius: 25px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .download-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px var(--shadow-color);
        }
        
        .download-btn i {
            font-size: 0.8rem !important;
            margin-left: 5px;
            color: white !important;
        }
        
        .signature {
            text-align: center;
            margin-top: 40px;
            padding: 15px 0;
            font-size: 0.9rem;
            color: var(--text-light);
            border-top: 1px solid rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .signature i {
            font-size: 0.9rem;
            color: var(--primary-color);
            opacity: 0.6;
        }
        
        .signature .engineer {
            color: var(--text-color);
            font-weight: 500;
        }
        
        .signature .nader {
            color: var(--primary-color);
            font-weight: 700;
        }
        
        .signature .crown-icon {
            color: var(--gold);
            opacity: 1;
        }
        
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 25px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .tab {
            background: var(--card-bg);
            padding: 10px 20px;
            border-radius: 30px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            border: 1px solid var(--border-color);
            color: var(--text-color);
            font-size: clamp(0.9rem, 3vw, 1rem);
            backdrop-filter: blur(5px);
        }
        
        .tab.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            box-shadow: 0 4px 12px var(--shadow-color);
        }
        
        .tab.active i {
            color: white !important;
        }
        
        .tab:hover {
            background: var(--primary-light);
            color: white;
            border-color: var(--primary-light);
        }
        
        .tab:hover i {
            color: white !important;
        }
        
        .tab i {
            font-size: clamp(0.9rem, 2.5vw, 1.1rem) !important;
            margin-left: 5px;
        }
    `;
    
    document.head.appendChild(style);
}

// معالجة التحميل الأول
function handleInitialLoad() {
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
}

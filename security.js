// security.js - نظام حماية الموقع

(function() {
    let devToolsOpen = false;
    let debuggerDetected = false;

    // دالة عرض التحذير الأمني
    function showSecurityAlert() {
        if (document.getElementById('security-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'security-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            direction: rtl;
            font-family: 'Cairo', sans-serif;
        `;
        
        overlay.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <i class="fas fa-shield-halved" style="font-size: 60px; color: #ffd700; margin-bottom: 20px;"></i>
                <h2 style="color: white; margin-bottom: 15px;">🔒 تنبيه أمني</h2>
                <p style="color: #e0e0e0; margin-bottom: 25px; line-height: 1.8;">
                    هذا الموقع محمي بموجب حقوق الملكية الفكرية.<br>
                    غير مسموح بفتح أدوات المطور.
                </p>
                <p style="color: #ffd700; font-size: 14px;">
                    سيتم إعادة التوجيه تلقائياً...
                </p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
        }, 3000);
    }

    // كشف تغير حجم النافذة
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        
        if (widthThreshold || heightThreshold) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                showSecurityAlert();
            }
        } else {
            devToolsOpen = false;
        }
    }

    // استخدام debugger للكشف
    setInterval(function() {
        const start = performance.now();
        debugger;
        const end = performance.now();
        
        if (end - start > 100) {
            if (!debuggerDetected) {
                debuggerDetected = true;
                showSecurityAlert();
            }
        } else {
            debuggerDetected = false;
        }
    }, 1000);

    // منع اختصارات لوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // منع F12
        if (e.key === 'F12') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
        
        // منع Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
        
        // منع Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
        
        // منع Ctrl+U
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
        
        // منع Ctrl+S
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
        
        // منع Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            showSecurityAlert();
            return false;
        }
    });

    // منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityAlert();
        return false;
    });

    // السماح بتحديد النص ونسخه
    // تم إزالة منع selectstart, copy, cut, paste

    // تفعيل كشف أدوات المطور كل ثانية
    setInterval(detectDevTools, 1000);
})();

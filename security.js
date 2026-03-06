// security.js - نسخة محسنة لنظام حماية الموقع
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
            width: 100vw;
            height: 100vh;
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
            if (overlay && overlay.parentNode) overlay.remove();
        }, 3000);
    }

    // كشف فتح أدوات المطور واستخدام debugger
    function detectDevTools() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        const start = performance.now();
        debugger;
        const end = performance.now();

        if ((widthThreshold || heightThreshold) && !devToolsOpen) {
            devToolsOpen = true;
            showSecurityAlert();
        } else if (!widthThreshold && !heightThreshold) {
            devToolsOpen = false;
        }

        if (end - start > 100 && !debuggerDetected) {
            debuggerDetected = true;
            showSecurityAlert();
        } else if (end - start <= 100) {
            debuggerDetected = false;
        }
    }

    // منع اختصارات لوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
            (e.ctrlKey && ['u', 's'].includes(key))
        ) {
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

    // تفعيل كشف أدوات المطور كل ثانية
    setInterval(detectDevTools, 1000);
})();

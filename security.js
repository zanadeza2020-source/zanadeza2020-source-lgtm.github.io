/**
 * نظام الحماية المتقدم للموقع
 * يمنع فتح أدوات المطور والتلاعب بالكود
 */

(function() {
    'use strict';
    
    // متغيرات الحالة
    let devToolsOpen = false;
    let debuggerDetected = false;
    let securityAlertShown = false;

    /**
     * عرض التحذير الأمني
     */
    function showSecurityAlert() {
        if (securityAlertShown || document.getElementById('security-overlay')) return;
        
        securityAlertShown = true;
        
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
                securityAlertShown = false;
            }
        }, 3000);
    }

    /**
     * كشف أدوات المطور عن طريق تغير حجم النافذة
     */
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

    /**
     * كشف استخدام debugger
     */
    function detectDebugger() {
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
    }

    /**
     * منع اختصارات لوحة المفاتيح الخطيرة
     * @param {KeyboardEvent} e 
     */
    function preventKeyboardShortcuts(e) {
        // قائمة الاختصارات الممنوعة
        const forbiddenCombos = [
            { key: 'F12' },
            { ctrl: true, shift: true, key: 'I' },
            { ctrl: true, shift: true, key: 'J' },
            { ctrl: true, key: 'u' },
            { ctrl: true, key: 's' },
            { ctrl: true, shift: true, key: 'C' }
        ];

        for (const combo of forbiddenCombos) {
            if (combo.key === e.key) {
                if (combo.ctrl && !e.ctrlKey) continue;
                if (combo.shift && !e.shiftKey) continue;
                if (combo.alt && !e.altKey) continue;
                
                e.preventDefault();
                showSecurityAlert();
                return false;
            }
        }
    }

    /**
     * إضافة علامة مائية ديناميكية
     */
    function addWatermark() {
        const watermark = document.createElement('div');
        watermark.innerHTML = 'جامعة الأقصى - تمريض';
        watermark.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            opacity: 0.1;
            font-size: 12px;
            color: var(--text-color);
            pointer-events: none;
            z-index: 9999;
            user-select: none;
        `;
        document.body.appendChild(watermark);
    }

    // ===== تفعيل الحماية =====
    
    // 1. كشف أدوات المطور كل ثانية
    setInterval(detectDevTools, 1000);
    
    // 2. كشف debugger كل ثانية
    setInterval(detectDebugger, 1000);
    
    // 3. منع اختصارات لوحة المفاتيح
    document.addEventListener('keydown', preventKeyboardShortcuts);
    
    // 4. منع النقر بالزر الأيمن
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showSecurityAlert();
        return false;
    });
    
    // 5. منع حفظ الصفحة (محاولات إضافية)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            showSecurityAlert();
        }
    });
    
    // 6. إضافة العلامة المائية
    window.addEventListener('load', addWatermark);
    
    // 7. حماية إضافية: كشف محاولات تصدير الصفحة
    document.addEventListener('copy', (e) => {
        e.clipboardData.setData('text/plain', '📚 محتوى محمي - جامعة الأقصى');
        e.preventDefault();
    });

    // 8. كشف محاولات فتح أدوات المطور من القائمة
    let lastTime = 0;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            lastTime = Date.now();
        } else {
            if (Date.now() - lastTime < 100) {
                showSecurityAlert();
            }
        }
    });

})();

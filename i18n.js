// Lightweight Arabic/English interface layer. Source data remains language-neutral.
(function(){
  const pairs={
    'الرئيسية':'Dashboard','الملاك':'Owners','العقارات':'Properties','الوحدات':'Units','المستأجرون':'Tenants','العقود':'Leases','الاستحقاقات':'Dues','سندات القبض':'Receipt Vouchers','سندات الصرف':'Payment Vouchers','الذمم المالية':'Financial Liabilities','التقارير':'Reports','الإعدادات':'Settings',
    'لوحة التحكم':'Dashboard','الأولى لإدارة الأملاك':'ALOLA Property Management','إدارة الأملاك':'Property Management','العقارات':'Properties','الوحدات المؤجرة':'Occupied Units','المستحقات غير المسددة':'Outstanding Dues','رصيد المكتب النقدي':'Office Cash Balance','ذمم الملاك الحالية':'Current Owner Liabilities','ملخص المكتب':'Office Summary','لا يوجد ملاك':'No owners found','بنية النظام:':'System structure:','لا تحتاج لإعادة إدخال نفس العلاقة في كل مرة.':'Relationships are entered once and reused automatically.','مالك ← عقار ← وحدة ← عقد/مستأجر ← استحقاقات ← قبض/صرف ← ذمم مالية.':'Owner → Property → Unit → Lease/Tenant → Dues → Receipts/Payments → Liabilities.','نقد داخل من سندات القبض:':'Cash received:','مصروفات عقارات:':'Property expenses:','تحويلات للملاك:':'Owner transfers:','دخل المكتب:':'Office income:','مصروف المكتب:':'Office expenses:','ملف ومحفظة وذمة مالية لكل مالك':'A complete profile, portfolio, and account for every owner','العقار حاوية والوحدة هي المساحة المؤجرة فعلياً':'Properties contain the individual rentable units','شقة/بوتيك/محل/مكتب/بدروم كسجل مستقل':'Each apartment, boutique, shop, office, basement, or warehouse has its own record','ملف مستقل يحتفظ بالعقود والمدفوعات والتاريخ':'An independent tenant record with leases, payments, and history','عرض العقود وتوليد الاستحقاقات الدورية':'Review leases and generate recurring dues','اختر المستأجر؛ العقد والوحدة والعقار والمالك تُملأ تلقائياً':'Select a tenant; the lease, unit, property, and owner fill automatically','مصروف مرتبط بالعقار أو الوحدة مع فاتورة مرفقة':'An expense linked to a property or unit with an attached invoice','الحالة المالية':'Financial Status','مسدد':'Settled',
    '+ سند قبض':'+ Receipt Voucher','+ سند صرف':'+ Payment Voucher','+ إضافة مالك':'+ Add Owner','+ إضافة عقار':'+ Add Property','+ إضافة وحدة':'+ Add Unit','+ إضافة مستأجر':'+ Add Tenant','+ إضافة عقد':'+ Add Lease','+ إضافة استحقاق':'+ Add Due','+ تسجيل تحويل للمالك':'+ Owner Transfer','إضافة مالك':'Add Owner','تعديل المالك':'Edit Owner','إضافة عقار':'Add Property','تعديل العقار':'Edit Property','إضافة وحدة':'Add Unit','تعديل الوحدة':'Edit Unit','إضافة مستأجر وعقار مستأجر':'Add Tenant and Rental','تعديل المستأجر والعقار المستأجر':'Edit Tenant and Rental','عقد جديد':'New Lease','تعديل العقد':'Edit Lease','اربط المستأجر بعقار ووحدة وعقد من نفس الصفحة.':'Link the tenant to a property, unit, and lease from the same page.',
    'بحث':'Search','الحقل':'Field','كل الحقول':'All fields','قيمة الفلتر':'Filter value','مسح':'Clear','إجراءات':'Actions','تعديل':'Edit','حذف':'Delete','حفظ':'Save','إلغاء':'Cancel','رجوع':'Back','فتح/طباعة':'Open / Print','طباعة / PDF':'Print / PDF','عرض':'View','تحميل':'Download','اختر':'Select','الكل':'All',
    'المالك':'Owner','العقار':'Property','الوحدة':'Unit','المستأجر':'Tenant','العقد':'Lease','الاستحقاق':'Due','السند':'Voucher','المبلغ':'Amount','التاريخ':'Date','الطريقة':'Method','الحالة':'Status','النوع':'Type','الاسم':'Name','الجوال':'Mobile','البريد':'Email','العنوان':'Address','ملاحظات':'Notes','الوصف':'Description','الفئة':'Category','المرجع':'Reference','الدور':'Floor','رقم العضوية':'Membership No.','السجل التجاري':'C.R.','طريقة الدفع':'Payment Method',
    'نشط':'Active','مغلق':'Closed','متاح':'Available','مؤجر':'Occupied','منتهي':'Expired','مستحق':'Due','متأخر':'Overdue','مدفوع':'Paid','مدفوع جزئياً':'Partially Paid','تحويل بنكي':'Bank Transfer','نقداً':'Cash','بطاقة':'Card','شيك':'Cheque','شهري':'Monthly','ربع سنوي':'Quarterly','نصف سنوي':'Semiannual','سنوي':'Annual',
    'اسم المالك':'Owner Name','الهوية / السجل':'ID / Registration','الهوية / الإقامة':'ID / Residency','البنك':'Bank','رصيد الذمة الافتتاحي':'Opening Liability','اسم العقار':'Property Name','نوع العقار':'Property Type','اسم/رقم الوحدة':'Unit Name / Number','نوع الوحدة':'Unit Type','الإيجار السنوي':'Annual Rent','الإيجار السنوي الافتراضي':'Default Annual Rent','مبلغ التأمين':'Security Deposit','بداية العقد':'Lease Start','نهاية العقد':'Lease End','بداية الإيجار':'Rental Start','نهاية الإيجار':'Rental End','دورية السداد':'Payment Frequency','رقم/مرجع العقد':'Lease Number / Reference','الوحدة المستأجرة':'Rented Unit','العقار الذي يستأجره':'Rented Property','بدون عقار حالياً':'No property currently','اختر الوحدة':'Select unit','اختر العقار أولاً':'Select a property first',
    'المستأجرون':'Tenants','العقود':'Leases','الاستحقاقات':'Dues','سند قبض جديد':'New Receipt Voucher','سند صرف جديد':'New Payment Voucher','سند قبض':'Receipt Voucher','سند صرف':'Payment Voucher','المستفيد':'Payee','وصلنا من السيد':'Received From','مبلغ وقدره':'The Sum of','وذلك عن':'For','العقار والوحدة':'Property & Unit','المحاسب':'Accountant','المستلم':'Receiver','اعتماد الإدارة':'Management Approval',
    'تصدير Excel مخصص':'Custom Excel Export','تنزيل Excel حسب الاختيارات':'Download Filtered Excel','مسح الاختيارات':'Clear Selections','كل الملاك':'All owners','كل العقارات':'All properties','كل الوحدات':'All units','كل المستأجرين':'All tenants','من تاريخ':'From date','إلى تاريخ':'To date','نوع الحركة':'Transaction Type','حالة الاستحقاق':'Due Status',
    'بيانات الشركة على السندات':'Company Details on Vouchers','حفظ بيانات الشركة':'Save Company Details','بيانات التواصل في التذييل':'Footer Contact Details','صفحة كاملة قابلة للتمرير والتعديل':'Full editable page','لا توجد عقارات':'No properties found','لا توجد وحدات':'No units found','لا يوجد مستأجرون':'No tenants found','لا توجد عقود':'No leases found','لا توجد استحقاقات':'No dues found','لا توجد سندات قبض':'No receipt vouchers','لا توجد سندات صرف':'No payment vouchers','بدون وحدة محددة':'No specific unit','بدون ربط باستحقاق':'Not linked to a due'
  };
  const reverse=Object.fromEntries(Object.entries(pairs).map(([a,e])=>[e,a]));
  let lang=localStorage.getItem('alola_language')||'ar';
  const toggle=document.getElementById('languageToggle');
  function translateValue(value,to){
    const dict=to==='en'?pairs:reverse;
    let result=value;
    Object.keys(dict).sort((a,b)=>b.length-a.length).forEach(key=>{if(result.includes(key))result=result.split(key).join(dict[key])});
    if(to==='en'){
      const digits={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','٫':'.','٬':','};
      return result.replace(/[٠-٩٫٬]/g,d=>digits[d]).replace(/(\d+) من (\d+)/g,'$1 of $2').replace(/لا يوجد/g,'No ').replace(/سنوياً/g,'annually').replace(/ر\.س/g,'SAR');
    }
    let ar=result.replace(/(\d+) of (\d+)/g,'$1 من $2').replace(/annually/g,'سنوياً').replace(/SAR|ر[.٫]س/g,'__SAR__');
    if(ar.includes('__SAR__')){const digits={'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩','.':'٫',',':'٬'};ar=ar.replace(/[0-9.,]/g,d=>digits[d])}
    return ar.replace(/__SAR__/g,'ر.س');
  }
  function apply(){
    document.documentElement.lang=lang;document.documentElement.dir=lang==='en'?'ltr':'rtl';document.body.classList.toggle('lang-en',lang==='en');
    document.querySelectorAll('body *:not(script):not(style)').forEach(el=>{
      [...el.childNodes].filter(n=>n.nodeType===3&&n.nodeValue.trim()).forEach(n=>{const next=translateValue(n.nodeValue,lang);if(next!==n.nodeValue)n.nodeValue=next});
      if(el.placeholder){const next=translateValue(el.placeholder,lang);if(next!==el.placeholder)el.placeholder=next}
      if(el.title){const next=translateValue(el.title,lang);if(next!==el.title)el.title=next}
    });
    const title=document.querySelector('.brand .alola-diwani'),sub=document.querySelector('.brand small');
    if(title&&sub){title.textContent=lang==='en'?'ALOLA Property Management':'الأولى لإدارة الأملاك';sub.textContent=lang==='en'?'الأولى لإدارة الأملاك':'ALOLA Property Management'}
    if(toggle){toggle.textContent=lang==='en'?'العربية':'English';toggle.setAttribute('aria-label',lang==='en'?'التبديل إلى العربية':'Switch to English')}
    document.title=lang==='en'?'ALOLA Property Management | Property Management System':'الأولى لإدارة الأملاك | ALOLA Property Management';
  }
  if(toggle)toggle.onclick=()=>{lang=lang==='ar'?'en':'ar';localStorage.setItem('alola_language',lang);apply()};
  const baseShowI18n=show;show=function(page){baseShowI18n(page);setTimeout(apply,0)};
  const observer=new MutationObserver(()=>{clearTimeout(observer.timer);observer.timer=setTimeout(apply,10)});observer.observe(document.querySelector('.main'),{childList:true,subtree:true});
  apply();
})();

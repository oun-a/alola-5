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
  Object.assign(pairs,{'الرصيد الافتتاحي للفترة':'Period opening balance','الإيجارات المحصلة':'Rent collected','مصروفات التشغيل':'Operating expenses','أتعاب الإدارة':'Management fees','صافي حركة الفترة':'Net period activity','المحول للمالك':'Owner disbursements','الرصيد الختامي المستحق':'Closing amount payable','عكس الحركة':'Reverse entry','تقرير مالك':'Owner report','كشف مستأجر':'Tenant statement','تقرير المكتب':'Office report','قبض الشهر':'Period collections','صرف الشهر':'Period expenses','تسجيل تحويل للمالك':'Record owner disbursement','مدفوع جزئياً':'Partially paid','الإعدادات والحوكمة':'Settings and governance'});
Object.assign(pairs,{
  "إجمالي النقد الخارج": "Total cash out",
  "إجمالي النقد الداخل": "Total cash in",
  "إضافة دخل مكتب": "Add office income",
  "إضافة مصروف مكتب": "Add office expense",
  "+ دخل مكتب": "+ Office income",
  "+ مصروف مكتب": "+ Office expense",
  "+ استحقاق يدوي": "+ Manual instalment",
  "+ عقد جديد": "+ New lease",
  "+ عقد": "+ Lease",
  "PDF / طباعة": "Print / PDF",
  "أضف الوحدات التابعة للعقار": "Add units to this property",
  "استعادة نسخة": "Restore backup",
  "الإجراء": "Action",
  "التفصيل": "Details",
  "القسم": "Section",
  "الوقت": "Time",
  "البيان": "Description",
  "الإيجار": "Rent",
  "الإيجار الشهري": "Monthly rent",
  "الإيجار الشهري الافتراضي": "Default monthly rent",
  "الاستحقاق (اختياري)": "Instalment (optional)",
  "الحركة المالية": "Transactions",
  "الدورية": "Frequency",
  "الذمة الحالية": "Current amount payable",
  "الرصيد الافتتاحي": "Opening balance",
  "الرصيد الافتتاحي العام": "Overall opening balance",
  "الرصيد الحالي العام": "Current overall balance",
  "الرصيد الختامي": "Closing balance",
  "الرصيد السابق": "Previous balance",
  "الشهر": "Month",
  "الصرف": "Expenses",
  "العقار الحالي": "Current property",
  "العقد الحالي": "Current lease",
  "العقد هو الرابط بين المستأجر والوحدة ويحدد الاستحقاقات": "The lease links the tenant and unit and defines scheduled instalments.",
  "الفاتورة": "Invoice",
  "القبض": "Collections",
  "المؤجرة": "Occupied",
  "المبلغ المستلم": "Amount received",
  "المبلغ المصروف": "Amount paid",
  "المتبقي": "Outstanding balance",
  "المتبقي بعد التحويل": "Balance after disbursements",
  "المحول": "Disbursed",
  "المدة": "Term",
  "المدفوع": "Paid",
  "المستحق": "Amount due",
  "المستحق حالياً": "Current amount due",
  "المستحق حتى اليوم": "Due to date",
  "مستحق حتى اليوم": "Due to date",
  "الملف المالي والتعاقدي للمستأجر": "Tenant financial and lease profile",
  "النسخ الاحتياطي": "Backup",
  "الوحدات والتصنيفات الفرعية": "Units and categories",
  "الوحدة (اختياري)": "Unit (optional)",
  "الوضع الحالي:": "Current mode:",
  "تخزين محلي داخل المتصفح.": "Records are stored in this browser.",
  "امسح رمز QR لبيانات التواصل الرسمية": "Scan the QR code for office contact details",
  "بيانات المالك": "Owner details",
  "تاريخ الاستحقاق": "Due date",
  "تحويل للمالك": "Owner disbursement",
  "تسجيل دفعة": "Record payment",
  "تطبيق": "Apply",
  "تعديل الرصيد الافتتاحي": "Edit opening balance",
  "تعذر عرض QR": "QR code unavailable",
  "تقارير تفصيلية وليست مجرد إجماليات": "Detailed statements and transaction histories",
  "تنزيل نسخة احتياطية الآن": "Download backup",
  "توقيع المستلم": "Recipient signature",
  "توليد الاستحقاقات": "Generate instalments",
  "تُقبل الكسور العشرية حتى هللتين.": "Enter amounts with up to two decimal places.",
  "جاهزية الإنتاج": "Storage and access",
  "خروج الفترة": "Period cash out",
  "دخل الفترة": "Period cash in",
  "ذمة المكتب": "Office cash balance",
  "ذمة كل مالك بشكل مستقل + الذمة النقدية للمكتب": "Separate owner balances and office cash ledger",
  "ذمم الملاك": "Owner balances",
  "رصيد سابق": "Previous balance",
  "رقم/مرجع الوحدة": "Unit number / reference",
  "سجل التغييرات": "Activity log",
  "شهر الحركة": "Transaction month",
  "صافي مستحق قبل التحويل": "Net payable before disbursements",
  "صرف": "Expense",
  "قبض": "Collection",
  "طريقة التحويل": "Disbursement method",
  "فتح": "Open",
  "فتح العقد": "Open lease attachment",
  "فتح مرفق العقد": "Open lease attachment",
  "كشف": "Statement",
  "كل الحالات": "All statuses",
  "لا توجد حركة": "No transactions",
  "لا توجد عمليات مسجلة بعد": "No activity recorded yet",
  "لا يوجد مالك": "No owner selected",
  "لا يوجد مستأجر": "No tenant selected",
  "لديك تغييرات غير محفوظة": "You have unsaved changes",
  "ما هو مستحق، ما تم دفعه، وما تبقى لكل مستأجر": "Scheduled, paid, and outstanding amounts for each tenant",
  "ملاحظة/مرجع التحويل": "Disbursement note / reference",
  "ملف المالك ومحفظته": "Owner profile and portfolio",
  "نزّل نسخة كاملة من بيانات النظام واحفظها خارج المتصفح.": "Download a complete backup and keep it outside this browser.",
  "نسخ احتياطي، استعادة، وسجل تغييرات": "Backup, restore, and activity history",
  "وثيقة صادرة من الأولى لإدارة الأملاك": "Issued by ALOLA Property Management",
  "وثيقة مالية صادرة إلكترونياً من النظام": "Financial document issued electronically",
  "الواجهة والعمليات جاهزة، لكن الاستخدام متعدد الأجهزة والمستخدمين يحتاج قاعدة بيانات سحابية ومصادقة وتخزين ملفات سحابي.": "Multi-device and multi-user use requires a server database, authentication, and file storage.",
  "يمكنك ربط المستأجر بعقار ووحدة الآن، أو تركها فارغة وإضافة عقد لاحقاً.": "Link a property and unit now, or leave them empty and add a lease later.",
  "اختر «عمارة تجارية» للمبنى الذي يجمع شققاً سكنية ومحلات تجارية.": "Choose Mixed-use building for residential apartments and commercial shops.",
  "يمكن إضافة شقق ومحلات تجارية معاً تحت «عمارة تجارية» واحدة.": "Residential apartments and commercial shops can share one mixed-use building.",
  "إذا كان العقار عمارة سكنية أو عمارة تجارية أو مبنى تجارياً، أضف وحداته بعد الحفظ. ويمكن للعمارة التجارية أن تحتوي على وحدات من نوع «شقة» و«محل تجاري» معاً.": "Save the building, then add its individual units. Mixed-use buildings can contain both apartments and shops.",
  "إرفاق الفاتورة (PDF/JPG/PNG، حتى 1.5MB في نسخة المتصفح)": "Invoice attachment (PDF/JPG/PNG, up to 1.5 MB)",
  "مرفق العقد (PDF/JPG/PNG حتى 1.5MB)": "Lease attachment (PDF/JPG/PNG, up to 1.5 MB)",
  "حقل مطلوب": "Required field",
  "تم حفظ التغييرات بنجاح": "Changes saved",
  "إغلاق": "Close",
  "القائمة": "Menu",
  "فتح القائمة": "Open menu",
  "إجراء حذف — لن يتم بدون تأكيد": "Requires confirmation",
  "هل أنت متأكد من الحذف؟": "Delete this record?",
  "لديك تغييرات غير محفوظة. هل تريد مغادرة الصفحة؟": "You have unsaved changes. Leave this page?",
  "صيانة": "Maintenance",
  "كهرباء": "Electricity",
  "ماء": "Water",
  "نظافة": "Cleaning",
  "عمولة": "Commission",
  "رسوم حكومية": "Government fees",
  "تأمين": "Insurance",
  "أخرى": "Other",
  "شقة": "Apartment",
  "محل تجاري": "Commercial shop",
  "بوتيك": "Boutique",
  "مكتب": "Office",
  "بدروم": "Basement",
  "مستودع": "Warehouse",
  "فيلا": "Villa",
  "عمارة سكنية": "Residential building",
  "عمارة تجارية": "Mixed-use building",
  "مبنى تجاري": "Commercial building",
  "أرض": "Land",
  "سنوياً": "annually",
  "متبقي": "Outstanding",
  "دفعة إيجار": "Rent instalment",
  "قبض إيجار": "Rent collection",
  "صرف عقار": "Property expense",
  "تحويل مالك": "Owner disbursement",
  "دخل مكتب": "Office income",
  "مصروف مكتب": "Office expense",
  "دخل": "Income",
  "مصروف": "Expense",
  "معاينة ببيانات تجريبية فقط": "Preview with sample data only",
  "كشف المالك": "Owner statement",
  "سند القبض والطباعة": "Receipt and printing",
  "رصيد بداية الفترة + المحصل − المصروفات − الأتعاب − التحويلات = الرصيد الختامي.": "Opening balance + collections − expenses − fees − disbursements = closing balance.",
  "رقم السند": "Voucher number",
  "رقم العقد": "Lease reference",
  "حركة معكوسة": "Reversed entry",
  "سبب العكس": "Reversal reason",
  "اختر العقد": "Select lease",
  "الأتعاب": "Fees",
  "يرجى مراجعة الحقول المحددة.": "Please review the highlighted fields.",
  "تعذر الحفظ. تحقق من المساحة المتاحة واحتفظ بنسخة احتياطية.": "Could not save. Check available storage and keep a backup."
});

  Object.assign(pairs,{'تابع العقارات والتحصيل والتقارير من مكان واحد.':'Manage properties, collections, and reports in one place.','استحقاق':'Instalment','تصدير وخيارات متقدمة':'Export and advanced options','معكوسة':'Reversed','رمز QR لبيانات تواصل المكتب':'QR code for office contact details','شعار الأولى':'ALOLA logo','تعذر تحميل الشعار':'Logo unavailable','المحول خلال الفترة:':'Disbursed during the period:','عند فلترة عقار/وحدة، لا تُوزّع تحويلات المالك العامة على وحدة محددة.':'General owner disbursements are excluded when filtering by property or unit.','القبض − الصرف − التحويلات + الرصيد السابق':'Collections − expenses − disbursements + opening balance','السند غير موجود.':'Voucher not found.','قبض − صرف − تحويلات + رصيد سابق':'Collections − expenses − disbursements + opening balance','عمارة':'Building','وحدة':'unit','متأخرة':'Overdue','تقرير الذمة النقدية للمكتب':'Office cash statement','كشف ذمة':'Account statement','كشف المستأجر':'Tenant statement','الفترة':'Period'});
  const sourceText=new WeakMap(), sourceAttributes=new WeakMap();
  const reverse=Object.fromEntries(Object.entries(pairs).map(([ar,en])=>[en,ar]));
  let lang=localStorage.getItem('alola_language')==='en'?'en':'ar';
  const toggle=document.getElementById('languageToggle');
  const escapeRE=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const dictionaries={en:pairs,ar:reverse};
  const patterns=Object.fromEntries(Object.entries(dictionaries).map(([l,dict])=>[l,new RegExp(Object.keys(dict).sort((a,b)=>b.length-a.length).map(escapeRE).join('|'),'g')]));
  let protectedValues=[];
  function collectData(){
    const values=new Set();
    if(typeof db!=='undefined'){
      for(const table of ['owners','properties','units','tenants','leases','receipts','expenses','ownerTransfers','officeEntries']){
        for(const row of db[table]||[])for(const key of ['name','description','notes','contractNo','no','reference','payee','phone','email','iban','idNo','bank','floor']){
          if(typeof row[key]==='string'&&row[key].trim())values.add(row[key]);
        }
      }
      for(const key of ['companyCR','membershipNo','companyPhone','companyAddress','companyContact'])if(db.settings?.[key])values.add(String(db.settings[key]));
    }
    protectedValues=[...values].sort((a,b)=>b.length-a.length);
  }
  function translateValue(value,to=lang,protectData=true){
    if(!value)return value;
    // Protect record contents before matching interface strings. One pass avoids cascades.
    const protectedChunks=[];
    let result=String(value);
    for(const raw of protectData?protectedValues:[]){
      if(raw.length<2)continue;
      result=result.split(raw).join('\uE000'+(protectedChunks.push(raw)-1)+'\uE001');
    }
    result=result.replace(patterns[to],match=>dictionaries[to][match]);
    if(to==='en'){
      const digits={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','٫':'.','٬':','};
      result=result.replace(/[٠-٩٫٬]/g,d=>digits[d]).replace(/(\d+) من (\d+)/g,'$1 of $2').replace(/ر\.س/g,'SAR');
    }
    if(to==='ar'){
      const arDigits={'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩',',':'٬','.':'٫'};
      result=result.split(/(\uE000\d+\uE001)/g).map(chunk=>chunk.startsWith('\uE000')?chunk:/\bSAR\b/.test(chunk)?chunk.replace(/[-+]?\d[\d,.]*/g,n=>n.replace(/[0-9,.]/g,d=>arDigits[d])).replace(/\bSAR\b/g,'ر.س'):chunk).join('');
    }
    return result.replace(/\uE000(\d+)\uE001/g,(_,index)=>protectedChunks[Number(index)]);
  }
  function sourceValue(cache,key,value){
    const previous=cache.get(key);
    return previous&&previous.output===value?previous.original:value;
  }
  function apply(){
    collectData();
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='en'?'ltr':'rtl';
    document.body.classList.toggle('lang-en',lang==='en');
    // Capture option values before translating their labels.
    document.querySelectorAll('option').forEach(option=>{if(!option.hasAttribute('value'))option.setAttribute('value',option.value)});
    document.querySelectorAll('body *:not(script):not(style)').forEach(el=>{
      if(el.closest('[data-no-translate],script,style'))return;
      [...el.childNodes].filter(n=>n.nodeType===3&&n.nodeValue.trim()).forEach(n=>{
        const original=sourceValue(sourceText,n,n.nodeValue);
        const next=lang==='ar'&&/[\u0600-\u06ff]/.test(original)?original:translateValue(original,lang,!['LABEL','TH','BUTTON'].includes(el.tagName));
        sourceText.set(n,{original,output:next});if(n.nodeValue!==next)n.nodeValue=next;
      });
      let attrs=sourceAttributes.get(el);if(!attrs){attrs=new Map();sourceAttributes.set(el,attrs)}
      for(const attribute of ['placeholder','title','aria-label']){
        const value=el.getAttribute(attribute);if(!value)continue;
        const original=sourceValue(attrs,attribute,value);
        const next=lang==='ar'&&/[\u0600-\u06ff]/.test(original)?original:translateValue(original,lang,false);
        attrs.set(attribute,{original,output:next});if(value!==next)el.setAttribute(attribute,next);
      }
    });
    if(toggle){toggle.textContent=lang==='en'?'العربية':'English';toggle.setAttribute('aria-label',lang==='en'?'Switch to Arabic':'التبديل إلى الإنجليزية')}
    document.title=lang==='en'?'ALOLA Property Management | ERP':'الأولى لإدارة الأملاك | ALOLA ERP';
  }
  if(toggle)toggle.onclick=()=>{lang=lang==='ar'?'en':'ar';localStorage.setItem('alola_language',lang);apply()};
  const oldShow=show;show=function(page){oldShow(page);setTimeout(apply,0)};
  const observer=new MutationObserver(()=>{clearTimeout(observer.timer);observer.timer=setTimeout(apply,10)});
  observer.observe(document.querySelector('.main'),{childList:true,subtree:true});
  window.AlolaI18n={apply,translate:translateValue,language:()=>lang,setLanguage(value){lang=value==='en'?'en':'ar';localStorage.setItem('alola_language',lang);apply()}};
  for(const name of ['alert','confirm','prompt']){
    const native=window[name].bind(window);
    window[name]=function(message,...args){collectData();return native(translateValue(String(message)),...args)};
  }
  apply();
})();

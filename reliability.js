/* Preserve the existing visual system and browser data while hardening workflows. */
(function(){
 const M=AlolaModel, lang=()=>document.documentElement.lang==='en';
 const text=(ar,en)=>lang()?en:ar;
 const fail=(ar,en)=>{throw Error(text(ar,en))};
 const stamp=()=>new Date().toISOString();
 window.AlolaRestore=function(snapshot){
  const state=JSON.parse(snapshot);
  for(const key of Object.keys(db))if(!Object.hasOwn(state,key))delete db[key];
  for(const [key,value] of Object.entries(state)){
   if(Array.isArray(value)&&Array.isArray(db[key])){
    const existing=new Map(db[key].filter(row=>row&&row.id).map(row=>[row.id,row]));
    const rows=value.map(row=>{const old=row?.id?existing.get(row.id):null;if(!old)return row;for(const field of Object.keys(old))if(!Object.hasOwn(row,field))delete old[field];return Object.assign(old,row)});
    db[key].splice(0,db[key].length,...rows);
   }else if(value&&typeof value==='object'&&db[key]&&typeof db[key]==='object'&&!Array.isArray(value)){
    for(const field of Object.keys(db[key]))if(!Object.hasOwn(value,field))delete db[key][field];Object.assign(db[key],value);
   }else db[key]=value;
  }
 };
 today=function(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())};
 money=n=>new Intl.NumberFormat(lang()?'en-SA':'ar-SA',{style:'currency',currency:'SAR',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(n)||0);
 const oldSave=save;
 save=function(){const result=oldSave();return result};
 // Use integer halalas for totals without changing existing stored amounts.
 duePaid=id=>M.sum(db.receipts.filter(r=>r.dueId===id));
 ownerFigures=(id,month='',property='',unit='')=>M.statement(db,id,month,property,unit);
 ownerLiability=id=>ownerFigures(id).closing;
 const baseOffice=officeFigures;
 officeFigures=function(){const f=baseOffice();f.receiptCash=M.sum(db.receipts);f.propertyExpense=M.sum(db.expenses);f.ownerTransfers=M.sum(db.ownerTransfers);f.officeIncome=M.sum(db.officeEntries.filter(x=>x.type==='دخل'));f.officeExpense=M.sum(db.officeEntries.filter(x=>x.type==='مصروف'));f.closing=(M.cents(f.opening)+M.cents(f.receiptCash)-M.cents(f.propertyExpense)-M.cents(f.ownerTransfers)+M.cents(f.officeIncome)-M.cents(f.officeExpense))/100;return f};
 generateDues=function(id,silent=false){
  const lease=get('leases',id);if(!lease)return;
  const existing=db.dues.filter(d=>d.leaseId===id);
  // Never regenerate paid schedules, including calls made indirectly from tenant forms.
  if(existing.some(d=>db.receipts.some(r=>r.dueId===d.id))){
   if(!silent)alert(text('يوجد سجل مدفوعات؛ لا يمكن استبدال الجدول.','This schedule has payment history and cannot be replaced.'));return;
  }
  const step=frequencyMonths(lease.frequency),dates=M.dates(lease.startDate,lease.endDate,step);
  const amount=M.cents(Number(lease.annualRent??lease.monthlyRent??0)*step/12)/100;
  const schedule=dates.map(date=>({...existing.find(d=>d.dueDate===date),id:existing.find(d=>d.dueDate===date)?.id||uid('DUE'),leaseId:id,dueDate:date,amount,description:'دفعة إيجار '+lease.frequency}));
  db.dues=db.dues.filter(d=>d.leaseId!==id).concat(schedule);save();
  if(!silent){alert(text('تم تحديث جدول الاستحقاقات','Payment schedule updated'));renderLeases()}
 };
 function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return false;const d=new Date(value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===value}
 function validate(section,x){
  if(['receipts','expenses'].includes(section)||section==='liabilities'&&x.amount!=null){if(!validDate(x.date))fail('أدخل تاريخ حركة صالحاً.','Enter a valid transaction date.')}
  if(x.amount!=null){const scaled=Number(x.amount)*100;if(!Number.isSafeInteger(Math.round(scaled))||Math.abs(scaled-Math.round(scaled))>0.00001)fail('أدخل مبلغاً لا يتجاوز منزلتين عشريتين.','Enter an amount with no more than two decimal places.')}
  if(['leases','tenants'].includes(section)&&x.unitId&&(!validDate(x.startDate)||!validDate(x.endDate)))fail('أدخل تواريخ عقد صالحة.','Enter valid lease dates.');
  if(section==='dues'){
   if(!validDate(x.dueDate)||!get('leases',x.leaseId))fail('تحقق من العقد وتاريخ الاستحقاق.','Check the lease and instalment date.');
   const prior=get('dues',window.alolaEditing?.id);if(prior&&db.receipts.some(row=>row.dueId===prior.id))fail('لا يمكن تعديل استحقاق له سجل مدفوعات.','An instalment with payment history cannot be edited.');
  }
  if(x.amount!=null&&(!Number.isFinite(Number(x.amount))||M.cents(x.amount)<=0))fail('أدخل مبلغاً موجباً صالحاً.','Enter a valid positive amount.');
  if(x.startDate&&x.endDate&&x.endDate<x.startDate)fail('نهاية العقد تسبق بدايته.','Lease end must follow lease start.');
  if(['leases','tenants'].includes(section)&&x.unitId){
   if(!x.startDate||!x.endDate)fail('أدخل بداية ونهاية العقد.','Enter lease start and end dates.');
   if(!Number.isFinite(Number(x.annualRent))||Number(x.annualRent)<=0)fail('أدخل إيجاراً سنوياً موجباً.','Enter a positive annual rent.');
   const editing=section==='leases'?db.leases.find(l=>l.id===window.alolaEditing?.id):activeLeaseForTenant(window.alolaEditing?.id);
   const conflict=db.leases.some(l=>l.id!==editing?.id&&l.unitId===x.unitId&&l.status==='نشط'&&x.status!=='منتهي'&&l.startDate<=x.endDate&&l.endDate>=x.startDate);
   if(editing&&db.receipts.some(row=>row.leaseId===editing.id)){
    const frozen=['unitId','startDate','endDate','frequency','annualRent'];if(section==='leases')frozen.push('tenantId');
    if(frozen.some(key=>String(x[key]??'')!==String(editing[key]??'')))fail('العقد له سجل مدفوعات؛ لا يمكن تغيير شروطه المالية أو الوحدة.','This lease has payment history; its financial terms and unit cannot be changed.');
   }
   if(conflict)fail('الوحدة مرتبطة بعقد نشط في هذه الفترة.','The unit already has an active lease for these dates.');
  }
  if(section==='receipts'){
   const l=get('leases',x.leaseId),u=get('units',l?.unitId),p=get('properties',u?.propertyId);
   if(!l||!u||!p||l.tenantId!==x.tenantId)fail('تحقق من ارتباط المستأجر والعقد والوحدة.','Check the tenant, lease, and unit relationship.');
   if(x.dueId){
    const d=get('dues',x.dueId);
    if(!d||d.leaseId!==l.id)fail('الاستحقاق لا يتبع العقد المختار.','The instalment does not belong to this lease.');
    const prior=get('receipts',window.alolaEditing?.id);
    const paid=M.cents(duePaid(d.id))-(prior?.dueId===d.id?M.cents(prior.amount):0);
    if(paid+M.cents(x.amount)>M.cents(d.amount))fail('المبلغ يتجاوز المتبقي على الاستحقاق.','The amount exceeds the outstanding instalment.');
   }
  }
  if(section==='expenses'&&x.unitId&&get('units',x.unitId)?.propertyId!==x.propertyId)fail('الوحدة لا تتبع العقار.','The unit does not belong to this property.');
 }
 // Identify edited records without deriving identity from translated headings.
 for(const [name,table] of [['receiptForm','receipts'],['expenseForm','expenses'],['leaseForm','leases'],['tenantForm','tenants'],['dueForm','dues']]){
  const base=window[name];
  window[name]=function(id='',...args){
   const record=id?get(table,id):null;
   if(record&&(record.reversedBy||record.reversalOf)){alert(text('السجل المعكوس محفوظ ولا يمكن تعديله.','Reversed records are retained and cannot be edited.'));return}
   if(record&&['receipts','expenses'].includes(table)){alert(text('السند المالي محفوظ. اعكسه ثم سجّل سنداً مصححاً.','Posted vouchers are immutable. Reverse and create a corrected voucher.'));return}
   window.alolaEditing={table,id};return base(id,...args);
  };
 }
 const oldTransfer=ownerTransferForm;
 ownerTransferForm=function(owner,id=''){window.alolaEditing={table:'ownerTransfers',id};if(id){alert(text('اعكس التحويل ثم سجّل التصحيح.','Reverse the transfer before posting a correction.'));return}oldTransfer(owner,id)};
 const oldForm=formPage;
 formPage=function(section,title,body,submit,after){
  oldForm(section,title,body,async(x,form)=>{
   const snapshot=JSON.stringify(db);
   try{
    validate(section,x);
    await submit(x,form);
    const before=JSON.parse(snapshot);
    for(const table of ['receipts','expenses','ownerTransfers','officeEntries']){
     for(const row of db[table]){
      if(!before[table].some(r=>r.id===row.id)){row.createdAt=stamp();row.createdBy=db.settings.operatorName||'local operator'}
     }
    }
   }catch(e){window.AlolaRestore(snapshot);throw e}
  },()=>{
   if(section==='expenses'){const select=document.querySelector('[name=category]');if(select&&!Array.from(select.options).some(o=>o.value==='أتعاب الإدارة'))select.add(new Option('أتعاب الإدارة','أتعاب الإدارة'))}
   if(after)after();
  });
 };
 const oldDel=del;
 window.reverseEntry=function(table,id){
  const row=get(table,id);if(!row||row.reversalOf||row.reversedBy)return;
  const reason=prompt(text('سبب عكس الحركة (سيبقى السجل الأصلي):','Reason for reversing this entry (original retained):'));
  if(!reason?.trim())return;
  const before=JSON.stringify(db),reversal={...row,id:uid('REV'),no:nextNo('REV',db[table]),amount:-Number(row.amount),date:today(),description:text('عكس ','Reversal ')+row.no+': '+reason.trim(),reversalOf:id,createdAt:stamp(),createdBy:db.settings.operatorName||'local operator'};
  delete reversal.attachment;row.reversedBy=reversal.id;row.reversedAt=stamp();db[table].push(reversal);
  audit('عكس حركة',table,JSON.stringify({id,reverseId:reversal.id,reason:reason.trim(),actor:reversal.createdBy}));
  try{save()}catch(e){window.AlolaRestore(before);alert(e.message);return}
  render(currentPage());
 };
 del=function(table,id){if(['receipts','expenses','ownerTransfers','officeEntries'].includes(table))return reverseEntry(table,id);oldDel(table,id)};
 function tableHeaders(root){
  root.querySelectorAll('table').forEach(table=>{
   const row=table.rows[0];
   if(row&&Array.from(row.cells).every(c=>c.tagName==='TH')&&!table.tHead){const head=table.createTHead();head.append(row)}
   const headers=table.tHead?.rows[0];if(headers)Array.from(headers.cells).forEach((th,index)=>{if(Array.from(table.rows).some(r=>r!==headers&&r.cells[index]?.classList.contains('actions'))){th.dataset.printAction='true'}});
  });
 }
 let printing=null;
 function clearPrint(){
  if(!printing)return;
  printing.querySelectorAll('[data-print-added]').forEach(x=>x.remove());
  document.querySelectorAll('.printing').forEach(x=>x.classList.remove('printing'));
  document.body.classList.remove('print-voucher');printing=null;
 }
 async function preparePrint(id){
  clearPrint();const root=$(id);if(!root)return;
  tableHeaders(root);root.classList.add('printing');printing=root;
  document.body.classList.toggle('print-voucher',id==='document'&&!!root.querySelector('.voucher-doc'));
  if(id!=='document'){
   const h=document.createElement('div');h.className='print-heading';h.dataset.printAdded='1';
   h.textContent=text('الأولى لإدارة الأملاك — ','ALOLA Property Management — ')+((root.querySelector('h2')||root.querySelector('h1'))?.textContent||'')+' — '+today();root.prepend(h);
  }
  window.AlolaI18n?.apply();
  if(document.fonts?.ready)await document.fonts.ready;
  await Promise.all(Array.from(root.querySelectorAll('img')).map(async img=>{try{if(img.decode)await img.decode()}catch(e){const fallback=document.createElement('span');fallback.className='print-asset-error';fallback.dataset.printAdded='1';fallback.textContent=img.classList.contains('qr')?text('تعذر عرض QR','QR code unavailable'):text('تعذر تحميل الشعار','Logo unavailable');img.after(fallback)}}));
 }
 window.addEventListener('afterprint',clearPrint);
 window.addEventListener('beforeprint',()=>{if(!printing){const root=$(currentPage());if(root){tableHeaders(root);root.classList.add('printing');printing=root;document.body.classList.toggle('print-voucher',!!root.querySelector('.voucher-doc'))}}});
 printDocument=async()=>{await preparePrint('document');try{window.print()}catch(e){clearPrint();throw e}};
 printCurrentPage=async id=>{await preparePrint(id);try{window.print()}catch(e){clearPrint();throw e}};
 window.AlolaPrint={prepare:preparePrint,clear:clearPrint};
 const oldReport=renderOwnerReport;
 renderOwnerReport=function(id,month){
  oldReport(id,month);
  if(!get('owners',id))return;
  const f=ownerFigures(id,month,window.reportProperty||'',window.reportUnit||''),host=$('reportBody'),cards=host.querySelector('.cards');
  host.querySelector('.muted')?.setAttribute('data-statement-note','true');
  const entries=[['الرصيد الافتتاحي للفترة','Period opening balance',f.opening],['الإيجارات المحصلة','Rent collected',f.income],['مصروفات التشغيل','Operating expenses',f.operatingExpense],['أتعاب الإدارة','Management fees',f.fee],['صافي حركة الفترة','Net period activity',f.net],['المحول للمالك','Owner disbursements',f.transferred],['الرصيد الختامي المستحق','Closing amount payable',f.closing]];
  cards.innerHTML=entries.map(([ar,en,n])=>'<div>'+ar+'<div class="num">'+money(n)+'</div></div>').join('');
  const note=document.createElement('p');note.className='muted';note.textContent='رصيد بداية الفترة + المحصل − المصروفات − الأتعاب − التحويلات = الرصيد الختامي.';cards.after(note);
 };
 const baseRender=render;
 render=function(page){baseRender(page);setTimeout(()=>{
  const root=$(page);if(!root)return;tableHeaders(root);
  root.querySelectorAll('[onclick^="del("]').forEach(button=>{
   if(/del\('(receipts|expenses|ownerTransfers|officeEntries)'/.test(button.getAttribute('onclick')))button.textContent=text('عكس الحركة','Reverse entry');
  });
 },0)};
})();
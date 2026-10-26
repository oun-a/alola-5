/* Accessibility and task clarity; keep the existing navy and gold palette. */
(function(){
 const tr=(ar,en)=>document.documentElement.lang==='en'?en:ar;
 function enhance(){
  const page=document.querySelector('.page.active');if(!page)return;
  const exporter=page.querySelector('#customExportBuilder');
  if(exporter&&!exporter.closest('details')){const details=document.createElement('details');details.className='advanced-export screen-only';const summary=document.createElement('summary');summary.textContent='تصدير وخيارات متقدمة';exporter.before(details);details.append(summary,exporter);const title=exporter.querySelector('h3');if(title)title.hidden=true}
  page.querySelectorAll('input,select,textarea').forEach((control,index)=>{
   const label=control.parentElement?.querySelector('label');
   if(!control.id)control.id='field-'+page.id+'-'+index;
   if(label&&!label.htmlFor)label.htmlFor=control.id;
   if(control.type==='number'){control.inputMode='decimal';control.step='0.01'}
   if(['email','tel'].includes(control.type)||/iban|phone|email|idNo|contractNo|reference/i.test(control.name||''))control.dir='ltr';
   if(control.tagName==='TEXTAREA'||control.name==='name')control.dir='auto';
   const help=control.parentElement?.querySelector('.field-help,.annual-note,.small.muted');
   if(help){if(!help.id)help.id=control.id+'-help';control.setAttribute('aria-describedby',help.id)}
  });
  page.querySelectorAll('.table th').forEach(th=>th.scope='col');
  page.querySelectorAll('.table td').forEach(td=>td.dir='auto');
  page.querySelectorAll('button[onclick]').forEach(button=>{
   const command=button.getAttribute('onclick');
   if(/^(receiptForm|expenseForm)\('[^']+'\)/.test(command)){
    button.hidden=true; // Posted vouchers are corrected by reversal, not editing.
   }
   const financial=command?.match(/^del\('((?:receipts|expenses|ownerTransfers|officeEntries))','([^']+)'\)/);
   if(financial){const row=get(financial[1],financial[2]);if(row?.reversalOf||row?.reversedBy){button.disabled=true;button.textContent=tr('معكوسة','Reversed')}}
   if(financial&&!button.disabled){
    button.title=tr('عكس الحركة مع الاحتفاظ بالسجل الأصلي','Reverse this entry and retain its original record');
    button.setAttribute('aria-label',button.title);
   }
  });
 }
 let pending;
 const schedule=()=>{clearTimeout(pending);pending=setTimeout(enhance,30)};
 const observer=new MutationObserver(schedule);observer.observe(document.querySelector('.main'),{childList:true,subtree:true});
 enhance();
})();

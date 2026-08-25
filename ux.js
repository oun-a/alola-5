// ALOLA usability and responsive interaction layer.
(function(){
  const baseRender=render,baseSave=save;let toastTimer,saveTimer,formDirty=false;
  function toast(message){const el=$('uxToast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
  save=function(){baseSave();clearTimeout(saveTimer);saveTimer=setTimeout(()=>toast('تم حفظ التغييرات بنجاح'),120)};
  const emptyActions={owners:['+ إضافة مالك','ownerForm()'],properties:['+ إضافة عقار','propertyForm()'],units:['+ إضافة وحدة','unitForm()'],tenants:['+ إضافة مستأجر','tenantForm()'],leases:['+ إضافة عقد','leaseForm()'],dues:['+ إضافة استحقاق','dueForm()'],receipts:['+ إضافة سند قبض','receiptForm()'],expenses:['+ إضافة سند صرف','expenseForm()']};
  function enhance(){
    document.querySelectorAll('form label').forEach(label=>{const control=label.parentElement?.querySelector('input,select,textarea');if(control?.required&&!label.querySelector('.required'))label.insertAdjacentHTML('beforeend',' <span class="required" title="حقل مطلوب">*</span>')});
    document.querySelectorAll('.danger').forEach(button=>{button.title='إجراء حذف — لن يتم بدون تأكيد';button.setAttribute('aria-label',(button.textContent||'حذف')+' — إجراء يتطلب تأكيداً')});
    const page=currentPage(),action=emptyActions[page];if(action)document.querySelectorAll('#'+page+' .empty').forEach(el=>{if(!el.querySelector('.empty-action'))el.insertAdjacentHTML('beforeend',`<div><button class="btn gold empty-action" onclick="${action[1]}">${action[0]}</button></div>`)});
    document.querySelectorAll(`button[onclick^="leaseForm('',"]`).forEach(button=>{if(button.textContent.trim()==='+ عقد')button.textContent='+ إضافة عقد / وحدة مستأجرة'});
    const property=$('tenantProperty'),unit=$('tenantUnit');if(property&&unit){unit.disabled=!property.value;property.addEventListener('change',()=>{unit.disabled=!property.value});const start=document.querySelector('[name="startDate"]'),end=document.querySelector('[name="endDate"]');if(start&&end&&!end.value)start.addEventListener('change',()=>{if(!start.value)return;const d=new Date(start.value+'T00:00:00');d.setFullYear(d.getFullYear()+1);d.setDate(d.getDate()-1);end.value=d.toISOString().slice(0,10)})}
    const editor=$('editor');if(editor&&!editor.dataset.uxReady){editor.dataset.uxReady='1';editor.insertAdjacentHTML('beforeend','<div class="unsaved-note" id="unsavedNote">لديك تغييرات غير محفوظة</div>');editor.addEventListener('input',()=>{formDirty=true;$('unsavedNote')?.classList.add('show')});editor.addEventListener('submit',()=>{formDirty=false})}
  }
  render=function(page){baseRender(page);enhance()};
  const baseShow=show;show=function(page){if(formDirty&&!confirm('لديك تغييرات غير محفوظة. هل تريد مغادرة الصفحة؟'))return;formDirty=false;baseShow(page);enhance();document.querySelector('.side')?.classList.remove('open');$('menuToggle')?.setAttribute('aria-expanded','false')};
  const toggle=$('menuToggle');if(toggle)toggle.onclick=()=>{const side=document.querySelector('.side'),open=!side.classList.contains('open');side.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'✕ إغلاق':'☰ القائمة'};
  document.querySelectorAll('#nav button').forEach(button=>button.addEventListener('click',()=>{if(toggle)toggle.textContent='☰ القائمة'}));
  window.addEventListener('beforeunload',event=>{if(formDirty){event.preventDefault();event.returnValue=''}});enhance();
})();


(function(){
 const content=value=>'<span data-no-translate dir="auto">'+esc(value??'—')+'</span>';
 function voucher(table,id){
  const row=get(table,id);if(!row){alert(document.documentElement.lang==='en'?'Voucher not found.':'السند غير موجود.');return}
  const receipt=table==='receipts',lease=get('leases',row.leaseId),title=receipt?'سند قبض':'سند صرف';
  const reversal=row.reversalOf||row.reversedBy?'<p class="muted">حركة معكوسة — '+content(row.reversalOf||row.reversedBy)+'</p>':'';
  $('document').innerHTML='<div class="screen-actions actions"><button class="btn gold" onclick="printDocument()">طباعة / PDF</button><button class="btn light" onclick="show(\''+table+'\')">رجوع</button></div>'+
   '<div class="doc voucher-doc"><div class="voucher-header"><img class="logo" src="'+LOGO+'" alt="شعار الأولى"><div class="voucher-brand" data-no-translate><div class="arabic">الأولى لإدارة الأملاك</div><div class="english">ALOLA PROPERTY MANAGEMENT</div></div><div class="voucher-company-meta"><div>السجل التجاري: '+content(db.settings.companyCR)+'</div><div>رقم العضوية: '+content(db.settings.membershipNo)+'</div>'+content(db.settings.companyPhone||'')+'</div></div>'+
   '<div class="voucher-title"><h2>'+title+'</h2></div>'+reversal+
   '<div class="voucher-topline"><div>رقم السند<br>'+content(row.no)+'</div><div>التاريخ<br>'+content(row.date)+'</div><div>المبلغ<br><strong>'+money(row.amount)+'</strong></div></div>'+
   '<table class="voucher-grid"><tbody>'+
   '<tr><th>'+(receipt?'وصلنا من السيد':'المستفيد')+'</th><td>'+content(receipt?tenantName(row.tenantId):row.payee||ownerName(row.ownerId))+'</td></tr>'+
   '<tr><th>المالك</th><td>'+content(ownerName(row.ownerId))+'</td></tr>'+
   '<tr><th>وذلك عن</th><td>'+content(row.description||row.category||'—')+'</td></tr>'+
   '<tr><th>العقار والوحدة</th><td>'+content(propertyName(row.propertyId))+' — '+content(unitName(row.unitId))+'</td></tr>'+
   '<tr><th>طريقة الدفع</th><td>'+esc(row.method||'—')+' '+content(row.reference||'')+'</td></tr>'+
   '<tr><th>'+(receipt?'رقم العقد':'الفئة')+'</th><td>'+(receipt?content(lease?.contractNo):esc(row.category||'—'))+'</td></tr>'+
   '</tbody></table><div class="voucher-signatures"><div>المحاسب</div><div>'+(receipt?'المستلم':'المستفيد')+'</div><div>اعتماد الإدارة</div></div>'+
   '<div class="voucher-footer"><div><b data-no-translate>الأولى لإدارة الأملاك — ALOLA Property Management</b><br>'+content(db.settings.companyContact||'')+'</div></div></div>';
  show('document');window.AlolaI18n?.apply();
 }
 openReceipt=id=>voucher('receipts',id);openExpense=id=>voucher('expenses',id);
})();

/* Shared deterministic accounting and calendar rules, independent of the UI. */
(function(root){
 const cents=n=>Math.round((Number(n)||0)*100);
 const sum=(rows,field='amount')=>rows.reduce((n,r)=>n+cents(r[field]),0)/100;
 function dates(start,end,step){
  if(!Number.isInteger(step)||step<1)throw Error('Invalid payment frequency');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!/^\d{4}-\d{2}-\d{2}$/.test(end)||end<start)throw Error('Invalid lease dates');
  for(const value of [start,end]){const date=new Date(value+'T00:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value)throw Error('Invalid lease dates')}
  const [y,m,d]=start.split('-').map(Number),out=[];
  for(let k=0;k<1200;k++){
   const serial=y*12+m-1+k*step,year=Math.floor(serial/12),month=serial%12;
   const day=Math.min(d,new Date(Date.UTC(year,month+1,0)).getUTCDate());
   const value=year+'-'+String(month+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
   if(value>end)break;out.push(value);
  }
  return out;
 }
 function statement(data,ownerId,month='',propertyId='',unitId=''){
  const owner=data.owners.find(o=>o.id===ownerId)||{};
  const related=x=>x.ownerId===ownerId&&(!propertyId||x.propertyId===propertyId)&&(!unitId||x.unitId===unitId);
  const period=x=>!month||String(x.date).startsWith(month);
  const receipts=data.receipts.filter(x=>related(x)&&period(x));
  const expenses=data.expenses.filter(x=>related(x)&&period(x));
  const transfers=data.ownerTransfers.filter(x=>x.ownerId===ownerId&&period(x)&&!propertyId&&!unitId);
  const fees=expenses.filter(x=>x.category==='أتعاب الإدارة');
  const balanceRows=(table)=>data[table].filter(x=>related(x)&&month&&x.date<month+'-01');
  let opening=propertyId||unitId?0:Number(owner.openingLiability||0);
  if(month)opening+=sum(balanceRows('receipts'))-sum(balanceRows('expenses'))-sum(data.ownerTransfers.filter(x=>x.ownerId===ownerId&&x.date<month+'-01'&&!propertyId&&!unitId));
  const income=sum(receipts),expense=sum(expenses),transferred=sum(transfers),fee=sum(fees);
  const net=(cents(income)-cents(expense))/100;
  return {receipts,expenses,transfers,income,expense,transferred,opening,fee,operatingExpense:(cents(expense)-cents(fee))/100,net,closing:(cents(opening)+cents(net)-cents(transferred))/100};
 }
 const api={cents,sum,dates,statement};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AlolaModel=api;
})(typeof window==='undefined'?globalThis:window);

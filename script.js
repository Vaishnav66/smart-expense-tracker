let data = JSON.parse(localStorage.getItem("transactions")) || [];

function save(){
localStorage.setItem("transactions",JSON.stringify(data));
}

function addTransaction(){

const text=document.getElementById("text").value;
const amount=+document.getElementById("amount").value;
const date=document.getElementById("date").value;
const type=document.getElementById("type").value;
const category=document.getElementById("category").value;

if(!text || !amount) return alert("Enter details");

data.push({text,amount,date,type,category});

save();
render();
}

function deleteTx(i){
data.splice(i,1);
save();
render();
}

function render(){

const list=document.getElementById("list");
list.innerHTML="";

let income=0,expense=0;

data.forEach((t,i)=>{

if(t.type==="income") income+=t.amount;
else expense+=t.amount;

const li=document.createElement("li");
li.classList.add(t.type);

li.innerHTML=`
${t.text} (₹${t.amount}) - ${t.category}
<button onclick="deleteTx(${i})">❌</button>
`;

list.appendChild(li);
});

document.getElementById("income").innerText=income;
document.getElementById("expense").innerText=expense;
document.getElementById("balance").innerText=income-expense;

updateChart(income,expense);
}

let chart;

function updateChart(inc,exp){

const ctx=document.getElementById("chart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Income","Expense"],
datasets:[{
data:[inc,exp]
}]
}
});
}

render();

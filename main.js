//get the heading element 
const headingE1 = document.querySelector('#headingTotal');
//ref to input amount
const inputElement = document.querySelector('#inputAmount')
 //get the ref to table 
const expenseTableE1 = document.querySelector('#expenseTable')
//get the ref to desc element 
const inputDescE1 = document.querySelector('#inputDesc');
//inital val of expense at 0 
let totalExpense =0;
//set the heading element to total expense
headingE1.textContent = totalExpense;
// all expenses at one place 
let allExpenses = [];

// on button click add initial expense to total 
function addExpenseToTotal()

{
    const expenseItem = {};

   //read value from input 
   const textAmount = inputElement.value;
   
   //read the desc from inputDesc 
   const textDesc = inputDescE1.value;

   //convert it to no 
   const expense = parseInt(textAmount , 10 );
   
   //put it in object 
    if (textDesc !== ""  && !isNaN(expense) && expense >0 )
    {
   expenseItem.desc = textDesc;
   expenseItem.amount = expense ;
   expenseItem.moment = new Date();
   

   // add input to total expense 
   totalExpense = totalExpense + expense;

// console.log('Total Expense till now :- '+totalExpense)

  //set the heading element to total expense 
  //const someText = "the expense for this month is " + totalExpense;
  
  updateTotal();
  allExpenses.push(expenseItem);
  renderList(allExpenses);
  

  inputElement.value = "";
  inputDescE1.value = "";


    }
}
    //get the button element
const element = document.querySelector('#btnAddExpense');
element.addEventListener("click", addExpenseToTotal, false);
document.addEventListener("keypress",function(event)
{if (event.keyCode== 13  || event.which == 13){
   addExpenseToTotal();
}   
});
  
  

//controller function for date
function getDateString(moment){
 return   moment.toLocaleDateString('en-US',
 {year:'numeric'
 ,month:'long',
  day:'numeric'})
}
//fn to update total
function updateTotal(){
   let someText = `Total: ${totalExpense}`
   headingE1.textContent = someText;
}

//  delete controller function
function deleteItem(dateValue , amount)
{
   const newArray= [];
   
   for(let i=0;i<allExpenses.length ; i ++){
       if (allExpenses[i].moment.valueOf() !== dateValue){
           newArray.push(allExpenses[i]);
       }
   }
   renderList(newArray);
   totalExpense = totalExpense - amount ;
   updateTotal();
}


//  view layer
function renderList(arrofList){
   const allExpenseHTML = arrofList.map(expense => createListItem(expense));
   const joinedAllExpenseHTML = allExpenseHTML.join("");
   expenseTableE1.innerHTML = joinedAllExpenseHTML;
   allExpenses = arrofList;

   }
function createListItem({desc , amount , moment})  
      { 
       return `<li class="list-group-item d-flex justify-content-between">
                   <div class="d-flex flex-column">
                       ${desc}
                       <small class="text-muted"> ${getDateString(moment)}</small>
                   </div>
                   <div>
                       <span class="px-5">
                           ${amount}
                       </span>
                       <button 
                       type="button" 
                       class="btn btn-outline-danger btn-sm"
                       onclick = "deleteItem(${moment.valueOf()}, ${amount})">
                           <i class="fas fa-trash-alt"></i>
                       </button>
                   </div>
               </li>`

      }

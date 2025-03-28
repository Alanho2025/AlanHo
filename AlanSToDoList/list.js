
//variable declartion
let TodoElement = document.querySelector("#Todo");
let PriortizeElement = document.querySelector("#priortize");
let ETAElement = document.querySelector("#ETA");
let count = 1;
let button = document.querySelector("#button");
let SpanElement = document.querySelector("#count");
let TableElement = document.querySelector("#table-body");
let ItemElement = document.querySelector("#item");
let Item_Modify_Element = document.querySelector("#item_modify");

//modify time variable
let Item_Choose_Element = document.querySelector("#item_choose");
let Modify_Time_Element = document.querySelector("#modify_time");
let modify_time_button = document.querySelector("#modify_time_button");

let completeElement = document.querySelector("#complete");
let completeState = "Incomplete"
let Check_StateElement = document.querySelector("#Check_State");
let modifyElement = document.querySelector("#modify");
let modify_button_Element = document.querySelector("#modify_item");
let item_delete_Element = document.querySelector("#item_delete");
let delete_item_button_Element = document.querySelector("#delete_item");
let priority_Element = document.querySelector("#priority");
let Button_Excute_Element = document.querySelector("#Excute");

//item control variable
let item_control_new_Element =document.querySelector("#item_control_new");
let item_control_complete_Element =document.querySelector("#item_control_complete");
let item_control_modifyname_Element =document.querySelector("#item_control_modifyname");
let item_control_modifytime_Element =document.querySelector("#item_control_modifytime");
let item_control_prioriteze_Element =document.querySelector("#item_control_prioriteze");
let item_control_delete_Element =document.querySelector("#item_control_delete");

//Toolbox Control
/* item_control_new_Element.addEventListener("change", function () {
    if (this.value === "Hide") {
        document.querySelector("#NewItem").style.display = "none";
    } else {
        document.querySelector("#NewItem").style.display = "block";
    }
});
item_control_complete_Element.addEventListener("change", function () {
    if (this.value === "Hide") {
        document.querySelector("#CompleteItem").style.display = "none";
    } else {
        document.querySelector("#CompleteItem").style.display = "block";
    }
});
item_control_modifyname_Element.addEventListener("change", function () {
    if (this.value === "Hide") {
        document.querySelector("#ModifyItem").style.display = "none";
    } else {
        document.querySelector("#ModifyItem").style.display = "block";
    }
});
item_control_prioriteze_Element.addEventListener("change", function () {
    if (this.value === "Hide") {
        document.querySelector("#PriorityItem").style.display = "none";
    } else {
        document.querySelector("#PriorityItem").style.display = "block";
    }
});
item_control_delete_Element.addEventListener("change", function () {
    if (this.value === "Hide") {
        document.querySelector("#DeleteItem").style.display = "none";
    } else {
        document.querySelector("#DeleteItem").style.display = "block";
    }
}); */

function toggleDisplay(element, targetId) {
    document.querySelector(targetId).style.display = element.value === "Hide" ? "none" : "block";
}
item_control_new_Element.addEventListener("change", function () {
    toggleDisplay(this, "#NewItem");
});
item_control_complete_Element.addEventListener("change", function () {
    toggleDisplay(this, "#CompleteItem");
});
item_control_modifyname_Element.addEventListener("change", function () {
    toggleDisplay(this, "#ModifyItem");
});
item_control_modifytime_Element.addEventListener("change", function () {
    toggleDisplay(this, "#ModifyTime");
});

item_control_prioriteze_Element.addEventListener("change", function () {
    toggleDisplay(this, "#PriorityItem");
});

item_control_delete_Element.addEventListener("change", function () {
    toggleDisplay(this, "#DeleteItem");
});
//Button excute function
//Create new item
button.addEventListener("click", () => {
    SpanElement.innerHTML = count;
    const Priortize = parseInt(PriortizeElement.value);
    if (Priortize > 5 || Priortize < 1 || isNaN(Priortize)) {
        alert("Retype again!");
        TodoElement.value = " ";
        PriortizeElement.value = " ";
        return;
    } else {
        TableElement.innerHTML = TableElement.innerHTML + `<tr> <td>${count}</td> <td>${TodoElement.value}</td> <td>${Priortize}</td> <td>${ETAElement.value}</td><td>${completeState}</td>`;
        count++;
    }
    
    TodoElement.value = " ";
    PriortizeElement.value = " ";
    ETAElement.value = " ";
});

//Select item to change state - complete the task
Check_StateElement.addEventListener("click", () => {
    const itemNumber = parseInt(ItemElement.value);
    let row = TableElement.querySelector(`tr:nth-child(${itemNumber})`);

    if (row) {
        row.cells[4].innerText = completeElement.value;
    } else {
        alert("Item not found!");
    }
    ItemElement.value = "";
});

//Select item to change state - modify item_name
modify_button_Element.addEventListener("click", () => {
    const itemNumber = parseInt(Item_Modify_Element.value);

    // 找到對應的表格行
    let row = TableElement.querySelector(`tr:nth-child(${itemNumber})`);

    if (row) {
        row.cells[1].innerText = modifyElement.value;
    } else {
        alert("Item not found!"); // 如果輸入的 item 超出範圍，提醒用戶
    }
    Item_Modify_Element.value = "";
    modifyElement.value = "";
});

//Select item to change state - modify time
modify_time_button.addEventListener("click", () => {
    const itemNumber2 = parseInt(Item_Choose_Element.value);

    // 找到對應的表格行
    let row = TableElement.querySelector(`tr:nth-child(${itemNumber2})`);

    if (row) {
        row.cells[3].innerText = Modify_Time_Element.value;
    } else {
        alert("Item not found!"); // 如果輸入的 item 超出範圍，提醒用戶
    }
    Modify_Time_Element.value = "";
    Item_Choose_Element.value = "";
});

// Remove the rows
delete_item_button_Element.addEventListener("click", () => {
    const itemNumber3 = parseInt(item_delete_Element.value);
    let row = TableElement.querySelector(`tr:nth-child(${itemNumber3})`);

    if (row) {
        if (row.cells[4].innerText.toLowerCase() === "complete") {
            row.remove();
            let updatedRows = TableElement.querySelectorAll("tr");
            updatedRows.forEach((row, index) => {
                row.cells[0].innerText = index + 1;
                row.setAttribute("data-id", index + 1);
            });

            count = updatedRows.length + 1;
            SpanElement.innerHTML = count - 1;
        } else {
            alert("Complete item first!");
        }
    } else {
        alert("Item not found!");
    }
    item_delete_Element.value = "";
});

// Execute sorting
Button_Excute_Element.addEventListener("click", () => {
    let tbody = document.querySelector("#table-body");
    let rows = Array.from(tbody.getElementsByTagName("tr"));
    
    let sortOrder = priority_Element.value === "High Priority First" ? -1 : 1;
    rows.sort((a, b) => (parseInt(a.cells[2].innerText) - parseInt(b.cells[2].innerText)) * sortOrder);
    
    tbody.innerHTML = "";
    rows.forEach((row, index) => {
        row.cells[0].innerText = index + 1;
        row.setAttribute("data-id", index + 1);
        tbody.appendChild(row);
    });
    
    count = rows.length + 1;
    SpanElement.innerHTML = count - 1;
});




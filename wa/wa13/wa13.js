//problem 1
console.log("Problem 1:");
var employees = [{
    "firstName": "Sam",
    "department": "Tech",
    "designation": "Manager",
    "salary": 40000,
    "raiseEligible": "true"
  }, {
    "firstName": "Mary",
    "department": "Finance",
    "designation": "Trainee",
    "salary": 18500,
    "raiseEligible": "true"
  }, {
    "firstName": "Bill",
    "department": "HR",
    "designation": "Executive",
    "salary": 21200,
    "raiseEligible": "false"
  }];
for(var i in employees) {
    console.log(employees[i].firstName + "'s department: " + employees[i].department);
    console.log(employees[i].firstName + "'s designation: " + employees[i].designation);
    console.log(employees[i].firstName + "'s salary: " + employees[i].salary);
}
//problem 2
console.log("\nProblem 2:");
var company = [{
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees": employees
}];
for(i in employees) {
    console.log(company[0].employees[i].firstName + ": " + company[0].employees[i].department + " " + company[0].employees[i].designation);
}
//problem 3
console.log("\nProblem 3:");
const length = employees.length;
employees[length] = {
    "firstName": "Anna",
    "department": "Tech",
    "designation": "Executive",
    "salary": 25600,
    "raiseEligible": "false"
};
console.log(employees[length].firstName + " is the new employee.");
//problem 4
console.log("\nProblem 4:");
var totalSalary = 0;
for(i in employees){
    totalSalary += company[0].employees[i].salary;
}
console.log("Total Salary: " + totalSalary);
//problem 5
console.log("\nProblem 5:");
for(i in employees) {
    if(employees[i].raiseEligible == "true") {
        const oldSalary = employees[i].salary
        employees[i].salary = oldSalary * 1.1;
        console.log(employees[i].firstName + " got a raise from " + oldSalary + " to " + employees[i].salary);
    }
}
totalSalary = 0;
for(i in employees){
    totalSalary += company[0].employees[i].salary;
}
console.log("New Total Salary After Raises: " + totalSalary);
//Problem 6
console.log("\nProblem 6:");
for(i in employees) {
    if(employees[i].firstName == "Anna" || employees[i].firstName == "Sam") {
        employees[i].wfh = "true";
    } else {
        employees[i].wfh = "false";
    }
}
for(i in employees) {
    if(employees[i].wfh != "true") {
        console.log(employees[i].firstName + " will be working in the office");
    }
}
for(i in employees) {
    if(employees[i].wfh == "true") {
        console.log(employees[i].firstName + " will be working from home");
    }
}

//more practice on getting it to page
    document.getElementById("employees").innerHTML = "Employees: "
for(i in employees){
    if(i < employees.length - 1) {
        document.getElementById("employees").innerHTML += employees[i].firstName + ", ";
    } else {
        document.getElementById("employees").innerHTML += employees[i].firstName;
    }
}
var table = document.getElementById('employeeTable');
var raiseString = "";
var wfhString = "";
for(i in employees) {
    if(employees[i].raiseEligible == "true") {
        raiseString = "Yes";
    } else {
        raiseString = "No";
    }
    if(employees[i].wfh == "true") {
        wfhString = "Yes";
    } else if (employees[i].wfh == "false") {
        wfhString = "No";
    }
    
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + employees[i].firstName + '</td>' +
        '<td>' + employees[i].department + '</td>' +
        '<td>' + employees[i].designation + '</td>' +
        '<td>' + employees[i].salary + '</td>' +
        '<td>' + raiseString + '</td>' +
        '<td>' + wfhString + '</td>';
    table.appendChild(tr);
}
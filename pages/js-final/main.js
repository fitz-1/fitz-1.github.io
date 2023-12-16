function getLocalStorage() {
    const areaCode = localStorage.getItem("areaCode");
    const first3 = localStorage.getItem("first3");
    const last4 = localStorage.getItem("last4");
    console.log("processing return string");
    console.log(returnString);
    console.log(areaCode, first3, last4);
    var returnString =  "(" + areaCode + ") " + first3 + "-" + last4;
    console.log(returnString);
    var finalPhone = document.getElementById("finalPhone");
    var finalReturn = "Your Phone Number is: " + returnString;
    finalPhone.innerHTML = finalReturn;
}

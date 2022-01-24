"use strict";
var car;
var numRodes = 4;
function submitCar() {
    var errores = 0;
    var plateInput = document.getElementById("plateInput");
    var brandInput = document.getElementById("brandInput");
    var colorInput = document.getElementById("colorInput");
    //EX1. Validar los campos de matricula, marca y color, antes de hacer el new Car
    var div = document.createElement("div");
    var carForm = document.getElementById("create-car-form");
    if (plateInput.value === "" || brandInput.value === "" || colorInput.value === "") {
        div.innerHTML = "Els camps no poden estar vuits";
        div.style.color = "red";
        div.style.textAlign = "center";
        carForm.appendChild(div);
    }
    else {
        div.style.visibility = "hidden";
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        console.log(car);
        showVehicle();
        showWheelForm();
    }
}
function showVehicle() {
    var carTitle = document.getElementById("carTitle");
    var plateOutput = document.getElementById("plateOutput");
    var brandOutput = document.getElementById("brandOutput");
    var colorOutput = document.getElementById("colorOutput");
    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;
}
function submitWheelForm() {
    var errores = 0;
    //EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
    //EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas
    for (var i = 1; i <= numRodes; i++) {
        var brandWheel = document.getElementById("brandWheel" + i);
        var diameterWheel = document.getElementById("diameterWheel" + i);
        var diameter = (Number(diameterWheel.value));
        if (!validateDiameter(diameter)) {
            errores++;
        }
    }
    if (errores === 0) {
        for (var i = 1; i <= numRodes; i++) {
            var brand = document.getElementById("brandWheel" + i);
            var diameterW = document.getElementById("diameterWheel" + i);
            var wheel_generica = new Wheel(Number(diameterW.value), brand.value);
            car.addWheel(wheel_generica);
        }
        console.log(car);
        showWheels();
    }
    else {
        alert("Les rodes tenen que estar entre els números 1 i 2");
        deleteFields();
        errores = 0;
    }
}
function validateDiameter(diameter) {
    if (diameter >= 1 && diameter <= 2) {
        return true;
    }
    return false;
}
function deleteFields() {
    for (var i = 0; i < 4; i++) {
        var brandValue = document.getElementById("brandWheel".concat(i + 1));
        var diameterValue = document.getElementById("diameterWheel".concat(i + 1));
        brandValue.value = "";
        diameterValue.value = "";
    }
}
function showWheels() {
    var showDiv = document.getElementById("create-wheel-form");
    showDiv.style.display = "flow-root";
    //EX4. Optimizar la función showWheels
    var wheelTitle = document.getElementById("wheelTitle");
    wheelTitle.innerText = "Wheels:";
    for (var i = 0; i < car.wheels.length; i++) {
        var wheelOutput = document.getElementById("wheelOutput".concat(i + 1));
        wheelOutput.innerText = "Wheel ".concat(i + 1, ": ") + "Brand: " + car.wheels[i].brand + "  Diameter: " + car.wheels[i].diameter;
    }
}
function showWheelForm() {
    var carForm = document.getElementById("create-car-form");
    var carWheel = document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";
}

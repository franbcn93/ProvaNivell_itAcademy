let car: Car;
let arrayWheels:Array<number> = [];
let arrayBrands:Array<string> = [];


function submitCar() {
    let errores = 0;
    let plateInput = <HTMLInputElement>document.getElementById("plateInput");
    let brandInput = <HTMLInputElement>document.getElementById("brandInput");
    let colorInput = <HTMLInputElement>document.getElementById("colorInput");

	//EX1. Validar los campos de matricula, marca y color, antes de hacer el new Car
    let div = document.createElement("div");
    const carForm = <HTMLInputElement>document.getElementById("create-car-form");

    if(plateInput.value === "" || brandInput.value === "" || colorInput.value === ""){
        div.innerHTML = "Els camps no poden estar vuits"
        div.style.color = "red";
        div.style.textAlign = "center";
        
        carForm.appendChild(div);
    }else{
        div.style.visibility="hidden";
        car = new Car(plateInput.value, colorInput.value, brandInput.value);
        console.log(car);
        showWheelForm();
    }
   
}

function showVehicle() {
    let carTitle = <HTMLInputElement>document.getElementById("carTitle");
    let plateOutput = <HTMLInputElement>document.getElementById("plateOutput");
    let brandOutput = <HTMLInputElement>document.getElementById("brandOutput");
    let colorOutput = <HTMLInputElement>document.getElementById("colorOutput");

    carTitle.innerText = "Car:";
    plateOutput.innerText = "Plate: " + car.plate;
    brandOutput.innerText = "Brand: " + car.brand;
    colorOutput.innerText = "Color: " + car.color;

}

function submitWheelForm() {
    let errores = 0;
	//EX2. Solo hacer el "new Wheel" si las 4 ruedas son correctas
	//EX3. Una rueda correcta deberá tener un diámetro entre 1 y 2. Crear una función para validarlas

    const compareValue = (currentValue:number) => ((currentValue <= 2) && (currentValue >= 1));

	for (let i = 1; i <= 4; i++) {
        let brandWheel = <HTMLInputElement>document.getElementById("brandWheel" + i);
		let diameterWheel = <HTMLInputElement>document.getElementById("diameterWheel" + i);
        
        let diameter = (Number(diameterWheel.value));
        let brand = brandWheel.value;

        arrayWheels.push(diameter);
        arrayBrands.push(brand);
	}
    if(arrayWheels.every(compareValue)){
        validateWheel(arrayWheels, arrayBrands);

    }else{
        alert("Les rodes tenen que estar entre els números 1 i 2")
        deleteFields();          
    }   
}

function validateWheel(wheel:Array<number>, brand:Array<string>){ 
    for (const i of wheel) {
        let wheel_generica = new Wheel(wheel[i], brand[i]);
		car.addWheel(wheel_generica);        
    }
    console.log(car);
	showWheels();    
}

function deleteFields (){
    arrayBrands = [];
    arrayWheels = [];

    for (let i = 0; i < 4; i++){
        let brandValue = <HTMLInputElement>document.getElementById(`brandWheel${i+1}`);
        let diameterValue = <HTMLInputElement>document.getElementById(`diameterWheel${i+1}`);
        brandValue.value="";
        diameterValue.value="";
    } 
}

function showWheels() {

    const showDiv = <HTMLInputElement>document.getElementById("create-wheel-form");
    showDiv.style.display = "flow-root";

	//EX4. Optimizar la función showWheels
    let wheelTitle = <HTMLInputElement>document.getElementById("wheelTitle");
    wheelTitle.innerText = "Wheels:";
    
    for (let i = 0; i < arrayWheels.length; i++){
        let wheelOutput = <HTMLInputElement>document.getElementById(`wheelOutput${i+1}`);
        wheelOutput.innerText = `Wheel ${i+1}: `   + "Brand: " + car.wheels[i].brand + "  Diameter: " + car.wheels[i].diameter;
    }
}


function showWheelForm() {
    let carForm = <HTMLInputElement>document.getElementById("create-car-form");
    let carWheel = <HTMLInputElement>document.getElementById("create-wheel-form");
    carForm.style.display = "none";
    carWheel.style.display = "block";

}
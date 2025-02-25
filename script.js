// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyAotUWq1jE1Hhe7WbUlvIDxqUEPK8nsDQY",
    authDomain: "datos-de-formulario-82a9b.firebaseapp.com",
    projectId: "datos-de-formulario-82a9b",
    storageBucket: "datos-de-formulario-82a9b.appspot.com",
    messagingSenderId: "696950785850",
    appId: "1:696950785850:web:5e75c86e3e58af6d4df203",
    measurementId: "G-MGW06GE41C"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //patron de validacion basico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un mail valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; 
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'la contraseña debe tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message') 
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }
    
    //si todos los campos son validos enviar formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

        //Backend que reciba la informacion

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value,
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });

        
    }
})
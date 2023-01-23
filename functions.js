
//--------------------------------------------------------------INITIALIZE FIREBASE AND FIREBASE FEATURES---------------------------------------------------------------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, set, ref, child , get , update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup , onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs, onSnapshot, doc, setDoc, addDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyD1PYkwF7pLWhZ25f9bXysb3N3K3E_oQyY",
authDomain: "users-44276.firebaseapp.com",
projectId: "users-44276",
storageBucket: "users-44276.appspot.com",
messagingSenderId: "587941897485",
appId: "1:587941897485:web:5a5115a8ee1c7444107c44"
};
// Initialize Firebase (connect to firebase features)
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
//--------------------------------------------------------------INITIALIZE FIREBASE AND FIREBASE FEATURES---------------------------------------------------------------------//










//---------------------------------------------------------------SIGN UP SUBMIT BUTTON Start---------------------------------------------------------------------//
const Signup = document.getElementById("Signup");
Signup.addEventListener('click',(e) => {
e.preventDefault();
const email = document.getElementById('reg-email').value;
const password = document.getElementById('reg-pass').value;
const name = document.getElementById('reg-name').value;
var cpassword = document.getElementById('reg-cpass').value;
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   
var re2 = /^[^*|\":<>[\]{}`\\()';@&$]+$/;
var nameLength = name.length<4;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{9,}$/;
const auth = getAuth();



//-----------------------------------FORM VALIDATION ------------------------------------//
if(!re2.test(name) || nameLength){
    document.getElementById("reg-error").innerHTML ="name must contain no special characters and must be greather than 4";
} else if(!re.test(email)){
    document.getElementById("reg-error").innerHTML ="Please enter correct email address";
} else if(!passwordRegex.test(password)) {
    document.getElementById("reg-error").innerHTML = "Password must be at least 9 characters and contain at least one uppercase , number and special character";
} else if(password != cpassword){
    document.getElementById("reg-error").innerHTML ="Passwords do not match";
} else {
    
    // Signed in automatically.
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        updateProfile(userCredential.user, {
            displayName: name
        })
        const user = userCredential.user;
        return setDoc(doc(db , "users" , user.uid),{
            name: name,
            email: email,
        })
    })
    .then(() => {
        alert('User created! Please Check your Email.');
        sendEmailVerification(auth.currentUser)
    .then(() => {
  });
        window.location.href = "login.html"
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            document.getElementById("reg-error").innerHTML ='The email is already registered.';
        }
    });
};
});     



//---------------------------------------------------------------SIGN UP SUBMIT BUTTON end---------------------------------------------------------------------//








//---------------------------------------------------------------LOGIN BUTTON start---------------------------------------------------------------------//





  mainlogin.addEventListener('click', async (e) => {
    var email = document.getElementById('log-email').value;
    var password = document.getElementById('log-pass').value;
    var rememberMe = document.getElementById("logCheck").checked;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if(rememberMe){
            const lock = "11111111111111111111111111111111"
            const salt = CryptoJS.lib.WordArray.random(128/8).toString();
            const encryptionKey = CryptoJS.PBKDF2(lock, salt, { keySize: 256/8, iterations: 1000 }).toString();
            const iv = CryptoJS.lib.WordArray.random(128/8).toString();
            const encEmail = CryptoJS.AES.encrypt(email, encryptionKey, { iv: iv }).toString();
        
            // Store the email and password in localStorage
            localStorage.setItem("email", encEmail);
            localStorage.setItem("rememberMe", "checked");
            localStorage.setItem("salt", salt);
            localStorage.setItem("iv", iv);
        } else {
            // Remove the email and password from localStorage
            localStorage.removeItem("email");
            localStorage.removeItem("rememberMe");
        }
        //GET DATE,TIME AND LOCATION
        const user = userCredential.user;
        const currentDate = new Date().toDateString();
        const options = {hour: '2-digit', minute:'2-digit', second:'2-digit'};
        const time = new Date().toLocaleTimeString(undefined, options); //time
        var userLogsInfo = {
            date : currentDate,
            time : time
        };
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
        const API_KEY = '45be228952834fad854773f48f212919';
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`);
        const data = await response.json();
        const locationName = data.results[0].formatted;
        userLogsInfo.locationName = locationName; 
        await setDoc(doc(db, "users" , user.uid, "userLogins", time), userLogsInfo); //sends to database
        // Redirect the user to the dashboard page
        if (!user.emailVerified) {
            alert("Please verify your email before logging in.");
            firebase.auth().signOut();
            return;
        }
        document.getElementById("log-error").innerHTML='User logged in!';
        window.location.href= "./dashboard/dashboard.html";
    } 
    
    catch (error) { 
        const errorCode = error.code;
        if(errorCode === 'auth/invalid-email'){
            document.getElementById("log-error").innerHTML= "Invalid Email and Password";
        }
        else if(errorCode === 'auth/wrong-password'){
            document.getElementById("log-error").innerHTML= "Wrong Password";
        }
        else if (error.code === 'PositionError') {
            document.getElementById("log-error").innerHTML = 'Error: ' + error.message;
        }
    }
})

            

        














    
//-----------------GOOGLE LOGIN-----------------//
glogin.addEventListener('click',(e) =>{
signInWithPopup(auth, provider)
.then((result) => {
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
const user = result.user;

document.getElementById("log-error").innerHTML='User loged in!';
window.location.href= "dashboard/dashboard.html";
// ...
}).catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
const email = error.customData.email;

const credential = GoogleAuthProvider.credentialFromError(error);
});
});
//---------------------------------------------------------------LOGIN BUTTON end---------------------------------------------------------------------//

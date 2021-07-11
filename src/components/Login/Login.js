import { useContext, useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import eye4 from '../../images/eye.png'
import eye3 from '../../images/eye2.png'
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createContext } from 'react';


if (!firebase.apps.length) {
 firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function Login() {

  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    photo: '',
    success: ''
  })
  const updateName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then((res) => {
      console.log('Name updated successfully');
    }).catch((error) => {
       console.log(error.message);
    });  
  }
  const handleBlur = (e) =>{
    let isFormValid;
    if (e.target.name === 'name') {
      isFormValid = e.target.value.length > 2
    }
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      isFormValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(e.target.value)
    }
    if (isFormValid) {
      const userInfo = {...user}
      userInfo[e.target.name] = e.target.value
      setUser(userInfo) 
    }
  }
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) =>{
     if (newUser && user.email && user.password) {
       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userInfo = {...user}
        userInfo.success = "Creating user successfull"
        updateName(user.name)
        userInfo.isSignIn = true
        userInfo.error = ''
        setLoggedInUser(userInfo)
        history.replace(from);
        setUser(userInfo)
      })
      .catch((error) => {
        const userInfo = {...user}
        userInfo.error = error.message
        userInfo.success = ''
        setUser(userInfo)
      });
     }
     if (!newUser) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userInfo = {...user}
        userInfo.success = "Successfully sign in with form"
        userInfo.name = res.user.displayName
        userInfo.isSignIn = true
        userInfo.error = ''
        history.replace(from);
        setLoggedInUser(userInfo)
        setUser(userInfo)     
      })
      .catch((error) => {
        const userInfo = {...user}
        userInfo.success = ''
        userInfo.error = error.message
        setUser(userInfo)
      });
    }
    e.preventDefault()
    }
  const [showpwd, setShowpwd] = useState(false)
  // ------------------------google sign in ---------------------
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () =>{
    firebase.auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
        const {displayName, photoURL, email} = res.user
        history.replace(from);
        const userInfo ={
          name: displayName,
          photo: photoURL,
          email: email,
          success: "Successfully sign in with Google",  
          isSignIn: true,
          error: ''
        }
        setLoggedInUser(userInfo)
        history.replace(from);
        setUser(userInfo)
    }).catch((error) => {
        const userInfo ={
          success: '',
          error: error.message
        }
        setUser(userInfo)
    });
  }
  // ---------------------facebook sign in -----------------------
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleFacebookSignIn = () =>{
    firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then((res) => {
      const {displayName, photoURL, email} = res.user
      const userInfo ={
        name: displayName,
        photo: photoURL,
        email: email,
        success: "Successfully sign in with Facebook",
        isSignIn: true,
        error: ''
      }
      setLoggedInUser(userInfo)
        history.replace(from);
      setUser(userInfo)
    })
    .catch((error) => {
      const userInfo ={
        success: '',
        error: error.message
      }
      setUser(userInfo)
      });
  }
  // --------------------------sign in with github -----------------
  var githubProvider = new firebase.auth.GithubAuthProvider();
  const handleGithubSignIn = () =>{
    firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((res) => {
      const {displayName, photoURL, email} = res.user
      const userInfo ={
        name: displayName,
        photo: photoURL,
        email: email,
        success: "Successfully sign in with Github",
        isSignIn: true,
        error: ''
      }
        setLoggedInUser(userInfo)
        history.replace(from);
      setUser(userInfo)
    }).catch((error) => {
      const userInfo ={
        success: '',
        error: error.message
      }
      setUser(userInfo)
    });
  }


  const handleSignOut = () =>{
    firebase.auth().signOut().then((res) => {
      const signOutUser = {
        isSignIn: false,
        success: "Successfully sign out",
        error: ''
      }
      setLoggedInUser(signOutUser)
      history.replace(from);
      setUser(signOutUser)
    }).catch((error) => {
      const signOutUser = {
        success: '',
        isSignIn : true,
        error: error.message
      }
      setUser(signOutUser)
    });
  }

  return (
    <div className="App">
      {
        user.isSignIn && <button onClick={handleSignOut}>Sign Out</button>
      }
     <div className="sign">
        {
          newUser 
            ? 
            <div>
                 <h3 className="h31">LET'S SIGN UP TO THIS WEBSITE</h3>
                 <br/> <br/>
                 <form onSubmit={handleSubmit} >
                    <input required onBlur={handleBlur} type="text" name="name" placeholder="  Name"/> <br/> <br/>
                    <input required onBlur={handleBlur} type="email" name="email" placeholder="  Email " /> <br/> <br/>
                    <input required onBlur={handleBlur} id="password" 
                    type={showpwd ? "text" : "password"} name="password"
                     placeholder="  Enter Password"  /> <br/>
                     {
                      showpwd ? <p onClick={() => setShowpwd(!showpwd)}>Hide</p> 
                      : <p onClick={() => setShowpwd(!showpwd)}>Show</p>
                    }  <br/> <br/>
                    <input className="submit btn btn-success" type="submit" value={newUser ? "SIGN UP" : "LOG IN"}/><br/> <br/>
                 </form>
            </div> 
            :
            <div>
                 <h3 className="h31">LET'S LOG IN TO THIS WEBSITE</h3>
                 <br/><br/>
                 <form onSubmit={handleSubmit}>
                    <input required onBlur={handleBlur} type="email" name="email" placeholder="  Email " /> <br/> <br/>
                    <input required onBlur={handleBlur} id="password" 
                    type={showpwd ? "text" : "password"} name="password" 
                    placeholder="  Enter Password"  /> <br/>
                    {
                      showpwd ? <p onClick={() => setShowpwd(!showpwd)}>Hide</p> 
                      : <p onClick={() => setShowpwd(!showpwd)}>Show</p>
                    }
                     <br/> <br/>
                    <input className="submit btn btn-success" type="submit" value={newUser ? "SIGN UP" : "LOG IN"}/><br/> <br/>
                 </form>
            </div>
        }
        {
          newUser ? <p onClick={() => setNewUser(!newUser)} > Already have an account?</p> :
          <p onClick={() => setNewUser(!newUser)} > Do you want to register?</p>
        }
        <br/>
        </div>
        {
          user.isSignIn && 
           <div>
               <h2>Name: {user.name}</h2>
               <h2>Email: {user.email}</h2>
               <h2>Password: {user.password}</h2>
          </div>
        }
        <p style={{color: "red"}}>{user.error}</p>
        <p style={{color: "green"}}>{user.success}</p> <br/>
        <button className="btn" onClick={handleGoogleSignIn} className="btn">Sign in with Google</button><br/>   
        <button className="btn" onClick={handleFacebookSignIn} className="btn">Sign in with Facebook</button> <br/> 
        <button className="btn" onClick={handleGithubSignIn} className="btn">Sign in with Github</button>
     </div>
  );
}

export default Login;

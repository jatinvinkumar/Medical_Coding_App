import React, {useEffect, useState} from 'react';
// import GoogleButton from 'react-google-button';
import './Login.css'; // Import the CSS file for the Login component
import { UserAuth } from '../../../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
// import GithubButton from 'react-github-login-button';
import { GoogleLoginButton, MicrosoftLoginButton, GithubLoginButton } from 'react-social-login-buttons';

const Login = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [otherAuth, setOtherAuth] = useState(true)
  const {googleSignIn, user, githubSignIn, loginUser, microsoftSignIn} = UserAuth()

  const navigate = useNavigate()

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email == '') {
      alert('Please enter an email.')
      return
    }

    if (password == '') {
      alert("Please enter a password.")
      return
    }

    try {
      const resp = await loginUser(email, password)
      if (resp.user != null) {
        //we can navigate to the main page
        navigate('/')
      }
    } catch (e) {
      console.log(e)
      switch (e.code) {
        case "auth/invalid-password":
          alert("Password provided is not correct.")
          break
    
        case "auth/invalid-email":
          alert("Email provided is invalid.");
          break

        case "auth/weak-password":
          alert("Password should be at least 6 characters.") 
          break

        case "auth/user-not-found":
          alert("Invalid email and password.") 
          break

        
    
        // Many more authCode mapping here...
    
        default:
          alert("Something went wrong. Please try again!")
      }
    }
  }

  const googleSignInClicked = async () => {
    try {
      await googleSignIn()
    } catch (e) {
      console.log(e)
      switch (e.code) {
        case "auth/account-exists-with-different-credential":
          alert("An account already exists for that email.")
          break
  
        default:
          alert("Something went wrong. Please try again!")
      }
    }
  }

  const microsoftSignInClicked = async () => {
    try {
      await microsoftSignIn()
    } catch (e) {
      console.log(e)
      switch (e.code) {
        case "auth/account-exists-with-different-credential":
          alert("An account already exists for that email.")
          break
  
        default:
          alert("Something went wrong. Please try again!")
      }
    }
  }

  const githubSignInClicked = async () => {
    try {
      await githubSignIn()
    } catch (e) {
      console.log(e)
      switch (e.code) {
        case "auth/account-exists-with-different-credential":
          alert("An account already exists for that email.")
          break
  
        default:
          alert("Something went wrong. Please try again!")
      }
    }
  }

  useEffect(() => {

    if (user && user != 99) {
      console.log("HAS USER - so redirecting to main page: ")
      console.log(user)
      navigate('/')
    }

  }, [user])

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {otherAuth ?
        <div className="login-google" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <GoogleLoginButton style={{marginBottom: 5}} onClick={() => googleSignInClicked()}/>
          <MicrosoftLoginButton onClick={() => microsoftSignInClicked()} />
          <GithubLoginButton onClick={() => githubSignInClicked()}/>
          
          <div className="signup-login">
            <button onClick={() => setOtherAuth(false)} type="button" className="btn btn-link">Continue with Email →</button>
          </div>
        </div>
        :
        <div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            
          </form>
          <div className="signup-login">
            <button onClick={() => setOtherAuth(true)} type="button" className="btn btn-link">← Other Login Options</button>
          </div>
        </div>
        }
        <hr style={{width: "50%", textAlign: 'left', marginBottom: 0}}/>
          <div className="signup-login">
            Already have an account? <a href="/signup">Sign Up</a>
          </div>
        
        
      </div>
    </div>
  );
};

export default Login;

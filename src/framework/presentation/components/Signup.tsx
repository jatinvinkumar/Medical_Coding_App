import React, {useState, useEffect} from 'react';
import './Signup.css'; // Import the CSS file for the Signup component
import { UserAuth } from '../../../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
// import GoogleButton from 'react-google-button';
// import GithubButton from 'react-github-login-button';
import { GoogleLoginButton, MicrosoftLoginButton, GithubLoginButton } from 'react-social-login-buttons';

const Signup = () => {

  const [otherAuth, setOtherAuth] = useState(true)

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const {createUser, googleSignIn, githubSignIn, user, microsoftSignIn} = UserAuth()

  const googleSignUpClicked = async () => {
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

  const microsoftSignUpClicked = async () => {
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

  const githubSignUpClicked = async () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (firstName == '' || lastName == '') {
      alert('Please enter first and last name.')
      return
    }

    if (password != confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    try {
      const resp = await createUser(email, password)
      if (resp.user != null) {
        //we can navigate to the main page
        navigate('/')
      }
    } catch (e) {
      console.log(e)
      switch (e.code) {
        case "auth/invalid-password":
          alert("Password provided is not corrected.")
    
        case "auth/invalid-email":
          alert("Email provided is invalid.");

        case "auth/weak-password":
          alert("Password should be at least 6 characters.") 

        case "auth/account-exists-with-different-credential":
          alert("An account already exists for that email.")
          break
        case "auth/email-already-in-use":
          alert("An account already exists for that email.")
          break
    
        // Many more authCode mapping here...
    
        default:
          return "Something went wrong. Please try again!";
      }
    }

  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        {otherAuth ?
          <div className="login-google" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <GoogleLoginButton style={{marginBottom: 5}} onClick={() => googleSignUpClicked()}> 
              <span>Sign Up With Google</span>
            </GoogleLoginButton>
          <MicrosoftLoginButton onClick={() => microsoftSignUpClicked()} >
            <span>Sign Up With Microsoft</span>
          </MicrosoftLoginButton>
          <GithubLoginButton onClick={() => githubSignUpClicked()} >
            <span>Sign Up With Github</span>
          </GithubLoginButton>
            <div className="signup-login">
              <button onClick={() => setOtherAuth(false)} type="button" className="btn btn-link">Continue with Email →</button>
            </div>
          </div>
          :
          <div>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="firstName" placeholder="First Name" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="lastName" placeholder="Last Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
              <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <div className="signup-login">
              <button onClick={() => setOtherAuth(true)} type="button" className="btn btn-link">← Other Sign Up Options</button>
            </div>
            
          </div>
        }
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {/* <input style={{width: 20, marginRight: 20}} type="checkbox" id="terms" /> */}
          <label htmlFor="terms" style={{textAlign: 'center'}}>
            By joining, you agree to MedAI's <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a>.
          </label>
        </div>
        <hr style={{width: "50%", textAlign: 'left', marginBottom: 0}}/>

        <div className="signup-login">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

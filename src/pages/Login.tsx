// import React, { useState } from "react";
// import {
//   EuiButton,
//   EuiFieldPassword,
//   EuiFieldText,
//   EuiFlexGroup,
//   EuiFlexItem,
//   EuiImage,
//   EuiPanel,
//   EuiProvider,
//   EuiSpacer,
//   EuiText,
//   EuiTextColor,
// } from "@elastic/eui";
// import { EuiCallOut } from '@elastic/eui';
// import logo from "../assets/logo2.png";
// import animation from "../assets/animation.gif";
// import { useAppDispatch } from "../app/hooks";
// import { setUser } from "../app/slices/AuthSlice";
// import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
// import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import "./Login.css";
// import { fontWeight } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_typography";
// import { sendPasswordResetEmail } from 'firebase/auth';



// const Login = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [userName, setUserName] = useState(""); // Change from 'name' to 'userName'
//   const [isPasswordReset, setIsPasswordReset] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");


//   const [notification, setNotification] = useState({
//     show: false,
//     type: "success", // "success" or "error"
//     message: "",
//   });

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//     setError(""); // Clear error message when toggling the popup
//   };

//   const showNotification = (type: "success" | "error", message: string) => {
//     setNotification({ show: true, type, message });
//     setTimeout(() => {
//       setNotification({ show: false, type: "", message: "" });
//     }, 3000); // Hide notification after 3 seconds
//   };

//   const handleLogin = async () => {
//     try {
//       if (email && password) {
//         // Sign in with email/password
//         const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
//         const user = userCredential.user;
//         dispatch(setUser({ uid: user.uid, email: user.email!, name: user.displayName! }));
//         navigate("/");
//         showNotification("success", "Login successful!");
//       } else {
//         setError("Please enter email and password");
//       }
//     } catch (error: any) {
//       setError(error.message || "An unknown error occurred");
//       showNotification("error", "Login failed. Please check your credentials.");
//     }
//   };

//   const handleForgotPassword = async () => {
//     try {
//       if (resetEmail) {
//         // Send a password reset email
//         await sendPasswordResetEmail(firebaseAuth, resetEmail);
//         showNotification("success", "Password reset email sent. Check your inbox.");
//         setIsPasswordReset(false);
//         setResetEmail(""); // Clear the reset email after sending the link
//       } else {
//         setError("Please enter your email address.");
//       }
//     }  catch (error: any) {
//       setError(error.message || "An unknown error occurred");
//       showNotification("error", "Google sign-in failed. Please try again later.");
//     }
//   };
  

//   const handleSignup = async () => {
//     try {
//       if (email && password) {
//         // Create user with email/password
//         const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
//         const user = userCredential.user;

//         // Dispatch setUser action with user information including the email
//         dispatch(setUser({ uid: user.uid, email: user.email!, name: user.displayName! }));

//         // Extract email from the userCredential
//         const userEmail = userCredential.user.email;

//         // Store the user's information in Firebase Firestore
//         await addDoc(collection(firebaseDB, "users"), {
//           uid: user.uid,
//           name: userName || user.displayName || "", // Use provided name or fallback to display name
//           email: userEmail,
//         });

//         navigate("/");
//         showNotification("success", "Account created successfully!");
//       } else {
//         setError("Please enter email and password");
//       }
//     } catch (error: any) {
//       setError(error.message || "An unknown error occurred");
//       showNotification("error", "Signup failed. Please try again later.");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const {
//         user: { displayName, email, uid },
//       } = await signInWithPopup(firebaseAuth, provider);

//       if (email) {
//         const firestoreQuery = query(usersRef, where("uid", "==", uid));
//         const fetchedUser = await getDocs(firestoreQuery);
//         if (fetchedUser.docs.length === 0) {
//           await addDoc(collection(firebaseDB, "users"), {
//             uid,
//             name: displayName,
//             email,
//           });
//         }
//         dispatch(setUser({ uid, email: email!, name: displayName! }));
//         navigate("/");
//         showNotification("success", "Sign in with Google successful!");
//       }
//     } catch (error: any) {
//       setError(error.message || "An unknown error occurred");
//       showNotification("error", "Google sign-in failed. Please try again later.");
//     }
//   };

//   return (
//     <EuiProvider colorMode="dark">
//       <EuiFlexGroup
//         justifyContent="center"
//         alignItems="center"
//         style={{ width: "100vw", height: "100vh" }}
//       >
//         <EuiFlexItem grow={false}>
//           <EuiPanel paddingSize="xl">
//             <EuiFlexGroup justifyContent="center" alignItems="center">
//               <EuiFlexItem>
//                 <EuiImage src={animation} alt="logo" />
//               </EuiFlexItem>
//               <EuiFlexItem>
//                 <EuiImage src={logo} alt="logo" size="250px" />
//                 <EuiSpacer size="xs" />
//                 <EuiText textAlign="center" grow={false}>
//                   <h3>
//                     <EuiTextColor>Seamless Video Conferencing through </EuiTextColor>
//                     <EuiTextColor color="#ff851b"> NexTalk</EuiTextColor>
//                   </h3>
//                 </EuiText>
//                 <br />
//                 <EuiButton
//         fill
//         onClick={() => {
//           setIsLogin(true);
//           togglePopup();
//         }}
//         style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
//       >
//         <img
//           src="https://firebasestorage.googleapis.com/v0/b/portfolioimages-fdfbd.appspot.com/o/user_date_Favicon%2Fenvelope.png?alt=media&token=2a9f9a2a-273a-438c-81ea-4c0acf3a8423"  // Replace "url_to_email_logo" with the actual URL of your email logo
//           alt="Email Logo"
//           style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
//         />
//         Sign in with Email
//       </EuiButton>
//       <br />
//       <EuiButton
//         fill
//         onClick={() => {
//           setIsLogin(false);
//           togglePopup();
//         }}
//         style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
//       >
//         <img
//           src="https://firebasestorage.googleapis.com/v0/b/portfolioimages-fdfbd.appspot.com/o/user_date_Favicon%2Fuser_1177568.png?alt=media&token=2fb587bb-9e88-4e4f-85a1-33f458a8d1da"  // Replace "url_to_email_logo" with the actual URL of your email logo
//           alt="Email Logo"
//           style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
//         />
//         Create an Account
//       </EuiButton>
//       <br />
//       <EuiButton
//         fill
//         onClick={handleGoogleSignIn}
//         style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
//       >
//         <img
//           src="https://www.vectorlogo.zone/logos/google/google-tile.svg"  // Replace "url_to_google_logo" with the actual URL of your Google logo
//           alt="Google Logo"
//           style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
//         />
//         Sign in with Google
//       </EuiButton>
//               </EuiFlexItem>
//             </EuiFlexGroup>
//           </EuiPanel>
//         </EuiFlexItem>
//       </EuiFlexGroup>

//       {showPopup && (
//         <div className="popup">
//           <div className="popup-inner">
//             <div className="popup-header">
//               <h2>{isLogin ? "Login" : "Create an Account"}</h2>
//               <span className="close" onClick={togglePopup}>
//                 &times;
//               </span>
//             </div>
//             <div className="popup-content">
//               {!isLogin && (
//                 <>
//                   <EuiFieldText placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
//                   <br />
//                 </>
//               )}
//               <EuiFieldText placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <br />
//               <EuiFieldPassword placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               <EuiSpacer size="l" />
//               <EuiButton fill onClick={isLogin ? handleLogin : handleSignup} style={{ backgroundColor: "#ff851b", color: "#ffffff" }}>
//                 {isLogin ? "Login" : "Create an Account"}
//               </EuiButton>
//               <br />
//               <br />
//               <div>
//     {isLogin ? (
//       <div>
//         <a href="#" onClick={() => setIsPasswordReset(true)}>
//           Forgot Password?
//         </a>
//       </div>
//     ) : null}
//   </div>
//   <br />
//               <br />

//               {isPasswordReset ? (
//     <>
//       <EuiFieldText placeholder="Email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
//       <EuiSpacer size="l" />
//       <EuiButton fill onClick={handleForgotPassword} style={{ backgroundColor: "#ff851b", color: "#ffffff" }}>
//         Send Reset Link
//       </EuiButton>
//     </>
//   ) : null}
//               <div className="error-message">{error}</div>
//             </div>
//           </div>
//         </div>
//       )}
//     </EuiProvider>
//   );
// }

// export default Login;






import React, { useState } from "react";
import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiProvider,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { EuiCallOut } from '@elastic/eui';
import logo from "../assets/logo2.png";
import animation from "../assets/animation.gif";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { firebaseAuth, firebaseDB, usersRef } from "../utils/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { fontWeight } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_typography";
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth, OAuthProvider } from "firebase/auth";



const Login = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState(""); // Change from 'name' to 'userName'
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");


  const [notification, setNotification] = useState({
    show: false,
    type: "success", // "success" or "error"
    message: "",
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setError(""); // Clear error message when toggling the popup
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 3000); // Hide notification after 3 seconds
  };


  
    const handleMicrosoftSignIn = async () => {
      const provider = new OAuthProvider("microsoft.com");
      
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        navigate("/");
        // Handle the signed-in user
      } catch (error) {
        console.error("Microsoft sign-in failed", error);
        // Handle the error or show a notification to the user
      }
    };



  const handleLogin = async () => {
    try {
      if (email && password) {
        // Sign in with email/password
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;
        dispatch(setUser({ uid: user.uid, email: user.email!, name: user.displayName! }));
        navigate("/");
        showNotification("success", "Login successful!");
      } else {
        setError("Please enter email and password");
      }
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
      showNotification("error", "Login failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (resetEmail) {
        // Send a password reset email
        await sendPasswordResetEmail(firebaseAuth, resetEmail);
        showNotification("success", "Password reset email sent. Check your inbox.");
        setIsPasswordReset(false);
        setResetEmail(""); // Clear the reset email after sending the link
      } else {
        setError("Please enter your email address.");
      }
    }  catch (error: any) {
      setError(error.message || "An unknown error occurred");
      showNotification("error", "Google sign-in failed. Please try again later.");
    }
  };
  

  const handleSignup = async () => {
    try {
      if (email && password && userName) {
        // Create user with email/password
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;
  
        // Dispatch setUser action with user information including the email
        dispatch(setUser({ uid: user.uid, email: user.email!, name: userName }));
  
        // Extract email from the userCredential
        const userEmail = userCredential.user.email;
  
        // Store the user's information in Firebase Firestore
        await addDoc(collection(firebaseDB, "users"), {
          uid: user.uid,
          name: userName,
          email: userEmail,
        });
  
        navigate("/");
        showNotification("success", "Account created successfully!");
      } else {
        setError("Please enter name, email, and password");
      }
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
      showNotification("error", "Signup failed. Please try again later.");
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const {
        user: { displayName, email, uid },
      } = await signInWithPopup(firebaseAuth, provider);

      if (email) {
        const firestoreQuery = query(usersRef, where("uid", "==", uid));
        const fetchedUser = await getDocs(firestoreQuery);
        if (fetchedUser.docs.length === 0) {
          await addDoc(collection(firebaseDB, "users"), {
            uid,
            name: displayName,
            email,
          });
        }
        dispatch(setUser({ uid, email: email!, name: displayName! }));
        navigate("/");
        showNotification("success", "Sign in with Google successful!");
      }
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
      showNotification("error", "Google sign-in failed. Please try again later.");
    }
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
              <EuiFlexItem>
                <EuiImage src={animation} alt="logo" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo} alt="logo" size="250px" />
                <EuiSpacer size="xs" />
                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>Seamless Video Conferencing through </EuiTextColor>
                    <EuiTextColor color="#ff851b"> NexTalk</EuiTextColor>
                  </h3>
                </EuiText>
                <br />
                <EuiButton
        fill
        onClick={() => {
          setIsLogin(true);
          togglePopup();
        }}
        style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/portfolioimages-fdfbd.appspot.com/o/user_date_Favicon%2Fenvelope.png?alt=media&token=2a9f9a2a-273a-438c-81ea-4c0acf3a8423"  // Replace "url_to_email_logo" with the actual URL of your email logo
          alt="Email Logo"
          style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
        />
        Sign in with Email
      </EuiButton>
      <br />
      <EuiButton
        fill
        onClick={() => {
          setIsLogin(false);
          togglePopup();
        }}
        style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/portfolioimages-fdfbd.appspot.com/o/user_date_Favicon%2Fuser_1177568.png?alt=media&token=2fb587bb-9e88-4e4f-85a1-33f458a8d1da"  // Replace "url_to_email_logo" with the actual URL of your email logo
          alt="Email Logo"
          style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
        />
        Create an Account
      </EuiButton>
      <br />
      <EuiButton
        fill
        onClick={handleGoogleSignIn}
        style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
      >
        <img
          src="https://www.vectorlogo.zone/logos/google/google-tile.svg"  // Replace "url_to_google_logo" with the actual URL of your Google logo
          alt="Google Logo"
          style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
        />
        Sign in with Google
      </EuiButton>
      <br />
      <EuiButton
      fill
      onClick={handleMicrosoftSignIn}
      style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
    >
      <img
          src="https://img.icons8.com/color/48/microsoft.png"  
          alt="Microsoft Logo"
          style={{ marginRight: '8px', height: '22px' }}  // Adjust the height as needed
        />
      Sign in with Microsoft
    </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <div className="popup-header">
              <h2>{isLogin ? "Login" : "Create an Account"}</h2>
              <span className="close" onClick={togglePopup}>
                &times;
              </span>
            </div>
            <div className="popup-content">
  {!isLogin && (
    <>
      <EuiFieldText
        placeholder="Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        isInvalid={!userName}  // Add this line to mark the field as invalid when empty
      />
      <br />
    </>
  )}
  <EuiFieldText
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    isInvalid={!email}  // Add this line to mark the field as invalid when empty
  />
  <br />
  <EuiFieldPassword
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    isInvalid={!password}  // Add this line to mark the field as invalid when empty
  />
  <EuiSpacer size="l" />
  <EuiButton
    fill
    onClick={isLogin ? handleLogin : handleSignup}
    style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
  >
    {isLogin ? "Login" : "Create an Account"}
  </EuiButton>
  <br />
  <br />
  <div>
    {isLogin ? (
      <div>
        <a href="#" onClick={() => setIsPasswordReset(true)}>
          Forgot Password?
        </a>
      </div>
    ) : null}
  </div>
  <br />
  <br />
  {isPasswordReset ? (
    <>
      <EuiFieldText
        placeholder="Email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        isInvalid={!resetEmail}  // Add this line to mark the field as invalid when empty
      />
      <EuiSpacer size="l" />
      <EuiButton
        fill
        onClick={handleForgotPassword}
        style={{ backgroundColor: "#ff851b", color: "#ffffff" }}
      >
        Send Reset Link
      </EuiButton>
    </>
  ) : null}
  <div className="error-message">{error}</div>
</div>

          </div>
        </div>
      )}
    </EuiProvider>
  );
}

export default Login;




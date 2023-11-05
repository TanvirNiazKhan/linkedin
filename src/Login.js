import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useStateValue } from "./StateProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const auth = getAuth();

  const register = async () => {
    console.log(name, email, password, photo);

    if (!name) {
      return alert("Please enter a full name");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const users = userCredential.user;

      // Update user profile with displayName and photoURL

      await updateProfile(users, { displayName: name, photoURL: photo });

      // Get the updated user object

      const updatedUser = auth.currentUser;
      console.log(updatedUser.auth);
      // Dispatch an action to the Redux store to set the current user
      await dispatch({
        type: actionTypes.SET_USER,
        user: {
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
          photoURL: updatedUser.photoURL,
        },
      });
    } catch (error) {
      // Handle any errors that occur during the registration process

      console.error(error);
    }
  };

  const login = (e) => {
    e.preventDefault();
    console.log(name, photo, email, password);

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
        // User is logged in, and user data is dispatched to your state.
        // You can perform further actions, such as redirection.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage); // Display an error message to the user.
      });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png"
        alt=""
      />
      <form action="">
        <input
          type="text"
          placeholder="Full name (required if registering)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile pic URL (Optional)"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={login}>
          {" "}
          Sign In
        </button>
      </form>
      <p>
        Not a member?
        <span className="login_register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;

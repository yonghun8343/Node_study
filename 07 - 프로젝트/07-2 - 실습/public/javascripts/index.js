document.getElementById("signup-submit").addEventListener("click", (target) => {
  const validBox = document.getElementById("valid");
  console.log(target);
  const submitBox = document.getElementById("signup-submit");

  const email = document.getElementById("email");

  if (!!email.value) {
    validBox.style.display = "block";
    validBox.style.transition = "transform 1s linear";
    validBox.style.transform = "translateY(0px)";

    submitBox.style.transition = "transform 1s linear";
    submitBox.style.transform = "translateY(-235px)";
  }

  if (validBox.value.length === 6) {
    document.getElementById("sign_pw").style.visibility = "visible";
    submitBox.style.transform = "translateY(-175px)";
    setTimeout(() => {
      document.getElementById("sign_name").style.visibility = "visible";
      submitBox.style.transform = "translateY(-115px)";
    }, 900);
    setTimeout(() => {
      document.getElementById("sign_nick").style.visibility = "visible";
      submitBox.style.transform = "translateY(-25px)";
    }, 1800);
  }
});

document.getElementById("find-submit").addEventListener("click", (target) => {
  if (!!document.getElementById("find_email").value) {
    target.target.style.transition = "transform 1s linear";
    target.target.style.transform = "translateY(0px)";
  }
});

document.getElementsByClassName("sign_box")[0].addEventListener("click", () => {
  const loginBox = document.getElementsByClassName("login-box")[0];
  const singup = document.getElementsByClassName("signup_box")[0];

  loginBox.style.transition = "all 1s linear";
  loginBox.style.transform = "scale(0.5)";
  loginBox.style.opacity = 0;
  setTimeout(() => {
    loginBox.style.display = "none";
  }, 1000);

  setTimeout(() => {
    singup.style.display = "block";
    singup.style.opacity = 0;
    singup.style.transform = "scale(0.5)";
  }, 1100);
  setTimeout(() => {
    singup.style.opacity = 1;
    singup.style.transition = "all 1s linear";
    singup.style.transform = "scale(1)";
  }, 1200);
});

document.getElementById("find-arrow").addEventListener("click", () => {
  const loginBox = document.getElementsByClassName("login-box")[0];
  const find = document.getElementsByClassName("find_box")[0];

  loginBox.style.transition = "all 1s linear";
  loginBox.style.transform = "scale(0.5)";
  loginBox.style.opacity = 0;
  setTimeout(() => {
    loginBox.style.display = "none";
  }, 1000);

  setTimeout(() => {
    find.style.display = "block";
    find.style.opacity = 0;
    find.style.transform = "scale(0.5)";
  }, 1100);
  setTimeout(() => {
    find.style.opacity = 1;
    find.style.transition = "all 1s linear";
    find.style.transform = "scale(1)";
  }, 1200);
});

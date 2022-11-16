document
  .getElementsByClassName("submit_btn")[0]
  .addEventListener("click", () => {
    const validBox = document.getElementById("pwd_valid");
    const submitBox = document.getElementsByClassName("submit_btn")[0];

    validBox.style.display = "block";
    validBox.style.transition = "transform 1s ease-in-out";
    validBox.style.transform = "translateY(0px)";

    submitBox.style.transition = "transform 1s ease-in-out";
    submitBox.style.transform = "translateY(0px)";
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

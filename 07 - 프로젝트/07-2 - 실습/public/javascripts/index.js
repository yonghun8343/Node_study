document.getElementById("submit_btn").addEventListener("click", () => {
  const validBox = document.getElementById("pwd_valid");
  const submitBox = document.getElementById("submit_btn");

  validBox.style.display = "block";
  validBox.style.transition = "transform 1s ease-in-out";
  validBox.style.transform = "translateY(0px)";

  submitBox.style.transition = "transform 1s ease-in-out";
  submitBox.style.transform = "translateY(0px)";
});

document.getElementById("sign_in").addEventListener("click", () => {
  const loginBox = document.getElementById("login_box");
  const singup = document.getElementById("signup_box");

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

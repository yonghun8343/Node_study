const nodemailer = require("nodemailer");

// callback을 변수의 마지막에 넣어 해당 결과값을 callback으로 반환한다고 선언 해 줍니다.
function sendMail(email, digit, callback) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "이메일을 인증 해 주세요.",
    text: `당신의 인증번호는 ${digit}입니다.`,
  };

  // sendMail의 callback옵션은 아래의 링크에서 참고 해 주세요.
  // https://nodemailer.com/usage/#sending-mail
  transporter.sendMail(mailOptions, (err, info) => {
    callback(err, info);
  });
}

// 해당 프로젝트 코드에는 해당 주석을 삭제 하였으나 여기에는 남겨 두겠습니다.
// async function sendMail(email, digit) {
//   console.log(email);
//   console.log(digit);
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     post: 465,
//     secure: true,
//     auth: {
//       user: process.env.MAIL_ID,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.MAIL_ID,
//     to: email,
//     subject: "이메일 인증을 해 주세요.",
//     text: `당신의 인증 번호는 ${digit}입니다.`,
//   };

//   await transporter.sendMail(mailOptions);
// }

function randomNumber() {
  return Math.floor(Math.random() * (999999 - 100000) + 100000);
}

module.exports = { sendMail, randomNumber };

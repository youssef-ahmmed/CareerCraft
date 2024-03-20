import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, link: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_MAIL,
      to: email,
      subject: "Reset Password",
      html:
        `
         <div>
          <h4>Please Click on the link below to reset your password</h4>
          <p>${link}</p>
         </div>
        `
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    throw new Error('Error sending email');
  }
};

const { MailerSend, Sender, Recipient, EmailParams } = require("mailersend");
require("dotenv").config();

const mailerSend = new MailerSend({
  apiKey:
    "mlsn.17f8840c96afac4f0ca88fe3bea896545cba453b54a3eeaf85fba5f38d104d86",
});

async function sendEmailNotification(userInfo) {
  try {
    const sentFrom = new Sender(
      `mlsn.MS_wAMZMo@trial-3z0vklojq5pg7qrx.mlsender.net`,
      "Diras"
    );

    const recipients = [new Recipient("sadra82.sadeghi@gmail.com", "New User")];
    const emailContent = `
      <p dir="rtl">یک درخواست جدید ثبت شد:</p>
      <ul dir="rtl">
        <li>نام و نام خانوادگی: ${userInfo.nameAndLastName}</li>
        <li>شماره تلفن: ${userInfo.phoneNumber}</li>
        <li>ایمیل: ${userInfo.email}</li>
        <li>آدرس: ${userInfo.address}</li>
        <li>توضیحات: ${userInfo.description}</li>
        <li>تاریخ قرار ملاقات: ${userInfo.appointmentDate}</li>
        <li>نوع خدمات: ${userInfo.appointmentType}</li>
      </ul>
    `;

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Request Registation")
      .setHtml(emailContent);

    const response = await mailerSend.email.send(emailParams);

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmailNotification };

export const createWelcomeEmailTemplate = (name, clientURL) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Chatify</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #6366f1, #8b5cf6); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Chatify! 🚀</h1>
  </div>
  <div style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
    <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
    <p style="font-size: 16px;">We're excited to have you on board! Start chatting and connecting with your friends right away.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${clientURL}" style="background-color: #6366f1; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Get Started</a>
    </div>
    <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">If the button above doesn't work, copy and paste this link into your browser:<br><a href="${clientURL}" style="color: #6366f1;">${clientURL}</a></p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">Best regards,<br>The Chatify Team</p>
  </div>
</body>
</html>
  `;
};

export const createNewUserAdminEmailTemplate = (fullName, email) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New User Registration</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 25px; text-align: center; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New User Signed Up!</h1>
  </div>
  <div style="background-color: #f9fafb; padding: 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
    <p style="font-size: 16px;">Hello Admin,</p>
    <p style="font-size: 16px;">A new user has just registered on your <strong>Chatify</strong> app.</p>
    
    <div style="background: white; border-radius: 8px; padding: 15px; border: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${fullName}</p>
      <p style="margin: 5px 0;"><strong>📧 Email:</strong> ${email}</p>
      <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${new Date().toLocaleString()}</p>
    </div>

    <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 20px;">Chatify Admin Notification</p>
  </div>
</body>
</html>
  `;
};

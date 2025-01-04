const PasswordResetEmail = ({ userName, resetLink }) => {
  return `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        style="
          width: 100%;
          background-color: #f4f4f4;
          border-radius: 8px;
          padding: 20px;
        "
      >
        <tr>
          <td style="text-align: center; padding-bottom: 20px;">
            <h1 style="color: #333;">Password Reset Request</h1>
          </td>
        </tr>
        <tr>
          <td style="font-size: 16px; color: #555;">
            <p>
              Hi <strong>${userName}</strong>,
            </p>
            <p>
              We received a request to reset your password. If you made this request, you can
              reset your password using the link below. If you did not make this request, you can
              ignore this email.
            </p>
            <p>
              <a
                href="${resetLink}"
                style="
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                "
              >
                Reset Password
              </a>
            </p>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Best Regards,</p>
            <p>Your Company Name</p>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export default PasswordResetEmail;

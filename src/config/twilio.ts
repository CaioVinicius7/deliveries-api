export const twilio = {
  account_sid: process.env.TWILIO_ACCOUNT_SID as string,
  auth_token: process.env.TWILIO_AUTH_TOKEN as string,
  phone: process.env.TWILIO_PHONE as string
};

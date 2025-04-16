export interface BotConfig {
  clientId: string;
  menuOptions: {
    [key: string]: string;
  };
  welcomeMessage: string;
  twilioConfig: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
  };
} 
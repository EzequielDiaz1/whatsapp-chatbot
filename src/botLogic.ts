import { BotConfig } from './types/config';

export class WhatsAppBot {
  private config: BotConfig;

  constructor(config: BotConfig) {
    this.config = config;
  }

  public getReply(message: string): string {
    const cleanMessage = message.trim();

    if (cleanMessage in this.config.menuOptions) {
      return this.config.menuOptions[cleanMessage];
    }

    return this.config.welcomeMessage;
  }

  public getTwilioConfig() {
    return this.config.twilioConfig;
  }
}

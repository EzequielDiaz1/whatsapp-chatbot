import { menuOptions, welcomeMessage } from './config';

export function getBotReply(message: string): string {
  const cleanMessage = message.trim();

  if (cleanMessage in menuOptions) {
    return menuOptions[cleanMessage as keyof typeof menuOptions];
  }

  return welcomeMessage;
}

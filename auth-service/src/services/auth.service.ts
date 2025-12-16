export class AuthService {
  static async generateApiKey(globalUserId: string) {
    // Logic to generate and save API key
    const apiKey = `apikey_${globalUserId}_${Date.now()}`;
    // Save to DB or something
    // For now, mock
    return { apiKey };
  }
}

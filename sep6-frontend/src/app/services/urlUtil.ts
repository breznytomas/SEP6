export class UrlUtil {
  private readonly _baseUrl =
    'https://sep6-movies-backend.azurewebsites.net/api';

  public get baseUrl(): string {
    return this._baseUrl;
  }
}

//https://www.iana.org/assignments/jwt/jwt.xhtml
export class Claim {
  public id:string;
  public iss: string;
  public sub: string;
  public aud: string;
  public exp: number;
  public nbf: number;
  public iat: number;
  public jti: string;
  public name: string;
  public avatar: string;
  public roles: string[];
  public permissions: string[];
}
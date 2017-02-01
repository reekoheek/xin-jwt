class Token {
  constructor (token) {
    const [header, payload] = token.split('.');

    this.raw = token;
    this.header = JSON.parse(window.atob(header));
    this.payload = JSON.parse(window.atob(payload));
  }
}

export default Token;

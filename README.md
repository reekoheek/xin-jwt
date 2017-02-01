# xin-jwt

JSON Web Token middleware for Xin

## Usage

We can use xin-jwt middleware as component inside template scope of App component instance directly

```html
<xin-app>
  <template>
    <jwt-middleware whitelist='["/login", "/test"]' (signout)='navigate("/login")'></jwt-middleware>
  </template>
</xin-app>
```

Or programmatically

```javascript
import App from 'xin/components/app';
import JwtMiddleware from 'xin-jwt/jwt-middleware';

class TheApp extends App {
  created () {
    super.created();

    this.use((new JwtMiddleware()).callback());
  }
}

xin.define('the-app', TheApp)
```

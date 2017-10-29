# xin-jwt

JSON Web Token middleware for Xin

## Usage

We can use xin-jwt middleware as component inside template scope of App component instance directly

```html
<xin-app>
  <template>
    <xin-jwt whitelist='["/login", "/test"]' (signout)='navigate("/login")'></xin-jwt>
  </template>
</xin-app>
```

Or programmatically

```javascript
import { App } from 'xin/components';
import JwtMiddleware from 'xin-jwt';

class TheApp extends App {
  created () {
    super.created();

    this.use((new JwtMiddleware()).callback());
  }
}

define('the-app', TheApp)
```

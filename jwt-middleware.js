import xin from 'xin';
import Middleware from 'xin/components/middleware';
import Token from './lib/token';

class JwtMiddleware extends Middleware {
  get props () {
    return Object.assign({}, super.props, {
      whitelist: {
        type: Array,
        value: () => [ '/login', '/signin' ],
      },

      token: {
        type: String,
        notify: true,
        readonly: true,
        value: '',
      },

      tokenKey: {
        type: String,
        value: 'jwt-token',
      },

      signinUrl: {
        type: String,
        value: '/auth/signin',
      },
    });
  }

  isWhitelisted ({ uri }) {
    return this.whitelist.indexOf(uri) > -1;
  }

  getAuth (ctx) {
    if (!this.token) {
      throw new Error('Missing auth token');
    }

    try {
      return new Token(this.token);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  ready () {
    super.ready();

    this.set('token', window.localStorage[this.tokenKey]);
  }

  callback () {
    return async (ctx, next) => {
      if (this.isWhitelisted(ctx)) {
        return await next();
      }

      try {
        this.getAuth(ctx);
      } catch (err) {
        console.log('err', err);
        ctx.app.navigate('/login');
        return;
      }

      return await next();
    };
  }

  async signin ({ username, password }) {
    const res = await window.fetch(this.signinUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.status >= 300) {
      let message;
      try {
        const json = await res.json();
        message = json.message;
      } catch (err) {
        message = `${res.status} Signin error`;
      }

      throw new Error(message);
    }

    const { token } = await res.json();

    this.set('token', token);
    window.localStorage[this.tokenKey] = token;

    this.fire('signin', { token });

    return token;
  }

  signout () {
    this.set('token', '');
    delete window.localStorage[this.tokenKey];

    this.fire('signout');
  }
}

xin.define('jwt-middleware', JwtMiddleware);

export default JwtMiddleware;

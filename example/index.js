import { define } from '@xinix/xin';
import { View } from '@xinix/xin/views';
import jwt from 'jsonwebtoken';

import '@xinix/xin/components/app';
import '@xinix/xin/components/pager';
import '../';

const SECRET = 'some secret';

class MyHome extends View {
  get template () {
    return `
    Home

    <div>Username <span>[[auth.username]]</span></div>
    <div>Exp <span>[[auth.exp]]</span></div>

    <a href="#" (click)="logout(evt)">Logout</a>
    `;
  }

  get props () {
    return Object.assign({}, super.props, {
      auth: {
        type: Object,
        value: () => ({}),
      },
    });
  }

  focused () {
    super.focused();

    let { payload: { username, exp } } = window.jwtMiddleware.getAuth();
    this.set('auth', { username, exp });
  }

  logout (evt) {
    evt.preventDefault();

    window.jwtMiddleware.signout();
    this.__app.navigate('/login');
  }
}

define('my-home', MyHome);

class MyLogin extends View {
  get template () {
    return `
    Login

    <a href="#" (click)="login(evt)">Simulate login</a>
    `;
  }

  login (evt) {
    evt.preventDefault();

    let username = 'foo';
    let exp = new Date();
    exp.setDate(exp.getDate() + 1);
    exp = exp.getTime() / 1000;

    let token = jwt.sign({ username, exp }, SECRET);
    let jwtMiddleware = window.jwtMiddleware;
    jwtMiddleware.set('token', token);
    window.localStorage[jwtMiddleware.tokenKey] = token;

    this.__app.navigate('/');
  }
}

define('my-login', MyLogin);

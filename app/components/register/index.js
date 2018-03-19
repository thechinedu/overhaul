import React, { Component } from 'react';
import cheerio from 'cheerio';
import renderHTML from 'react-render-html';

import pageActions from 'utils/api/register';

export default class Register extends Component {
  state = {
    username: '',
    password: '',
    code: this.props.document('input[name="validcode"]').val(),
    email: this.props.document('input[name="email"]').val(),
    isValidCode: true,
    registrationStatus: '',
    fetchingFormResult: false
  }

  componentDidMount() {
    if (!this.state.code) this.setState({ isValidCode: false });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.setState({ fetchingFormResult: true });

    const formData = pageActions.formData({
      name: this.state.username,
      password: this.state.password,
      validcode: this.state.code,
      email: this.state.email
    });

    fetch('/do_register', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: formData
    }).then(res => {
      res.text().then(html => {
        const doc = cheerio.load(html);
        let status = doc('title').text();

        if (status.toLowerCase() === 'login to nairaland') {
          status = 'Your new account has been created. You can now <a href="/login">login</a>';
        } else if (status.toLowerCase() === 'www.nairaland.com | 502: bad gateway') {
          status = 'An error occured while creating your account. Please try again.';
        }

        this.setState({
          fetchingFormResult: false,
          registrationStatus: status
        });
      });
    });
  }

  handleNameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  expiredCodeMessage() {
    return (
      <p className="expired-code-message">
        The confirmation code has expired. Please
        <a href="/confirm_email"> try signing up again.</a>
      </p>
    );
  }

  render() {
    return (
      <section className="confirm-email">
        <header>
          <h1>
            {this.state.isValidCode ?
              'Complete Your Registration' :
              this.expiredCodeMessage()}
          </h1>
        </header>

        {this.state.isValidCode && <main>
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="email">Username: </label>
            <input
              type="text"
              placeholder="not seun"
              id="username"
              name="name"
              minLength="4"
              maxLength="15"
              onChange={this.handleNameChange}
              value={this.state.username}
              required
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              minLength="8"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              required
            />

            <button type="submit">
              submit
              {this.state.fetchingFormResult &&
                <i className="fa fa-spinner fa-pulse"></i>
              }
            </button>
          </form>

          <p className="registration-status">
            {renderHTML(this.state.registrationStatus)}
          </p>
        </main>}
      </section>
    )
  }
}
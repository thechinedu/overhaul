import React, { Component } from 'react';
import cheerio from 'cheerio';

export default class ConfirmEmail extends Component {
  state = {
    formVal: '',
    registrationStatus: '',
    fetchingFormResult: false
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.setState({
      fetchingFormResult: true,
      registrationStatus: ''
    });

    fetch(`/do_confirm_email?email=${encodeURIComponent(this.state.formVal)}`)
    .then(res => {
      res.text().then(html => {
        const doc = cheerio.load(html);
        let status = doc('title').text();

        if (status.toLowerCase() === 'www.nairaland.com | 502: bad gateway') {
          status = 'An error occured while confirming your email. Please try again.';
        }

        this.setState({
          fetchingFormResult: false,
          registrationStatus: status
        });
      });
    });
  }

  handleInputChange = (e) => {
    this.setState({
      formVal: e.target.value
    });
  }

  render() {
    return (
      <section className="confirm-email">
        <header>
          <h1>
            Submit your email to join Nairaland
          </h1>
        </header>

        <main>
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              placeholder="not-seun@mail.com"
              id="email"
              value={this.state.formVal}
              onChange={this.handleInputChange}
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
            {this.state.registrationStatus}
          </p>
        </main>
      </section>
    )
  }
}
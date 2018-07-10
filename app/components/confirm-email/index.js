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
    const { registrationStatus } = this.state;

    return (
      <section className="registration-page">
        <header>
          <h1>
            Submit your email to join Nairaland
          </h1>
        </header>

        <main>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-wrapper">
              <i className="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={this.state.formVal}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <button type="submit">
              Submit
              {this.state.fetchingFormResult &&
                <i className="fa fa-spinner fa-pulse"></i>
              }
            </button>
          </form>

          {registrationStatus && <p className="registration-status">
            {registrationStatus}
          </p>}
        </main>
      </section>
    )
  }
}

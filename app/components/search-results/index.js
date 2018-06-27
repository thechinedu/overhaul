import React from 'react';

export default class SearchResults extends React.Component {
  render() {
    return (
      <section className="wrapper search-page">
        <header className="search-query">
          <h1>Search results for plantain</h1>
        </header>

        <main className="search-results">
          <div className="search-result">
            <div className="metadata">
              <img
                src="http://placehold.it/35x35"
                alt="profile image"
                className="profile-image"
              />
              <span className="username">
                Galkime
              </span>

              <span className="thread-category">
                Tv/Movies
              </span>

              <span className="timestamp">
                10:42am
              </span>

              <div className="thread-title">
                <h3>
                  Blow Money Records Act “realzy” Shot Shaku Shaku Madness Video
                </h3>
              </div>
            </div>

            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus error sunt perferendis harum labore repellat tempore molestias. Velit ex autem, aspernatur voluptatem quae, non provident excepturi ratione earum error delectus?

                <span className="highlight">
                  Hello
                </span>
              </p>
            </div>
          </div>

          <div className="search-result">
            <div className="metadata">
              <img
                src="http://placehold.it/35x35"
                alt="profile image"
                className="profile-image"
              />
              <span className="username">
                Galkime
              </span>

              <span className="thread-category">
                Tv/Movies
              </span>

              <span className="timestamp">
                10:42am
              </span>

              <div className="thread-title">
                <h3>
                  Blow Money Records Act “realzy” Shot Shaku Shaku Madness Video
                </h3>
              </div>
            </div>

            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus error sunt perferendis harum labore repellat tempore molestias. Velit ex autem, aspernatur voluptatem quae, non provident excepturi ratione earum error delectus?

                <span className="highlight">
                  Hello
                </span>
              </p>
            </div>
          </div>
        </main>
      </section>
    );
  }
}
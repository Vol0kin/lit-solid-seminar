import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './CustomPost.js';

@customElement('posts-list')
export class PostsList extends LitElement {
  @property({ type: String }) title = 'My app';

  @state()
  posts = [];

  @state()
  searchTitle = '';

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--posts-list-background-color);
    }

    main {
      flex-grow: 1;
    }

    input {
      border: 2px solid #1a2b42;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 20px;
      margin-bottom: 50px;
      width: 40vw;
      text-align: center;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }

    custom-post {
      margin: 0px 10px;
    }
  `;

  // connectedCallback is called when the component is added to the document's
  // DOM. Its React equivalent would be componentDidMount
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }

    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      this.posts = data;
    })();
  }

  updateSearchTitle(event: Event) {
    this.searchTitle = (event.target as HTMLInputElement).value;
  }

  render() {
    const filteredPosts = this.posts.filter(post => {
      const { title } = post;

      return (title as string).includes(this.searchTitle.toLowerCase());
    });

    return html`
      <main>
        <h1>${this.title}</h1>

        <input
          @input=${this.updateSearchTitle}
          placeholder="Search by title..."
        />

        ${filteredPosts.map(post => {
          const { body, id, title } = post;

          return html` <custom-post
            key=${id}
            title=${title}
            body=${body}
          ></custom-post>`;
        })}
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

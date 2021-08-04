import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import _ from 'lodash-es';

import './CustomPost.js';

interface Post {
  title: string;
  body: string;
  id: number;
  userId: number;
}

@customElement('posts-list')
export class PostsList extends LitElement {
  @property({ type: String })
  title = 'My app';

  @state()
  posts: Post[] = [];

  @state()
  filteredPosts: Post[] = [];

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

    custom-post {
      margin: 20px 0px;
    }
  `;

  // connectedCallback is called when the component is added to the document's
  // DOM. Its React equivalent would be componentDidMount
  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();

    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const data = await response.json();

      this.posts = data;
      this.filteredPosts = data;
    })();
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('searchTitle')) {
      this._filterPosts();
    }
  }

  private _updateSearchTitle = (e: Event) => {
    const newSearchTitle = (e.target as HTMLInputElement).value;
    this.searchTitle = newSearchTitle;
  };

  private _filterPosts = _.debounce(() => {
    this.filteredPosts = this.posts.filter(post =>
      post.title.includes(this.searchTitle.toLowerCase())
    );
  }, 500);

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>

        <input
          type="text"
          @input=${this._updateSearchTitle}
          placeholder="Search by title..."
        />

        ${this.filteredPosts.length !== this.posts.length
          ? html`<p>
              Showing ${this.filteredPosts.length} out of ${this.posts.length}
              posts
            </p>`
          : html`<p></p>`}
        ${this.filteredPosts.map(
          post =>
            html` <custom-post
              title=${post.title}
              body=${post.body}
            ></custom-post>`
        )}
      </main>
    `;
  }
}

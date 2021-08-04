import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-post')
export class CustomPost extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: String })
  body = '';

  static styles = css`
    :host {
      display: block;
    }
    div {
      background-color: #fefefe;
      padding: 20px 10px;
    }
  `;

  render() {
    return html`
      <div>
        <h2>${this.title}</h2>
        <p>${this.body}</p>
      </div>
    `;
  }
}

import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let Post = class Post extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.body = '';
    }
    render() {
        return html `
      <div>
        <h2>${this.title}</h2>
        <p>${this.body}</p>
      </div>
    `;
    }
};
__decorate([
    property({ type: String })
], Post.prototype, "title", void 0);
__decorate([
    property({ type: String })
], Post.prototype, "body", void 0);
Post = __decorate([
    customElement('post')
], Post);
export { Post };
//# sourceMappingURL=Posts.js.map
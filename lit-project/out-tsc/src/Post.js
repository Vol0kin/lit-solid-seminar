import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let CustomPost = class CustomPost extends LitElement {
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
], CustomPost.prototype, "title", void 0);
__decorate([
    property({ type: String })
], CustomPost.prototype, "body", void 0);
CustomPost = __decorate([
    customElement('custom-post')
], CustomPost);
export { CustomPost };
//# sourceMappingURL=Post.js.map
"use strict";

class MutaElement {
    tag;
    props = {};
    content = [];

    constructor(constructor) {
        this.tag = constructor.tag;
        if (Object.prototype.hasOwnProperty.call(constructor, 'props'))
            this.setp(constructor.props);
        if (Object.prototype.hasOwnProperty.call(constructor, 'content'))
            this.setc(constructor.content);
    }

    gett() {
        return this.tag;
    }

    sett(tag) {
        this.tag = tag;
    }

    getc() {
        return this.content;
    }

    setc(content) {
        if (content?.constructor !== Array)
            this.content = [content];
        else
            this.content = content;
    }

    addc(content) {
        if (!this.content.length)
            this.content = [];
        if (content?.constructor !== Array)
            this.content.push(content);
        else
            this.content.concat(content);
    }

    getp() {
        return this.props;
    }

    setp(props, root = false) {
        if (root)
            this.props = [];
        for (let [key, value] of Object.entries(props)) {
            if (value?.constructor === Array)
                this.props[key] = value;
            else
                this.props[key] = [value];
        }
    }

    addp(props) {
        for (let [key, value] of Object.entries(props)) {
            if (Object.prototype.hasOwnProperty.call(this.props, key))
                if (value?.constructor === Array)
                    this.props[key].concat(value);
                else {
                    console.log(this.props[key]);
                    this.props[key].push(value);
                }
            else
                if (value?.constructor === Array)
                    this.props[key] = value;
                else {
                    this.props[key] = [value];
                }
        }
    }

    html() {
        let props = '';
        let content = '';
        for (let [key, value] of Object.entries(this.props)) {
            props += ` ${key}="${value.join(' ')}"`;
        }
        for (let item of this.content) {
            if (typeof item === 'string')
                content += item;
            else
                content += item.html();
        }
        return `<${this.tag}${props}>${content}</${this.tag}>`;
    }
}

class MutaDOM {
    crel(params) {
        return new MutaElement(params);
    }

    ren(element, content) {
        if (element?.innerHTML !== undefined) {
            if (typeof content === 'string')
                element.innerHTML = content;
            else if (content?.constructor === MutaElement)
                element.innerHTML = content.html();
            else throw new Error('unable to render')
        }
        else if (element?.html !== undefined && element?.constructor !== MutaElement) {
            if (typeof content === 'string')
                element.html(content);
            else if (content?.constructor === MutaElement)
                element.html(content.html());
            else throw new Error('unable to render')
        }
        else throw new Error('unable to render')
    }

    app(element, content) {
        if (element?.innerHTML !== undefined) {
            if (typeof content === 'string')
                element.innerHTML += content;
            else if (content?.constructor === MutaElement)
                element.innerHTML += content.html();
            else throw new Error('unable to append')
        }
        else if (element?.html !== undefined && element?.constructor !== MutaElement) {
            if (typeof content === 'string')
                element.append(content);
            else if (content?.constructor === MutaElement)
                element.append(content.html());
            else throw new Error('unable to append')
        }
        else throw new Error('unable to append')
    }
}

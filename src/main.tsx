namespace Lime {
  export function createElement(component: any, props: any, ...children: Array<Component | string>): Component {
    const wrapper = new component();
    wrapper.props = props;
    return wrapper;
  }
}

declare namespace JSX {
  export interface Element extends Component { }
  interface ElementAttributesProperty {
    props: any;
  }
}

abstract class Component {
  protected root: HTMLElement | null;
  public props: any;

  public abstract toHtml(): HTMLElement;

  public update(): HTMLElement {
    const html = this.toHtml();
    if (this.root) this.root.replaceWith(html);
    this.root = html;
    return html;
  }

  public mount(el: string): void {
    this.root = document.querySelector(el);
    this.update();
  }
}

abstract class HTMLComponent extends Component {
  private tag: string;

  protected constructor(tag: string) {
    super();
    this.tag = tag;
  }
}

abstract class HTMLComponentWithContent extends HTMLComponent {
  content: Array<Component | string>;

  public toHtml(): HTMLElement {
    const parent = document.createElement('div');
    this.content.forEach((c) => {
      if (c instanceof Component) parent.appendChild(c.toHtml());
      else parent.appendChild(document.createTextNode(c));
    });
    return parent;
  }
}

class Div extends HTMLComponentWithContent {
  public constructor() {
    super("div");
  }
}

abstract class CustomComponent extends Component {
  public abstract render(): Component;

  public toHtml(): HTMLElement {
    return this.render().toHtml();
  }
}

class App extends CustomComponent {
  public render(): Component {
    return new Test();
  }
}

class Greeting extends CustomComponent {
  public props: {
    name: string;
  };

  public render(): Component {
    const d = new Div();
    d.content = ['Hello', ' ', this.props.name, '!'];
    return d;
  }
}

class Test extends CustomComponent {
  public render(): Component {
    return <Greeting name="World"/>;
  }
}

new App().mount('#app');

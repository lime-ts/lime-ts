namespace JSX {
  export interface Element extends Lime.Node { }
  export interface ElementAttributesProperty {
    props: any;
  }
  export interface ElementChildrenAttribute{
    slots: any;
  }
  export interface IntrinsicElements {
    div: Lime.div
  }
}

namespace Lime {
  export function createElement(
      component: (new () => Lime.Node) | string,
      props: any,
      ...content: Array<any>
  ): Lime.Node {
    let instance: Lime.Node;
    if (typeof component === "string") {
      instance = new Lime.HtmlNode(component);
    } else {
      instance = new component();
    }
    instance.props = props ?? { };
    instance.props.content = content;
    return instance;
  }

  export abstract class Node {
    public props: { };
  }

  export class HtmlNode extends Node {
    private tag: string;
    public constructor(tag: string) {
      super();
      this.tag = tag;
    }
  }

  export interface HtmlTag {
    content: JSX.Element | string | Array<JSX.Element | string>;
    className?: string | (() => string);
  }

  export interface div extends HtmlTag { }

  export abstract class Component extends Lime.Node {
    public abstract render(): Lime.Node;
  }
}

class Greeting extends Lime.Component {
  public props: {
    salutation: string;
    slots: {
      a: JSX.Element
    };
  };

  public render() {
    return <div>{this.props.salutation} {this.props.slots.a}</div>;
  }
}

class App extends Lime.Component {
  private className = "centered";

  public render() {
    return (
      <div className={this.className}>
        <Greeting salutation="Hello"><div>!</div></Greeting>
      </div>
    );
  }
}

console.log(new App());

import { JSXElementConstructor, ReactNode } from "react";

type NoInfer<T> = [T][T extends any ? 0 : 1];

type ContainsChildren = {
  children?: React.ReactNode;
};

function ProviderStack<
  Providers extends [ContainsChildren, ...ContainsChildren[]]
>({
  providers,
  children,
}: {
  providers: {
    [k in keyof Providers]: [
      JSXElementConstructor<Providers[k]>,
      Omit<NoInfer<Providers[k]>, "children">
    ];
  };
  children: ReactNode;
}) {
  let node = children;

  for (let [Provider, props] of providers) {
    node = <Provider {...props}>{node}</Provider>;
  }

  return node;
}

export { ProviderStack };

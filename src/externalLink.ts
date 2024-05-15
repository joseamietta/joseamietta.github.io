import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export const externalLink: RehypePlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type != "element") {
        return;
      }

      const element = node as Element;

      if (!isAnchor(element)) {
        return;
      }

      const url = getUrl(element);

      console.log(url)

      if (isExternal(url)) {
        element.properties!["target"] = "_blank";
      }
    });
  };
};

const isAnchor = (element: Element) =>
  element.tagName == "a" && element.properties && "href" in element.properties;

const getUrl = (element: Element) => {
  if (!element.properties) {
    return "";
  }

  const url = element.properties["href"];

  if (!url) {
    return "";
  }

  return url.toString();
};

const isExternal = (url: string) => {
  return url.startsWith("http");
};

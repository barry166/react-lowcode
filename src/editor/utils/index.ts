import { CSSProperties } from "react";

export function cssToObject(cssString: string): CSSProperties {
  const cssProperties: { [key: string]: string } = {};

  // 去除可能的注释和多余的空格
  cssString = cssString.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "").trim();

  // 分割字符串获取单独的属性行
  const lines = cssString.split(";").filter((line) => line.trim() !== "");

  lines.forEach((line) => {
    const [property, value] = line.split(":").map((item) => item.trim());
    if (property && value) {
      // 将属性名转换为驼峰命名
      const camelCaseProperty = property.replace(/([-][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "");
      });
      cssProperties[camelCaseProperty] = value;
    }
  });

  return cssProperties;
}

export function objectToCSS(cssProperties: CSSProperties) {
  let cssString = "";

  for (let property in cssProperties) {
    if (cssProperties.hasOwnProperty(property)) {
      // 将驼峰命名转换为短横线命名
      const cssProperty = property.replace(/([A-Z])/g, "-$1").toLowerCase();
      const value = cssProperties[property as keyof CSSProperties];
      cssString += `${cssProperty}: ${value};\n`;
    }
  }

  return cssString;
}

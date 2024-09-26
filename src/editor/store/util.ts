import { IComponent } from "./components";

export const getComponentById = (id: string, components: IComponent[]): IComponent | null => {
  if (!components || components.length === 0) return null;

  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      return components[i];
    } else if (components[i].children) {
      const result = getComponentById(id, components[i].children!);
      if (result) return result;
    }
  }
  return null;
};

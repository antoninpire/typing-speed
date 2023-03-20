import t from "react-hot-toast";

export const toast = {
  success: (title: string, duration?: number) => {
    t.success(`${title}`, {
      duration,
      position: "top-right",
    });
  },
  error: (title: string, duration?: number) => {
    t.error(`${title}`, {
      duration,
      position: "top-right",
    });
  },
  info: (title: string, duration?: number) => {
    t(`${title}`, {
      duration,
      position: "top-right",
    });
  },
  hide: (id?: string) => {
    t.dismiss(id);
  },
};

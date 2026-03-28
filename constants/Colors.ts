let light = {
  text: "#000",
  textSecondary: "#666",
  textTertiary: "#999",
  background: "#fff",
  backgroundSecondary: "#fafafa",
  border: "#eaeaea",
  tint: "#000",
  tabIconDefault: "#ccc",
  tabIconSelected: "#000",
  verseRead: "#000",
  verseUnread: "#eaeaea",
  buttonPrimary: "#000",
  buttonPrimaryText: "#fff",
  toggleActive: "#000",
  toggleActiveText: "#fff",
  toggleInactive: "transparent",
  toggleInactiveText: "#666",
  error: "#e00",
};

let dark = {
  text: "#fff",
  textSecondary: "#888",
  textTertiary: "#666",
  background: "#000",
  backgroundSecondary: "#111",
  border: "#333",
  tint: "#fff",
  tabIconDefault: "#ccc",
  tabIconSelected: "#fff",
  verseRead: "#fff",
  verseUnread: "#333",
  buttonPrimary: "#fff",
  buttonPrimaryText: "#000",
  toggleActive: "#fff",
  toggleActiveText: "#000",
  toggleInactive: "transparent",
  toggleInactiveText: "#888",
  error: "#f44",
};

export type ThemeColors = typeof light;

export default { light, dark };

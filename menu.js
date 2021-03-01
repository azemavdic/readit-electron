// Modules
const { Menu, shell } = require("electron");

// Module function to create main app menu
module.exports = (appWin) => {
  // Menu template
  let template = [
    {
      label: "Naslovi",
      submenu: [
        {
          label: "Novi",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            appWin.send("menu-show-modal");
          },
        },
        {
          label: "Pročitaj naslov",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            appWin.send("menu-open-item");
          },
        },
        {
          label: "Obriši",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            appWin.send("menu-delete-item");
          },
        },
        {
          label: "Otvori u pretraživaču",
          accelerator: "CmdOrCtrl+Shift+Enter",
          click: () => {
            appWin.send("menu-open-item-native");
          },
        },
        {
          label: "Pretraga",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            appWin.send("menu-focus-search");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Repo aplikacije",
          click: () => {
            shell.openExternal("https://github.com/azemavdic/readitelectron");
          },
        },
      ],
    },
  ];

  // Create Mac app menu
  if (process.platform === "darwin") template.unshift({ role: "appMenu" });

  // Build menu
  let menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};

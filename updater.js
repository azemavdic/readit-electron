//Electron updater module
const { autoUpdater } = require("electron-updater");
const { dialog } = require("electron");

//Config log debugging
autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

//Iskljuci auto download update
autoUpdater.autoDownload = false;

//Single export to check for and apply available updates

module.exports = () => {
  //check for updates (GH releases)
  autoUpdater.checkForUpdates();

  //listen for update found
  autoUpdater.on("update-available", () => {
    //Pitaj korisnika za download
    dialog
      .showMessageBox({
        type: "info",
        title: "Update dostupan",
        message: "Nova verzija je dostupna. Želite li nadograditi?",
        buttons: ["Update", "Ne"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        //if button 0 (update), start downloading update
        if (buttonIndex === 0) autoUpdater.downloadUpdate();
      });
  });
  //listen for update downloaded
  autoUpdater.on("update-downloaded", () => {
    //Pitaj korisnika za instalaciju update
    dialog
      .showMessageBox({
        type: "info",
        title: "Update spreman",
        message: "Instaliraj i restartuj aplikacijeu sad?",
        buttons: ["Da", "Kasnije"],
      })
      .then((result) => {
        let buttonIndex = result.response;

        //if button 0 (Yes), instal update and restart the app
        if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true);
      });
  });
};

import license from 'editor/util/License'

export default class BaseItem {
    LICENSE = license;
    folders = [];
    __attribution = {
        showAttribution: false,
        name:"",
        authors: [
        ],
        description: "",
        license: "",
        changeDisclaimer: true,
        imageUrl: ""
    }

    constructor(info) {
        if(info) {
            this.parentRemove = info.remove; 
        }
    }

    setFolderName = (name) => {
        
        this.folder.name = name;
        this.ovFolder.name = name;
    }

    __setUpFolder = (info, name) =>  {
        this.folder = this.setUpGUI(info.gui, name);
        this.ovFolder = this.setUpGUI(info.overviewFolder, name);
    }
 
    __addFolder = (folder) => {
        this.folders.push(folder);
        folder.add(this, "remove");
        return folder;
    }

    remove = () => {
        if(!this.parentRemove) {
            console.log("CALL super WITH ARGUMENTS")
            return;
        }

        this.folder.parent.removeFolder(this.folder);
        this.ovFolder.parent.removeFolder(this.ovFolder);
        this.parentRemove(this);
    }

    setUpGUI = (gui, name) => {
        const folder = gui.addFolder(name);
        /* ADD STUFF TO FOLDER HERE */
        return this.__addFolder(folder);
    }

    // handles all updates in the render-loop 
    update = () => {}
    applyAutomations = ()  => {}
    setTime = () => {}
    stop = () => {}
    play = () => {}
    setUpGUI =  () => {}

    updateDisplay = () => {
        this.folders.forEach(folder => {
            folder.updateDisplay();
        })
    }
}
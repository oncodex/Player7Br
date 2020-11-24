const electron = require('electron')
const path = require('path')

Utils.main()

// Importing dialog module using remote 
let dialog = electron.remote.dialog

let uploadFile = document.getElementById('upload')

// Defining a Global file path Variable to store 
// user-selected file 
global.filepath = undefined

uploadFile.addEventListener('click', (e) => {
    e.preventDefault()
    // If the platform is 'win32' or 'Linux' 
    if (process.platform !== 'darwin') {
        // Resolves to a Promise<Object> 
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../assets/'),
            buttonLabel: 'Upload',
            // Restricting the user to only Text Files. 
            filters: [
                {
                    name: 'Song Files',
                    extensions: ['mp3', 'mpeg']
                },],
            // Specifying the File Selector Property 
            properties: ['openFile', 'multiSelections']
        }).then(file => {
            // Stating whether dialog operation was 
            // cancelled or not. 
            console.log(file.canceled)
            if (!file.canceled) {
                // Updating the GLOBAL filepath variable 
                // to user-selected file.             
                global.filepath = file.filePaths
                Utils.saveFiles(global.filepath)
            }

            Utils.messageUpload()
        }).catch(err => {
            console.log(err)
        })
    }
    else {
        // If the platform is 'darwin' (macOS) 
        dialog.showOpenDialog({
            title: 'Select the File to be uploaded',
            defaultPath: path.join(__dirname, '../'),
            buttonLabel: 'Upload',
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt', 'docx']
                },],
            // Specifying the File Selector and Directory 
            // Selector Property In macOS 
            properties: ['openFile', 'openDirectory', 'multiSelections']
        }).then(file => {
            // Stating whether dialog operation was 
            // cancelled or not. 
            console.log(file.canceled)
            if (!file.canceled) {
                // Updating the GLOBAL filepath variable 
                // to user-selected file.             
                global.filepath = file.filePaths
                Utils.saveFiles(global.filepath)
            }

            Utils.messageUpload()
        }).catch(err => {
            console.log(err)
        })
    }
})

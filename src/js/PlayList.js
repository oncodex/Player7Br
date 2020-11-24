const fs = require('fs')

class PlayList {

    constructor() {
        this.audio = new Audio()
    }

    start = () => {
        const dirPath = fs.readdirSync(Utils.pathUpload())
        if (dirPath.length == 0) {
            console.log('Plalist: ', 'Não existe audios para ser usando...')
            return
        }

        let songList = new Array()
        fs.promises.readdir(Utils.pathUpload()).then(files => {
            files.forEach(file => {
                songList.push(`${Utils.pathUpload()}${file}`)
            })
        }).then(() => {
            this.player(songList)
        }).catch((err) => {
            console.log(err)
        })
    }

    player(songList) {
        let cont = 0

        this.audio.src = songList[0]
        this.audio.play()
        this.audio.addEventListener('ended', function () {
            this.audio = new Audio()
            cont = (++cont < songList.length ? cont : 0)
            this.audio.src = songList[cont]
            this.audio.play()
        }, true)
    }

    stop = () => {
        this.audio.stop()
    }
}

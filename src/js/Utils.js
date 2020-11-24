const isOnline = require('is-online')

class Utils {
    static pathUpload = () => {
        return `${process.cwd()}/audios/`
    }

    static pathBackgrounds = () => {
        return `${process.cwd()}/backgrounds/`
    }

    static isExistPathUpload = () => {
        return fs.existsSync(Utils.pathUpload())
    }

    static download = async (porta) => {
        const nameImagem = `${porta}.png`
        if (!fs.existsSync(`${Utils.pathBackgrounds()}${nameImagem}`)) {
            const fetch = require('node-fetch')
            const resizeImg = require('resize-img')

            const url = `http://7br.com.br/background/${nameImagem}`
            const response = await fetch(url)
            if (response.ok) {
                const buffer = await response.buffer()
                const pathDir = `${Utils.pathBackgrounds()}${nameImagem}`
                const bufferResise = await resizeImg(buffer, {
                    width: 620,
                    height: 480,
                })

                fs.writeFile(pathDir, bufferResise, () => {
                    console.log('finished downloading backgrounds!')
                    $('#message-config').html('<p class="text-success">Background salvo com sucesso.</p>')
                        .show().delay(4000).fadeOut()
                })
            }
        }
    }

    static getBackgroundsPage = () => {
        let pathBackgrounds = `${Utils.pathBackgrounds()}${localStorage.getItem('porta')}.png`
        let existsBackground = fs.existsSync(pathBackgrounds)
        if (existsBackground) {
            $('#background').attr('src', pathBackgrounds)
        }
    }

    static createAllFolders = () => {
        if (!fs.existsSync(Utils.pathUpload())) {
            fs.mkdirSync(Utils.pathUpload())
        }

        if (!fs.existsSync(Utils.pathBackgrounds())) {
            fs.mkdirSync(Utils.pathBackgrounds())
        }
    }

    static messageUpload = () => {
        let messageUpload = $('#message-uplaod')
        messageUpload.html('<p class="text-success">Arquivos de audios importados com sucesso.</p>')
            .show().delay(4000).fadeOut()
    }

    static saveFiles = (globalPath) => {
        globalPath.forEach((file) => {
            let nameFile = path.basename(file.toString())
            fs.promises.readFile(file.toString())
                .then((data) => {
                    fs.promises.writeFile(`${Utils.pathUpload()}${nameFile}`, data)
                        .then((data) => {
                            console.log('saveFiles', data)
                        }).catch(err => {
                            if (err) throw err
                        })
                }).catch(err => {
                    if (err) throw err
                })
        })
    }

    static aoVivo = () => {
        $('#aovivo').show()
        $('#noaovivo').hide()
    }

    static noAoVivo = () => {
        $('#aovivo').hide()
        $('#noaovivo').show()
    }

    static main = () => {
        Utils.createAllFolders()
        Utils.getBackgroundsPage()
        Utils.detectInternet()
    }

    static compareDates = (currentDate) => {
        let parts = currentDate.split('/') // separa a data pelo caracter '/'
        let today = new Date()      // pega a data atual

        let dateExplode = new Date(parts[2], parts[1] - 1, parts[0]) // formata 'date'

        // compara se a data informada é maior que a data atual
        // e retorna true ou false
        return today >= dateExplode
    }

    static detectInternet = () => {
        window.setInterval(() => {            
            return new Promise((resolve, reject) => {
                isOnline().then(online => {
                    if (online && !PlayerStreamer.isPlay()) {
                        const fetch = require('node-fetch')
                        const urlStreamer = localStorage.getItem('configPlayer')

                        if (urlStreamer) {
                            fetch(urlStreamer)
                                .then(res => {
                                    PlayerStreamer.start('audio')
                                    $('#msg-status')
                                        .html('<span style="font-size: 12px;" class="text-danger"> Player Inicializado</span>')
                                        .hide()
                                })
                                .catch(err => {
                                    $('#msg-status')
                                        .html('<span style="font-size: 12px;" class="text-danger"> Erro ao conectar no streamer</span>')
                                        .show()
                                    Utils.noAoVivo()
                                })
                        }
                    }
                })
            })
        }, 3000)
    }
}
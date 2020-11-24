let isPlay = false
const playList = new PlayList()

class PlayerStreamer {

    static start = (idPlayer) => {
        let audio = document.getElementsByTagName(idPlayer)[0]
        let config = localStorage.getItem('configPlayer')

        if (config !== null) {
            audio.src = config
            audio.play()
            isPlay = true
        }

        audio.onplay = function () {
            console.log('onplay')
        }

        audio.onplaying = function () {
            console.log('onplaying')
            console.log(isPlay)
            if (!isPlay) {
                document.location.reload(true)
            }
 
            Utils.aoVivo()
        }

        audio.onpause = function () {
            console.log('onpause')
            Utils.noAoVivo()
        }
       
        audio.onwaiting = function () {
            console.log('onwaiting1: ' + audio.paused)
            console.log('onwaiting2: ' + audio.currentTime)
            console.log('onwaiting3: ' + audio.ended)
            console.log('onwaiting4: ' + audio.readyState)
            Utils.noAoVivo()

            if (audio.readyState) {
                console.log(isPlay)
                isPlay = false
                playList.start()
            }
        }

        audio.onerror = function(){
            console.log('onerror: ' + 'Erro no player')
            Utils.noAoVivo()
            isPlay = false
        }        
    }

    static isPlay = () => {
        return isPlay
    }
}

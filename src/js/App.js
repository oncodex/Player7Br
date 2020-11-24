class App {
  static showModal = () => {
    let pressedCtrl = false //variável de controle 
    $(document).keyup(function (e) {  //O evento Kyeup é acionado quando as teclas são soltas
      if (e.which == 17) pressedCtrl = false //Quando qualuer tecla for solta é preciso informar que Crtl não está pressionada
    })

    $(document).keydown(function (e) { //Quando uma tecla é pressionada
      if (e.which == 17) pressedCtrl = true //Informando que Crtl está acionado
      if ((e.which == 76 || e.keyCode == 76) & pressedCtrl == true) { //Reconhecendo tecla Enter
        $('#modalConfig').modal()
      }
    })
  }

  static saveConfig = () => {
    $('#form-config').on('submit', function (e) {
      e.preventDefault()

      let radioServidor = $("input:radio[name ='servidor']:checked").val()
      let urlStreamer = $("input:radio[name ='url-streamer']:checked").val()
      let porta = $('#porta').val()

      if (radioServidor === undefined && urlStreamer === undefined) {
        alert('Você deve escolher uma configuração.')
        return
      } else if (radioServidor === undefined) {
        alert('Você deve escolher servidor1 ou servidor2.')
        return
      } else if (urlStreamer === undefined) {
        alert('Você deve escolher shoutcast ou icecast.')
        return
      } else if (porta === '') {
        alert('Você deve definir uma porta.')
        return
      }
      
      localStorage.setItem('porta', `${porta}`)
      Utils.download(porta)

      try {
        if (urlStreamer === 'no-stream') {
          let config = `http://${radioServidor}:${porta}/live.aac/;`
          localStorage.setItem('configPlayer', config)
          $('#message-config').html('<p class="text-success">Streamer salvo com sucesso.</p>')
          .show().delay(4000).fadeOut()
        } else {
          let config = `http://${radioServidor}:${porta}${urlStreamer}`
          localStorage.setItem('configPlayer', config)
          $('#message-config').html('<p class="text-success">Streamer salvo com sucesso.</p>')
          .show().delay(4000).fadeOut()
        }
      } catch (err) {
        $('#message-config').html('<p class="text-danger">Erro ao gravar configurações!</p>')
          .show().delay(4000).fadeOut()
      }       
    })  
  }

  static closeModal = () => {
    $('.close').on('click', function (e) {
      e.preventDefault()
      window.location.reload(true)
    })
  }

}

App.showModal()
App.closeModal()
App.saveConfig()

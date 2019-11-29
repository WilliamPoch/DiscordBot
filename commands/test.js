module.exports = message => {
  // const tf = require('@tensorflow/tfjs')
  // const speechCommands = require('@tensorflow-models/speech-commands');
  const sox = require('sox')
  const ffmpeg = require('fluent-ffmpeg');
  const decode = require('../decodeOpus.js');
  const wit = require('witai-speech')
  const tf = require('@tensorflow/tfjs-node')
  const fs = require('fs');
  const Discord = require('discord.js')
  const googleSpeech = require('@google-cloud/speech')
  const ConvertTo1ChannelStream = require('../convertTo1ChannelStream')
  const googleSpeechClient = new googleSpeech.SpeechClient()

  // const access = 'UZ5UB6B3WAWX4Y2Y6GZFMHAH6AU23WAN';
  // const witai = new wit.ASR({token: access});

  async function model() {
    console.log('loading...')
    const model = await tf.loadLayersModel('file://model/model.json');
    console.log('model loaded..')
    return model
  }

  function generateOutputFile(member) {
    const fileName = './recordings/test.pcm';
    return fs.createWriteStream(fileName);
  }

  function handleSpeaking(member, speaking) {
    // Close the writeStream when a member stops speaking
    if (!speaking && member.voiceChannel) {
      let stream = listenStreams.get(member.id);
      if (stream) {
        listenStreams.delete(member.id);
        stream.end(err => {
          if (err) {
            console.error(err);
          }

          let basename = path.basename(stream.path, '.opus_string');
          let text = "default";

          // decode file into pcm
          decode.convertOpusStringToRawPCM(stream.path,
            basename,
            (function () {
              processRawToWav(
                path.join('./recordings', basename + '.raw_pcm'),
                path.join('./recordings', basename + '.wav'),
                (function (data) {
                  if (data != null) {
                    handleSpeech(member, data._text);
                  }
                }).bind(this))
            }).bind(this));
        });
      }
    }
  }

  if (message.member.voiceChannel) {
    if (!message.guild.voiceConnection) {
      message.member.voiceChannel.join().then(connection => {
        const dispatcher = connection.playFile('./audio/boop.mp3')
        dispatcher.on('end', end => {
          console.log('boop')
        })

        const receiver = connection.createReceiver();
        connection.on('speaking', (user, speaking) => {
          console.log(user.username)
          console.log(speaking)
          if (!speaking && message.member.voiceChannel) {
            console.log('not speaking')
            pass
          }
          message.channel.send(`I'm listening to ${user}`);
          // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
          const audioStream = receiver.createPCMStream(user)
          const requestConfig = {
            encoding: 'LINEAR16',
            sampleRateHertz: 48000,
            languageCode: 'en-US'
          }
          const request = {
            config: requestConfig
          }
          const recognizeStream = googleSpeechClient
            .streamingRecognize(request)
            .on('error', console.error)
            .on('data', response => {
              const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n')
                .toLowerCase()
              console.log(`Transcription: ${transcription}`)
            })

          const convertTo1ChannelStream = new ConvertTo1ChannelStream()

          audioStream.pipe(convertTo1ChannelStream).pipe(recognizeStream)


          audioStream.on('end', async () => {
            console.log('audioStream end')
          })
        })
      })
    }
  } else {
    message.reply("You must be in a voice channel to summon me.")
  }

}
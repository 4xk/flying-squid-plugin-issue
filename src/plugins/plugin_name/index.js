// module.exports.server = function(serv) {
//     serv.on('randomTickBlock', ({ world, position, blockType }) => {
//       if (blockType === 2) { // If grass
//         serv.setBlock(world, position, 1, 0); // Change to stone (id 1, data 0)
//       }
//     })
//   }
  
  module.exports.player = function (player, serv) {
    player._client.on('chat', ({ message } = {}) => {
      if (message[0] === '/') {
        player.behavior('command', { command: message.slice(1) }, ({ command }) => player.handleCommand(command))
      } else {
        player.behavior('chat', {
          message: message,
          prefix: '#!' + player.username + ': ',
          text: message,
          whitelist: serv.players,
          blacklist: []
        }, ({ prefix, text, whitelist, blacklist }) => {
          const obj = serv.parseClassic(prefix)
          if (!obj.extra) obj.extra = []
          obj.extra.push(serv.parseClassic(text))
          serv.broadcast(obj, {
            whitelist: whitelist,
            blacklist: blacklist
          })
        })
      }
    })
  }
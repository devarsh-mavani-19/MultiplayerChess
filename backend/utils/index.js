module.exports.generateRoomId = () => {
  var tempId = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    tempId += characters.charAt(Math.floor(Math.random() * charactersLength));
    if ((i + 1) % 4 === 0 && i !== 11) {
      tempId += "-";
    }
  }
  return tempId;
};

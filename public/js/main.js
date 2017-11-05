var parseEMV = require('promptpay-emvco-parser');

document.getElementById("file").onchange = function () {
    var reader = new FileReader();

    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        var data = e.target.result;
        qrcode.decode(data);
    };

    qrcode.callback = function(decodedData) {
      var rawData = decodedData;
      // parse promptpay info
      var promptpayInfo = parseEMV(rawData);
      var raw = document.getElementById("rawData");
      raw.innerHTML = "data: " + rawData;
      var table = document.getElementById("table");
      // clear old table value
      table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
      var keys = Object.keys(promptpayInfo);
      for(var i=0;i<keys.length;i++) {
        var key = keys[i];
        var data = promptpayInfo[key];
        var row = table.insertRow(i+1);
        var id = row.insertCell(0);
        id.innerHTML = data.id;
        var name = row.insertCell(1);
        name.innerHTML = data.name;
        var value = row.insertCell(2);
        if(key == "CRC") value.innerHTML = data.data + " valid: " + data.valid;
        else value.innerHTML = data.data;
      }
      // merchant data
      var merchantInfo = promptpayInfo.MerchantAccountInformation.merchantInfo;
      var ppType = document.getElementById("ppType");
      ppType.innerHTML = merchantInfo.promptpayIdType;
      var ppNumber = document.getElementById("ppNumber");
      ppNumber.innerHTML = merchantInfo.promptpayNumber;
    }

    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
    
};
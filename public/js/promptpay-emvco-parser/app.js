/*!
 * promptpay-emvco-parser
 * JavaScript library to parse the promptpay qrcode into emvco object
 * <https://github.com/apemon/promptpay-emv-parser>
 *
 * Refs:
 * - https://www.blognone.com/node/95133
 * - https://www.emvco.com/emv-technologies/qrcodes/
 * - https://github.com/dtinth/promptpay-qr
 * - https://github.com/mhdnamvar/node-emv.git
 * 
 * @license MIT
 */

function parse(emvdata) {
    // tokenize the string first
    var tags = _parseTag(emvdata);
    // read from each tag
    var result = {};
    var keys = Object.keys(tags);
    for(var i=0;i<keys.length;i++) {
        var key = keys[i];
        var value = tags[key];
        var tag = emv_tags[key];
        var temp = tag;
        temp.data = value.data;
        result[tag.name] = temp;
        // check merchant info
        if(key == "29") temp.merchantInfo = _parsePromptPayInfo(temp);
    }
    return result;
}

function _parsePromptPayInfo(merchantTag) {
    // 29 - promptpay
    var merchantData = _parseTag(merchantTag.data);
    var applicationId = merchantData["00"];
    // find promptpay id type
    var promptpayIdType;
    if(merchantData["01"]) promptpayIdType = "MobileNumber";
    else if(merchantData["02"]) promptpayIdType = "TaxId";
    else if(merchantData["03"]) promptpayIdType = "EWalletId";
    else promptpayIdType = "Unknown";
    // formatting
    var promptpayNumber;
    switch(promptpayIdType) {
        case "MobileNumber": promptpayNumber = _formatMobileNumber(merchantData["01"].data); break;
        case "TaxId": promptpayNumber = merchantData["02"].data; break;
        case "EWalletId": promptpayNumber = merchantData["03"].data; break;
    }
    // construct merchant info
    var merchantInfo = {
        "promptpayIdType": promptpayIdType,
        "promptpayNumber": promptpayNumber
    }
    return merchantInfo;
}

function _formatMobileNumber(input) {
    return "0" + input.substr(4);
}

function _parseTag(emvdata) {
    var tags = {};
    var index = 0;
    var data = emvdata;
    while (index < emvdata.length) {
        var data = emvdata.substring(index);
        // get ID tag
        var tagId = data.substr(0, 2);
        // get tag length
        var tagLength = parseInt(data.substr(2, 2));
        // get tag information
        var tagInformation = data.substr(4, tagLength);
        var tag = {
            "id": tagId,
            "length": tagLength,
            "data": tagInformation
        }
        tags[tagId] = tag;
        index += tagLength + 4;
    }
    return tags;
}

var parser = {
    "parse": parse
}
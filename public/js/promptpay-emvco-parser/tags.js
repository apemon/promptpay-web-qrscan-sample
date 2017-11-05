/*!
 * tags
 * This is tag information based on EMV QR Code Specification for Payment Systems Merchant
 * https://www.emvco.com/emv-technologies/qrcodes/
 * Note that I use the page 18 on 31 July, 2017 version 
 * 
 * each tag will contain with these following information
 * id - tag id
 * name - tag name
 * format - N (number), S (string), ans (alphanumeric special)
 * presence - M (mandatory), O (optional), C (conditional)
 * 
 * @license MIT
 */
var emv_tags = {
    "00": {
        "id": "00",
        "name": "PayloadFormatIndicator",
        "format": "N",
        "presence": "M",
    }, 
    "01": {
        "id": "01",
        "name": "PointOfInitiationMethod",
        "format": "N",
        "presence": "O"
    },
    // merchant account information
    // 02 - 03 Visa
    // 04 - 05 Mastercard
    // 06 - 08 EMVCo
    // 09 - 10 Discover
    // 11 - 12 Amex
    // 13 - 14 JCB
    // 15 - 16 UnionPay
    // 17 - 25 EMVCo
    // 29 Promptpay
    "29": {
        "id": "29",
        "name": "MerchantAccountInformation",
        "format": "ans",
        "presence": "M",
        // specific field for merchant
        "merchant": "PromptPay",
        "merchantInfo": {}
        // subtemplate for merchant
        // applicationId - App id for promptpay A000000677010111
        // merchant id type - in promptpay, they can use 3 type of id
        // phone number (01) length 13
        //   the format will begin with 00 concat by country code and then mobile number exclude leading zero
        //   ex. 087-111-1111 will be 0066871111111
        // tax id or citizen id (02) length 13
        // ewallet id (03) length 15 
    },
    "52": {
        "id": "52",
        "name": "MerchantCategoryCode",
        "format": "N",
        "presence": "M"
    }, 
    "53": {
        "id": "53",
        "name": "TransactionCurrency",
        "format": "N",
        "presence": "M"
    }, 
    "54": {
        "id": "54",
        "name": "TransactionAmount",
        "format": "ans",
        "presence": "C"
    },
    "58": {
        "id": "58",
        "name": "CountryCode",
        "format": "ans",
        "presence": "M"
    },
    "59": {
        "id": "59",
        "name": "MerchantName",
        "format": "ans",
        "presence": "M"
    },
    "60": {
        "id": "60",
        "name": "MerchantCity",
        "format": "ans",
        "presence": "M"
    },
    "63": {
        "id": "64",
        "name": "CRC",
        "format": "ans",
        "presence": "M"
    }
}
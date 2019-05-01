
export function validCard(value) {
  if (/[^0-9-\s]+/.test(value)) return false;
  let nCheck = 0, nDigit = 0, bEven = false;
  value = value.replace(/\D/g, "");

  for (let n = value.length - 1; n >= 0; n--) {
    let cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}

export function validTax(rfc, aceptarGenerico = true) {
  const re = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  let validado = rfc.match(re);

  if (!validado) {
    return false;
  }
  const digitoVerificador = validado.pop(),
    rfcSinDigito = validado.slice(1).join(''),
    len = rfcSinDigito.length,
    diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
    indice = len + 1;
  var suma,
    digitoEsperado;

  if (len == 12) suma = 0
  else suma = 481;

  for (var i = 0; i < len; i++)
    suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
  digitoEsperado = 11 - suma % 11;
  if (digitoEsperado == 11) digitoEsperado = 0;
  else if (digitoEsperado == 10) digitoEsperado = "A";
  if ((digitoVerificador != digitoEsperado)
    && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
    return false;
  else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
    return false;
  return rfcSinDigito + digitoVerificador;
}

export function validYear(y) {
  const nowDate = new Date();
  let dateLimit = new Date();
  const nowYear = nowDate.getFullYear();
  const year = y.substring(3, y.length);
  const sy = (nowYear + 9);

  dateLimit.setFullYear(sy);
  const limitYear = dateLimit.getFullYear();

  if (year.length == 4) {
    return (parseInt(year) > nowYear && parseInt(year) < limitYear);
  } else {
    const ys = nowYear.toString();
    const yn = ys.substring(2, ys.length);
    const ysl = limitYear.toString();
    const ynl = ysl.substring(2, ysl.length);
    return (parseInt(year) > parseInt(yn) && parseInt(year) < parseInt(ynl));
  }
}

export function getCardType(number) {
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null)
    return "visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
    return "master";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null)
    return "ame";

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (number.match(re) != null)
    return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null)
    return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null)
    return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null)
    return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null)
    return "Visa Electron";

  return "";
}
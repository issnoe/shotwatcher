import { messages } from './lib/messages'
import { validTax, validCard, validYear } from './lib/validators'
export const isArray = Array.isArray
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || isArray(obj))
    return false
  return !Object.keys(obj).length
}

class Validator {
  constructor() {
    this.lang = 'es';
    this.messages = messages;
    this.rules = {
      email: value => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase()) === false ? this.messages.email[this.lang] : undefined
      },
      max: (value, length) => {
        const valid = value.trim().length > length ? this.messages.maxim[this.lang] : undefined;
        return valid;
      },
      min: (value, length) => {
        const valid = value.trim().length < length ? this.messages.maxim[this.lang] : undefined;
        return valid;
      },
      required: value => {
        return (value.trim().length === 0) ? this.messages.required[this.lang] : undefined
      },
      password: value => {
        const valid = value.trim().length < 9 ? this.messages.password[this.lang] : undefined;
        return valid;
      },
      phone: value => {
        if (value.trim().length > 0) {
          const re = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
          const valid = value.trim().length > 6;
          //re.test(value);
          return !valid ? this.messages.format[this.lang] : undefined;
        } else {
          return undefined
        }
      },
      tax: value => {
        if (value.trim().length > 0) {
          const valid = validTax(value)
          return !valid ? this.messages.format[this.lang] : undefined;
        } else {
          return undefined
        }
      },
      name: value => {
        const valid = value.trim().length < 4 ? this.messages.name[this.lang] : undefined;
        return valid;
      },
      cmb: value => {
        const valid = value === 0 || value === "0" ? this.messages.required[this.lang] : undefined;
        return valid;
      },
      card: (value) => {
        const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
        if (!re.test(value)) {
          return this.messages.format[this.lang];
        } else if (!validCard(value)) {
          return this.messages.luhn[this.lang];
        } else {
          return undefined
        }
      },
      expire: (value) => {
        const re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        if (!re.test(value)) {
          return this.messages.format[this.lang];
        } else if (!validYear(value)) {
          return this.messages.date[this.lang];
        } else {
          return undefined
        }
      }
    }
  }
  set(lan) {
    this.lang = lan
  }

  getError = (index) => {

    return messages[index][this.lang];
  }

  noErrors = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] !== undefined) {
          return false;
        }
      }
    }
    return true;
  }

  validation = (val, rules) => {
    let res = undefined;
    try {
      for (const key in rules) {
        if (rules.hasOwnProperty(key)) {
          if (key === 'required') {
            const scope = this.rules[key];
            res = scope.call(null, val);
          }
          if (key === 'max' || key === 'min') {
            /* cb = key;
            const lenght = rules[key];
            const scope = this.rules[cb];
            res = scope.call(null, val, lenght); */
          }
          if (key === 'type' && rules[key] === 'email') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'password') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'name') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'card') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'expire') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'phone') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'tax') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }
          if (key === 'type' && rules[key] === 'cmb') {
            const scope = this.rules[rules[key]];
            res = scope.call(null, val);
          }

          if (res) {
            return res
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Validator();


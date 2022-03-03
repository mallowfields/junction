class Input {
  constructor (label, type, options) {
    this.label = label
    this.type = type
    this.options = options
  }
}

export class SingleLineTextInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'SingleLineText', options)
    this.defaults = defaults
  }
}

export class MultiLineTextInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'MultiLineText', options)
    this.defaults = defaults
  }
}

export class EmailInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Email', options)
    this.defaults = defaults
  }
}

export class SelectInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Select', options)
    this.defaults = defaults
  }
}

export class RadioInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Radio', options)
    this.defaults = defaults
  }
}

export class CheckboxInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Checkbox', options)
    this.defaults = defaults
  }
}

export class NumberInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Number', options)
    this.defaults = defaults
  }
}

export class PasswordInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Password', options)
    this.defaults = defaults
  }
}

export class DateInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Date', options)
    this.defaults = defaults
  }
}

export class TimeInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Time', options)
    this.defaults = defaults
  }
}

export class CoordinateInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Coordinate', options)
    this.defaults = defaults
  }
}

export class CurrencyInput extends Input {
  constructor (label, defaults, options) {
    super(label, 'Currency', options)
    this.defaults = defaults
  }
}

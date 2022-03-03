import {
  SingleLineTextInput,
  MultiLineTextInput,
  EmailInput,
  SelectInput,
  RadioInput,
  CheckboxInput,
  NumberInput,
  PasswordInput,
  DateInput,
  TimeInput,
  CoordinateInput,
  CurrencyInput
} from '@/mixin/tool-options'

export default {
  data () {
    return {
      icons: {
        'default': 'mdi-check',
        'textInput': 'mdi-pencil',
        'boolean': 'mdi-radiobox-marked',
        'money': 'mdi-credit-card-outline',
        'map': 'mdi-map-marker-check',
        'calendar': 'mdi-calendar-check',
        'website': 'mdi-overscan'
      },
      defaultToolOptions: [
        {
          displayName: 'Text',
          description: 'An input to enter text.',
          mechanics: 'textInput',
          status: 'Active',
          icon: 'mdi-pencil',
          inputs: [
            new SelectInput('Text Format', ['Single Line', 'Multi Line', 'Email Address']),
            new NumberInput('Max Length', { min: 24, max: 128 }),
            new SingleLineTextInput('Default Value')
          ]
        }, {
          displayName: 'Yes or No',
          description: 'A input to select yes or no.',
          mechanics: 'boolean',
          status: 'Active',
          icon: 'mdi-radiobox-marked',
          inputs: [
            new SingleLineTextInput('Hint')
          ]
        }, {
          displayName: 'Money',
          description: 'An input to receive money.',
          mechanics: 'money',
          status: 'Active',
          icon: 'mdi-credit-card-outline',
          inputs: [
            new SelectInput('Service', ['Stripe', 'Google Pay']),
            new PasswordInput('Key'),
            new CurrencyInput('Amount', '25.00')
          ]
        }, {
          displayName: 'Location',
          description: 'A location on a map.',
          mechanics: 'map',
          status: 'Active',
          icon: 'mdi-map-marker-check',
          inputs: [
            new SelectInput('Map Service Provider', ['Open Streets Map', 'ESRI', 'Google', 'Mapbox']),
            new PasswordInput('Key'),
            new SelectInput('Drawing Tool', ['Point', 'Line', 'Polygon']),
            new SelectInput('Address Finder Service', ['none', 'Open Streets Map', 'ESRI', 'google']),
            new CheckboxInput('Include Address Finder', true),
            new CheckboxInput('Restrict to Boundaries', true)
          ]
        }, {
          displayName: 'Date',
          description: 'A calendar to select a date.',
          mechanics: 'calendar',
          status: 'Active',
          icon: 'mdi-calendar-check',
          inputs: [
            new SelectInput('Calendar Service Provider', ['Gmail', 'Outlook']),
            new PasswordInput('Key'),
            new DateInput('Start Date'),
            new DateInput('End Date')
          ]
        }, {
          displayName: 'Website',
          description: 'A website.',
          mechanics: 'website',
          status: 'Active',
          icon: 'mdi-overscan',
          inputs: [
            new SingleLineTextInput('URL'),
            new SelectInput('Service', ['Internet', 'Local', 'CasualOS'])
          ]
        }
      ]
    }
  }
}

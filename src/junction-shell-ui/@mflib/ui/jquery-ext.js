import $ from 'jquery';

export function isJQueryInstance(source) {
  if (source == null) return false;
  return typeof source.jquery === 'string';
}

$.fn.extend({
  disable() {
    this.attr('disabled', 'disabled');
    return this;
  },

  enable() {
    this.removeAttr('disabled');
    return this;
  }
});
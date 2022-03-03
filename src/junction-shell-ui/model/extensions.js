import { KeyedList } from '/@mflib/collections';

KeyedList.prototype.toJSON = function () {
  return Array.from(this);
};

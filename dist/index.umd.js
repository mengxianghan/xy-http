(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Enum = factory());
})(this, (function () { 'use strict';

    class Enum {
      constructor(map, options) {
        this._opts = {
          fields: {
            key: 'key',
            value: 'value',
            desc: 'desc',
            extra: 'extra'
          },
          ...options
        };
        this._enumMap = map.map(item => ({
          key: item[this._opts.fields?.key],
          value: item[this._opts.fields?.value],
          desc: item[this._opts.fields?.desc],
          extra: item[this._opts.fields?.extra]
        }));
      }
      /**
       * 获取对象
       */


      get(key) {
        return this._enumMap.find(v => v.key === key || v.value === key);
      }
      /**
       * 获取 key
       * @param key
       * @param def
       * @return {*}
       */


      getKey(key, def = null) {
        return this.get(key)?.key ?? def;
      }
      /**
       * 获取 value
       * @param key
       * @param def
       * @return {*}
       */


      getValue(key, def = null) {
        return this.get(key)?.value ?? def;
      }
      /**
       * 获取 desc
       * @param key
       * @param def
       * @return {*}
       */


      getDesc(key, def = null) {
        return this.get(key)?.desc ?? def;
      }
      /**
       * 获取 extra
       * @param {*} key
       * @param {*} def
       * @returns
       */


      getExtra(key, def = null) {
        return this.get(key)?.extra ?? def;
      }
      /**
       * 获取所有
       * 使用场景：checkbox，radio，select
       */


      getOptions(fields = {
        label: 'desc',
        value: 'value'
      }) {
        const keys = Object.keys(fields);
        return this._enumMap.map(item => {
          const record = {};

          for (let key of keys) {
            record[key] = item[fields[key]];
          }

          return record;
        });
      }
      /**
       * 检查
       */


      has(key) {
        return this._enumMap.some(v => v.key === key || v.value === key);
      }
      /**
       * 对比
       */


      is(key, value) {
        return this.getKey(key) === value || this.getValue(key) === value;
      }

    }

    return Enum;

}));

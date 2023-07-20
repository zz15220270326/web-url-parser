import { FormRules } from 'naive-ui';

const compRules = {
  EditModal: <FormRules> {
    protocol: [
      {
        required: true,
        message: 'url 协议不能为空'
      },
    ],
    host: [
      {
        validator(rule, val, cb) {
          if (!val) {
            cb(new Error('host 不能为空'));
            return;
          }
          if (!/^([\w-]+\.)+[\w-]+$/.test(val)) {
            cb(new Error('host 不合法'));
            return;
          }
          cb();
        },
        trigger: 'input'
      }
    ],
    pathname: [
      {
        required: false,
        validator(rule, val, cb) {
          if (!val) {
            cb();
            return;
          }
          if (!/\/[\w- .\/?%&=]*/.test(val)) {
            cb(new Error('pathname 不合法'));
            return;
          }
          cb();
        },
        trigger: 'input'
      }
    ]
  }
};

export default compRules;

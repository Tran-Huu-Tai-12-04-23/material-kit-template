import moment from 'moment';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

export const daysLeftToExpire = (date) => {
  const today = moment();
  const expirationDate = moment(date);
  const daysLeft = expirationDate.diff(today, 'days');
  return daysLeft;
};
export const handleErrorApi = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }
};
export function saveAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}
export function saveRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

export function getTheme() {
  return localStorage.getItem('theme');
}

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function clearUserDataFromLocalStorage() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getUUid() {
  return uuid();
}

export function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}
const Helper = {
  // group time and date to Date time
  getGroupDateTime(date, time) {
    const newDate = new Date(date);
    newDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
    return newDate;
  },

  getKeyExtractor: (item, index) => `${item}-${index}`,

  replaceText: (text) => text.replace(/[\w\d]+/g, '******'),

  formatVND: (money, prefix = 'VNĐ') =>
    `${new Intl.NumberFormat('vi-VN').format(money || 0)} ${prefix}`,
  formatVNDNumber: (money) => `${new Intl.NumberFormat('vi-VN').format(money || 0)} `,
  formatDate: (text, format) =>
    // eslint-disable-next-line no-extra-boolean-cast
    !!text ? moment(text).format(format || 'DD/MM/YY') : '',
  formatDateTime: (text, format) =>
    !!text && moment(text).isValid() ? moment(text).format(format || 'HH:mm, DD/MM/YY') : '',

  convertDateMMDDToDDMM: (date) => {
    const day0 = date?.split('/')[0];
    const day1 = date?.split('/')[1];
    const year2 = date?.split('/')[2];
    const month0 = day1?.split('/')[0];
    return `${day0}/${month0}/${year2}`;
  },
  getRandomColor: () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  convertPriority: (result) => {
    if (result === 1) {
      return 'Gấp';
    }
    if (result === 0) {
      return 'Bình thường';
    }
    return '';
  },
  convertHoursToDaysAndHours: (hours) => {
    const totalHours = Math.floor(hours);
    const days = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
    let formattedTime = '';

    if (days > 0) {
      formattedTime += `${days}D`;
    }

    if (remainingHours > 0) {
      formattedTime += `${remainingHours}H`;
    }

    return formattedTime;
  },
};

export { Helper };

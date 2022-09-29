/*
 * @Author: Leo
 * @Date: 2022-09-29 16:01:09
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 16:07:43
 * @FilePath: \coding-challenge-frontend\src\reportWebVitals.js
 * @Description: 
 */
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

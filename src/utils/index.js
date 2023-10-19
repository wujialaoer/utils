import moment from "moment";

export default {
    // post 导出文件
    blobToFile(blob, format) {
        return new Promise(resolve => {
            const fileData = new Blob([blob]);
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(fileData, `${+new Date()}.${format}`);
                resolve();
            } else {
                const url = window.URL.createObjectURL(fileData);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${+new Date()}.${format}`);
                document.body.appendChild(link);
                link.click();
                resolve();
            }
        });
    },

    //获取当前月往前
    getOldTimes(num) {
        const data = [];
        for (let i = 0; i < num; i++) {
            data.push(moment().subtract(i, "M").format('YYYY-MM'))
        }
        return data;
    },

    // 获取往后月份，季度
    getNewTimes(num) {
        /*
        * 三个季度
        * */
        const data = [];
        for (let i = 0; i < num; i++) {
            // 季度
            data.push(moment().add(i, 'Q').format('YYYY-0Q'));
            if (i === 0) {
                // 判断当前月份是季度的地几个月
                switch (moment().month() - moment().quarter(moment().quarter() + i).startOf("Q").month()) {
                    case 1:
                        for (let j = 0; j < 2; j++) {
                            data.push(moment().add(j, "M").format('YYYY-MM-DD'))
                        }
                        break;
                    case 2:
                        data.push(moment().add(0, "M").format('YYYY-MM-DD'))
                        break;
                    default:
                        for (let j = 0; j < 3; j++) {
                            data.push(moment().add(j, "M").format('YYYY-MM-DD'))
                        }
                        break;
                }
            } else {
                for (let j = 0; j < 3; j++) {
                    data.push(moment().add(i, "Q").startOf('Q').add(j, 'M').format('YYYY-MM-DD'))
                }
            }
        }
        return data;
    },

    // img
    base64ToBlob(base64, blobName) {
        const dataArr = base64.split(',');

        const mime = dataArr[0].match(/:(.*?);/)[1];
        const bstr = atob(dataArr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const blobData = new Blob([u8arr], {type: mime})
        blobData.lastModifiedDate = new Date();
        blobData.name = blobName;
        return blobData;

    },

    /*
       * 方法作用：【取传入日期是星期几】
       * 使用方法：dateUtil.nowFewWeeks(new Date());
       * @param date{date} 传入日期类型
       * @returns {星期四，...}
       */
    nowFewWeeks(date) {
        if (date instanceof Date) {
            const dayNames = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            return dayNames[date.getDay()];
        } else {
            return "Param error,date type!";
        }
    },

    /*
        * 方法作用：【字符串转换成日期】
        * 使用方法：dateUtil.strTurnDate("2010-01-01");
        * @param str {String}字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
        * @return {Date}由字符串转换成的日期
        */
    strTurnDate(str) {
        const re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        let dt;
        if (re.test(str)) {
            dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
        }
        return dt;
    },


    /*
     * 方法作用：【计算2个日期之间的天数】
     * 传入格式：yyyy-mm-dd(2015-01-31)
     * 使用方法：dateUtil.dayMinus(startDate,endDate);
     * @startDate {Date}起始日期
     * @endDate {Date}结束日期
     * @return endDate - startDate的天数差
     */
    dayMinus(startDate, endDate) {
        if (startDate instanceof Date && endDate instanceof Date) {
            return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
        } else {
            return "Param error,date type!";
        }
    },


}


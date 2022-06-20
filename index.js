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
                        data.push(moment().add(j, "M").format('YYYY-MM-DD'))
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

    }

}


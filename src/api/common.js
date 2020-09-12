/*
 * @Author: 许凌霄
 * @Date: 2020-09-12 11:55:59
 * @LastEditors: 许凌霄
 * @LastEditTime: 2020-09-12 16:34:30
 * @Descripttion:
 */
// import { getAPI } from './net/http';

export const getUploadToken = data => {
	// return getAPI('/web/qiniu/token', data);
	return Promise.resolve({
		code: 200,
		data: {
			uptoken:
				'UO-6vb5maBKlj6lKIyRoSnb_CmNszTuS55xdvrsQ:7jgD3wKrSdHw8DjEgO_LkIXY51M=:eyJzY29wZSI6Imthb2xhbGEtdGVzdCIsImRlYWRsaW5lIjoxNTk5OTAzMDkzfQ==',
		},
	});
};

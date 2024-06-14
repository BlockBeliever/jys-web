import COS from 'cos-js-sdk-v5';
import { getStsToken } from '@/api/upload'

const cos = new COS({
  getAuthorization: async function (options: any, callback: any) {
		const { data } = await getStsToken({})
    callback({
      TmpSecretId: data.secret_id,
      TmpSecretKey: data.secret_key,
      SecurityToken: data.token,
      ExpiredTime: data.expire_time
    });
  },
});
export default cos;
import { Provide, Inject } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

import { AdminEntity } from '../entity/admin';
import { BaseService } from '../core/baseService';
import { AdminMapping } from '../mapping/admin';
import MyError from '../comm/myError';
import Crypto from '../comm/crypto';
import { AdminLoginDTO } from '../model/dto/admin';

enum ADMIN_STATUS {
  NORMAL = 1,
  BAN = -1,
}

@Provide()
export class AdminService extends BaseService<AdminEntity> {
  @Inject()
  protected crypto: Crypto;

  @Inject()
  private jwtService: JwtService;

  @Inject()
  mapping: AdminMapping;

  /**
   * @description 管理员
   * @param param
   */
  async login(param: AdminLoginDTO) {
    const { account, pwd } = param;
    const admin = await this.mapping.findOne({
      account,
    });

    if (!admin) {
      throw new MyError('用户不存在');
    }

    if (admin.status === ADMIN_STATUS.BAN) {
      throw new MyError('账户未激活或被禁用');
    }
    const correct = this.crypto.compareSync(pwd, admin.pwd);
    if (!correct) {
      throw new MyError('密码错误');
    }

    const token = await this.jwtService.sign({
      userId: admin.adminId,
      email: '',
      type: 1,
    });
    return {
      token,
      account,
    };
  }
}

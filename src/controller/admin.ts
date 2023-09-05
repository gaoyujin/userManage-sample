import { Inject, Controller, Post, Body, Get } from '@midwayjs/core';
import { BaseController } from '../core/baseController';
import { AdminService } from '../service/admin';
import { AdminLoginDTO } from '../model/dto/admin';
import Crypto from '../comm/crypto';

@Controller('/admin', {
  tagName: 'Admin',
  description: '后台登录控制器',
})
export class AdminController extends BaseController {
  @Inject()
  protected service: AdminService;

  @Inject()
  crypto: Crypto;

  @Post('/login', { summary: '管理员登录' })
  async login(
    @Body()
    param: AdminLoginDTO
  ) {
    const res = await this.service.login(param);
    return this.success(res);
  }

  @Get('/add', {
    summary: '创建管理员',
    description: '根据传入的用户名和邮箱地址创建用户，邮箱地址不允许重复',
  })
  async create() {
    const password = this.crypto.hashSync('123456');

    const res = await this.service.saveNew({
      account: 'admin',
      pwd: password,
      status: 1,
    });
    return this.success(res);
  }
}

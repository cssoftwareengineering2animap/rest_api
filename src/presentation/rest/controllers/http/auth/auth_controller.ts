import { injectable, inject } from "tsyringe"
import { Request, Response } from "express"
import { envelope } from "../../../utils/envelope"
import { LoginUseCase } from "../../../../../domain/usecases/auth/login/login_use_case"
import { LoginDto } from "../../../../../domain/usecases/auth/login/login_dto"
import { validateDto } from "../../../../../core/utils/validate_dto"
import { RequestForgotPasswordTokenUseCase } from "../../../../../domain/usecases/auth/request_forgot_password_token/request_forgot_password_token_use_case"
import { RequestForgotPasswordTokenDto } from "../../../../../domain/usecases/auth/request_forgot_password_token/request_forgot_password_token_dto"
import { ResetPasswordWithForgotPasswordTokenDto } from "../../../../../domain/usecases/auth/reset_password_with_forgot_password_token/reset_password_with_forgot_password_token_dto"
import { ResetPasswordWithForgotPasswordTokenUseCase } from "../../../../../domain/usecases/auth/reset_password_with_forgot_password_token/reset_password_with_forgot_password_token_use_case"

@injectable()
export class AuthController {
  constructor(
    @inject(LoginUseCase)
    private readonly loginUseCase: LoginUseCase,
    @inject(RequestForgotPasswordTokenUseCase)
    private readonly forgotPasswordUseCase: RequestForgotPasswordTokenUseCase,
    @inject(ResetPasswordWithForgotPasswordTokenUseCase)
    private readonly resetPasswordWithForgotPasswordTokenUseCase: ResetPasswordWithForgotPasswordTokenUseCase
  ) {}

  login = async (request: Request, response: Response) => {
    const dto = new LoginDto(request.body)

    await validateDto(dto)

    const token = await this.loginUseCase.execute(dto)

    return response.json(envelope({ token }))
  }

  requestForgotPasswordToken = async (request: Request, response: Response) => {
    const dto = new RequestForgotPasswordTokenDto({ email: request.body.email })

    await validateDto(dto)

    const token = await this.forgotPasswordUseCase.execute(dto)

    return response.json(envelope({ token }))
  }

  resetPasswordWithForgotPasswordToken = async (
    request: Request,
    response: Response
  ) => {
    const dto = new ResetPasswordWithForgotPasswordTokenDto({
      password: request.body.password,
      token: request.body.token,
    })

    await validateDto(dto)

    await this.resetPasswordWithForgotPasswordTokenUseCase.execute(dto)

    return response.send()
  }
}

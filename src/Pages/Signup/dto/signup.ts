import { IsBoolean, IsDefined, IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator'

export class SignupRequestDto {

    @IsPhoneNumber('IN')
    @IsDefined()
        phone!: string

    @IsString()
    @IsDefined()
        name!: string

    @IsEmail()
    @IsDefined()
        email!: string

    @IsString()
    @IsDefined()
        businessName!: string

    @IsString()
    @IsDefined()
        address!: string


    @IsString()
    @Length(6)
    @IsDefined()
        pinCode!: string

    @IsBoolean()
    @IsDefined()
        listPrivately!: boolean

    @IsDefined()
        organizationLocation: any

    @IsDefined()
    @IsString()
        categoryId!: string
}
import { IsBoolean, IsDefined, IsEmail, IsNumber, IsString, Length } from 'class-validator'
import type { OrganizationLocationInterface } from '../signupSlice'

export class SignupRequestDto {

    @IsNumber()
    @Length(10, 10)
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
        organizationLocation: OrganizationLocationInterface | undefined

    @IsDefined()
    @IsString()
        categoryId!: string
}
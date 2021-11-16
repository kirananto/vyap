import { IsDefined, IsLatitude, IsLongitude } from "class-validator"

export class OrganizationLocation {
  
    @IsLatitude()
    @IsDefined()
    lat!: number
  
    @IsLongitude()
    @IsDefined()
    lng!: number
  
    @IsDefined()
    address!: string
  
    @IsDefined()
    city!: string
  
    @IsDefined()
    state!: string
    
    @IsDefined()
    pinCode!: string
  
  }
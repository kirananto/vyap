export interface IFetchAllPayments {
    data: IFetchAllPaymentsData;
    status: number;
    statusText: string;
}
export interface IFetchAllPaymentsData {
    limit: number;
    offset: number;
    total: number;
    data: IFetchAllPaymentsDataEntity[];
}
export interface IFetchAllPaymentsDataEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    amount: string;
    note: string;
    method: number;
    status: number;
    senderUserId?: null;
    senderOrgId: string;
    receiverId: string;
    senderOrg: SenderOrgOrReceiver;
    receiver: SenderOrgOrReceiver;
}
export interface SenderOrgOrReceiver {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null;
    name: string;
    description: string;
    listPrivately: boolean;
    officeNumber: string;
    profileImageUrl?: null;
    gstNumber?: null;
    officeAddress: string;
    email?: string | null;
    pinCode: string;
    isSupplier: boolean;
    isActive: boolean;
    organizationLocationId?: string | null;
}
import { Organization } from '../Login/credentialsSlice'

export interface InboxType {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    recipientId: string;
    lastMsg: string;
    inboxHash: string;
    outstandingAmount: string;
    unseenNumbers: number;
    recipient: Organization;
}

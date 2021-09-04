import { Organization } from '../Login/credentialsSlice'

export interface InboxType {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    recipientId: string;
    lastMsg: string;
    threadId: string;
    outstandingAmount: string;
    unseenNumbers: number;
    recipient: Organization;
}

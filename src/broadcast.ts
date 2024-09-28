enum BroadcastMessageType {
    UpdateText
}

export interface BroadcastMessage {
    type: BroadcastMessageType
}

export interface UpdateTextMessage extends BroadcastMessage {
    type: BroadcastMessageType.UpdateText
    text: string
    id: string
}
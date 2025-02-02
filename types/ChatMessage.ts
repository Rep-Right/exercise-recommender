export default interface ChatMessage {
    timeSent: number, // Unix timestamp (epoch, in ms)
    author: 'user' | 'ai',
    message: string,
}

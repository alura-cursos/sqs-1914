const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1'
})
const sqs = new AWS.SQS();
const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/364350264218/alura-test-dlq';
(async () => {
    const messages = await sqs.receiveMessage({
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20
    }).promise();

    if (messages.Messages) {
        messages.Messages.forEach(async message => {
            console.log('processando mensagem da DLQ...');
            console.log(`conteúdo da mensagem: ${JSON.stringify(message.Body)}`);
            await sqs.deleteMessage({
                QueueUrl: QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle
            }).promise();
            console.log('mensagem da DLQ processada (e excluída) com sucesso');
        })
    }
})();